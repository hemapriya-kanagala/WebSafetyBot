"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TextField, Button, Stack, Typography, Paper } from "@mui/material";
import { db } from "../../firebase";
import { useRouter } from "next/navigation"; // Use `next/navigation` in App Router
import { collection, query, orderBy, where, onSnapshot, deleteDoc, doc, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import Navbar from '../components/Navbar';
import { debounce } from "lodash";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const isSendingMessage = useRef(false); 
  const router = useRouter(); // Initialize useRouter for navigation
  const auth = getAuth(); 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); 
      } else {
        // Fetch messages only for the logged-in user
        const messagesRef = collection(db, "users", user.uid, "chats");
        const q = query(messagesRef, orderBy("timestamp"));
        const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
          const messagesData = querySnapshot.docs.map(doc => doc.data());
          setMessages(messagesData);
        });

        return () => unsubscribeMessages(); 
      }
    });

    return () => unsubscribeAuth(); 
  }, [auth, router]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (isSendingMessage.current) {
        return;
    }

    isSendingMessage.current = true;

    const user = auth.currentUser; // Get the current user
    const userMessage = { role: "user", content: input, timestamp: new Date() };

    // Update the local state
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
        // Add the user message to the user's chat subcollection
        const messagesRef = collection(db, "users", user.uid, "chats");
        await addDoc(messagesRef, userMessage); // Save user message to Firestore

        // Send the message to the backend and get the response
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const data = await response.text();

        // Create the AI response object
        const aiResponse = { role: "model", content: data, timestamp: new Date() };

        // Update the local state with the AI response
        setMessages((prev) => [...prev, aiResponse]);

        // Save the AI response to the user's chat subcollection
        await addDoc(messagesRef, aiResponse); // Save AI response to Firestore

    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        isSendingMessage.current = false;
        setLoading(false);
    }
};

  const debouncedSendMessage = useCallback(debounce(sendMessage, 500), [messages, input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSendMessage(e);
  };

  const clearConversation = async () => {
    const user = auth.currentUser;
    const messagesRef = collection(db, "users", user.uid, "chats");
    const q = query(messagesRef);
    const snapshot = await getDocs(q);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setMessages([]);
  };

  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement("script");
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <Stack spacing={2} sx={{ padding: 2, position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={3} sx={{ padding: 2, flex: 0.7, overflowY: "scroll", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
          {messages.map((msg, index) => (
            <Stack key={index} spacing={1} sx={{ marginBottom: 1, alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <Typography variant="body1" sx={{ backgroundColor: msg.role === "user" ? "#d3ffd3" : "#e0e0e0", padding: 1, borderRadius: 2 }}>
                <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}
              </Typography>
            </Stack>
          ))}
          {loading && <Typography>Loading...</Typography>}
        </Paper>

        <form id="chatForm" onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Type your message..."
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="contained" type="submit" disabled={loading}>
              Send
            </Button>
          </Stack>
        </form>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginTop: 2 }}>
          <div id="google_translate_element"></div>
          <Button 
            onClick={clearConversation}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Clear Conversation
          </Button>
        </Stack>

        <Paper elevation={2} sx={{ padding: 2, marginTop: 2, backgroundColor: "#e0f7fa", borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Note - If you encounter duplicate responses in the chat, please refresh the page to resolve the issue. We apologize for any inconvenience this may cause. Your patience and understanding are greatly appreciated as we work to improve the experience.
          </Typography>
        </Paper>
      </Stack>
    </>
  );
}
