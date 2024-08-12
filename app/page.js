"use client";

import React from 'react';
import { Container, Typography, Button, Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import Navbar from '../app/components/Navbar';
import { FaShieldAlt, FaHandsHelping, FaClock } from 'react-icons/fa'; // Make sure to install react-icons

const HeroSection = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)', // Adjust height to fit below Navbar
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(to right, #00c6ff, #0072ff)',
  color: '#fff',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(6), // Added margin to prevent overlap
  [theme.breakpoints.down('sm')]: {
    height: 'auto', // Adjust height for small screens
    padding: theme.spacing(2),
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: '#fff', // Light background for cards
  color: '#333', // Dark text color for contrast
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for subtle elevation
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const Footer = styled(Box)(({ theme }) => ({
  background: '#282c34',
  color: '#fff',
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'absolute',
  bottom: 0,
  width: '100%',
}));

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const LandingPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <Container>
          <Typography variant={isSmallScreen ? "h3" : "h2"} component="h1" gutterBottom>
            Welcome to WebSafetyBot
          </Typography>
          <Typography variant={isSmallScreen ? "h6" : "h5"} component="h2" paragraph>
            We’re here to help you stay safe online by making cybersecurity simple and easy to understand.
          </Typography>

          <Typography variant={isSmallScreen ? "h5" : "h4"} component="h2" gutterBottom sx={{ marginTop: 6 }}>
            What We Offer
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <FaShieldAlt size={50} color="#0072ff" />
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                  Easy-to-Understand Tips
                </Typography>
                <Typography variant="body1">
                  We break down complex cybersecurity topics into simple, everyday language that everyone can understand.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <FaHandsHelping size={50} color="#0072ff" />
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                  Real-Life Examples
                </Typography>
                <Typography variant="body1">
                  Learn through practical scenarios that help you recognize and avoid online threats like scams and phishing.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <FaClock size={50} color="#0072ff" />
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                  24/7 Support
                </Typography>
                <Typography variant="body1">
                  We're here for you round the clock, ensuring you get the help you need anytime.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>

          <ButtonContainer>
            {/* <Link href="/signup" passHref>
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Link> */}
            <Link href="/login" passHref>
              <Button variant="contained" color="secondary">
                Use chatbot
              </Button>
            </Link>
          </ButtonContainer>
        </Container>
      </HeroSection>
      <Footer>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WebSafetyBot. All rights reserved.
        </Typography>
      </Footer>
    </PageContainer>
  );
};

export default LandingPage;
