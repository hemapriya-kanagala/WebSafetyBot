"use client";

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, useTheme } from '@mui/material';
import { auth } from '../../firebase'; // Adjust import based on your setup
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';

const SignupContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme?.palette?.background?.paper || '#fff', // Fallback to white
  width: '100%',
  maxWidth: '400px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful');
      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SignupContainer>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <FormContainer theme={theme}>
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
            onClick={handleSignup}
            disabled={loading}
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Sign Up
          </Button>
        </FormContainer>
      </SignupContainer>
      <Footer>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WebSafetyBot. All rights reserved.
        </Typography>
      </Footer>
    </>
  );
};

export default Signup;
