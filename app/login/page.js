"use client";

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, useTheme, Link } from '@mui/material';
import { styled } from '@mui/system';
import { auth } from '../../firebase'; // Adjust import based on your setup
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

// Styled components for the page layout
const Wrapper = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Use hardcoded shadow
  backgroundColor: theme?.palette?.background?.paper || '#fff', // Fallback to white
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const Footer = styled(Box)(({ theme }) => ({
  background: '#282c34',
  color: '#fff',
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'absolute',
  width: '100%',
  bottom: 0,
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/chatbot'); // Redirect to pantry page after successful login
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <FormContainer theme={theme}>
          <Typography variant="h4" gutterBottom align="center">
            Log In
          </Typography>
          <StyledTextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
          <ButtonContainer>
            <Link href="/forgot-password" underline="none">
              <Button variant="text" color="secondary" fullWidth>
                Forgot Password?
              </Button>
            </Link>
            <Link href="/signup" underline="none">
              <Button variant="text" color="secondary" fullWidth>
                Don&apos;t have an account? Sign Up
              </Button>
            </Link>
          </ButtonContainer>
        </FormContainer>
      </Wrapper>
      <Footer>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WebSafetyBot. All rights reserved.
        </Typography>
      </Footer>
    </>
  );
};

export default Login;
