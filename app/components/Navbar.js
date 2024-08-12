"use client";

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, useTheme, useMediaQuery, styled } from '@mui/material';
import Link from 'next/link';
import { auth } from '../../firebase'; // Adjust import based on your setup
import { signOut } from 'firebase/auth';

const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#4a90e2', // Updated color for a friendlier look
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
}));

const NavbarContent = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const NavbarLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff', // White text for contrast
  fontSize: '1.5rem', // Slightly larger font size
}));

const NavbarButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const Navbar = () => {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <NavbarContainer position="static">
      <Container>
        <NavbarContent>
          <NavbarLogo variant="h6">WebSafetyBot</NavbarLogo>
          <NavbarButtons>
            <Button color="inherit" component={Link} href="/">Home</Button>
            {user ? (
              <>
                {/* <Button color="inherit" component={Link} href="/profile">Profile</Button> */}
                <Button color="inherit" component={Link} href="/chatbot">Use Chatbot</Button>
                <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/login">Use Chatbot</Button>
                <Button color="inherit" component={Link} href="/signup">Sign Up</Button>
                <Button color="inherit" component={Link} href="/login">Log In</Button>
              </>
            )}
          </NavbarButtons>
        </NavbarContent>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
