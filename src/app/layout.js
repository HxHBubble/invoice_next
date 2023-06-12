"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@mui/material/styles';
import theme from '../app/theme';
import { CssBaseline } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Invoicer App',
  description: 'Project Created by Balasundar B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
        <title description={metadata.description}>{metadata.title}</title>
      </head>
      <ThemeProvider theme={theme}> <CssBaseline />
        <body className={inter.className}> {children} </body>
      </ThemeProvider>
    </html>
  )
}