'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Button, Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme, lightTheme } from './theme';
import { CssBaseline } from '@mui/material';
import { payeeData } from '../slices/payeeSlice';
import axios from 'axios'

const HomePage = () => {
  const Mode = useSelector((state) => state.theme.Darkmode)
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchPayees() {

      const response = await axios.get('/api/create/newPayee')
      // console.log(response.data)
      dispatch(payeeData(response.data))
    }
    fetchPayees();


  }, [])

  return (<ThemeProvider theme={Mode ? darkTheme : lightTheme}>
    <CssBaseline />
    <Box sx={{ width: '100%', height: '100vh', p: 0, m: 0 }}>
      <NavBar />
      <Typography variant="h1" component='h1' sx={{ textAlign: 'center', fontSize: '4rem', paddingTop: '10%', color: '#5d4d66' }}>Welcome to Invoice</Typography>
      <Button variant="contained" color="primary" sx={{ height: '100px', width: '250px', display: 'block', margin: "10px auto" }} onClick={() => router.push('/create/newInvoice')}>
        Create New Invoice
      </Button>
      <Button variant="contained" color="primary" sx={{ height: '100px', width: '250px', display: 'block', margin: "10px auto" }} onClick={() => router.push('/create/newPayee')}>
        Create New Payee
      </Button>
    </Box></ThemeProvider>
  )
}

export default HomePage;
