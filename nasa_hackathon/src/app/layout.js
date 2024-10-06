// layout.js
"use client";
import localFont from "next/font/local";
import "./globals.css";
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Adjust this import based on your project structure
import ParticlesBackground from './components/ParticlesBackground';
import { AuthContextProvider } from "./AuthContext";
import Header from './components/Header'; // Ensure the path is correct

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <ParticlesBackground>
              <Header /> {/* Include Header here */}
              {children}
            </ParticlesBackground>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
