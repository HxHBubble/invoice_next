'use client'

import React, { useState, useEffect } from 'react'
import styles from '../../page.module.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container, TextField, Button, Typography, IconButton, Grid, Autocomplete } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import axios from 'axios'

import { TiDelete } from 'react-icons/ti'
import { MdArrowBack } from "react-icons/md";
import { useRouter } from 'next/navigation';

const CreateNewInvoice = () => {
    const router = useRouter();
    const [payMethod, setPayMethod] = useState('');
    let [state, setState] = useState({
        paymentTo: '',
        itemList: [
            { itemName: '', itemQty: '', itemRate: '', amount: '' }
        ]
    });

    const { paymentTo, itemList } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const paymentMode = (event) => {
        setPayMethod(event.target.value);
    }
    const updateItemList = (newData) => setState((itemList) => ({ ...itemList, ...newData }))

    const addNewItem = () => {
        itemList.push({ itemName: '', itemQty: '', itemRate: '', amount: '' });
        updateItemList({ itemList });
        return
    }

    const removeItem = (index) => {
        if (itemList.length > 1) {
            itemList.splice(index, 1);
            updateItemList({ itemList });
        }
    }

    const updateTotalAmount = (index) => {
        itemList[index].amount = itemList[index].itemQty * itemList[index].itemRate;
    }

    const createJsonFile = async () => {

        const invoiceData = JSON.stringify({ "payMethod": payMethod, "paymentTo": paymentTo, "itemList": itemList })
        try {

            const response = await axios.post('/api/create/newInvoice', invoiceData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                console.log('JSON file saved successfully');
            } else {
                console.error('Error saving JSON file');
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (<><Grid container spacing={0}>
        <Grid item xs={12} sm={4} md={4} sx={{ backgroundColor: '#dbd3de', minHeight: '100vh' }} justifyContent="center" alignItems="center">
            <Container sx={{ minHeight: '80%', padding: { xs: '0' }, paddingTop: { xs: '50px' }, textAlign: 'center' }}>
                {!payMethod && <Typography variant="h5" sx={{ color: '#dc143c', fontSize: { xs: '1.5rem', sm: '1.2rem', md: '1.5rem' } }}>Select Payment Method</Typography>}
                <FormControl sx={{ m: 1, minWidth: { xs: '60%', sm: '80%', md: '60% ' }, }}>
                    <InputLabel id="select-mode-label">Payment Method</InputLabel>
                    <Select
                        labelId="select-mode-label"
                        id="select-mode"
                        value={payMethod}
                        label="Payment Method"
                        onChange={paymentMode}>
                        <MenuItem value={'Cash'}>Cash</MenuItem>
                        <MenuItem value={'Cheque'}>Cheque</MenuItem>
                        <MenuItem value={'Bank'}>Bank Transfer</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="payment-to"
                    label="Payment To"
                    value={paymentTo}
                    onChange={(e) => { updateState({ paymentTo: e.target.value }) }}
                    sx={{ minWidth: { xs: '60%', sm: '80%', md: '60% ' } }}
                />

                {/* <Autocomplete disablePortal id='pay-to' options={payeeData} renderInput={(parms) => <TextField {...parms} label="Payment to" />} /> */}
            </Container>
            <Container sx={{ textAlign: 'center', maxInlineSize: 'min-content', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {itemList[0].amount && payMethod ? <Button variant="contained" onClick={() => { createJsonFile() }}>
                    Generate Invoice
                </Button> : ''}
            </Container>
        </Grid>
        <Grid item xs={12} sm={8} md={8} sx={{ backgroundColor: '#dbd3de', minHeight: '100vh' }} justifyContent="center" alignItems="center">
            <Container sx={{ paddingTop: '50px', textAlign: 'center' }}>

                <Button variant="outlined" color="primary" onClick={addNewItem} sx={{ float: 'right' }} disabled={!payMethod}>
                    Add New Item
                </Button>
            </Container>

            <Container>

                {itemList.map((item, index) => (
                    <div key={index} >
                        <Container className={styles.itemList} sx={{ display: 'flex', flexFlow: 'wrap' }}>
                            <TextField
                            
                                id={index + ''}
                                label="Particulars"
                                value={item.itemName}
                                onChange={e => { itemList[index].itemName = e.target.value; updateItemList({ itemList }); }}
                                sx={{ margin: { xs: 1, md: 2 }, width: 300, }}
                            />


                            <TextField
                                label="Quantity"
                                value={item.itemQty}
                                onChange={e => { itemList[index].itemQty = e.target.value; updateTotalAmount(index); updateItemList({ itemList }); }}
                                type='number'
                                sx={{ margin: { xs: 1, md: 2 }, maxWidth: 100, width: { sm: '80px', lg: '100px' } }}
                            />

                            <FormControl sx={{ m: { xs: 1, md: 2 }, maxWidth: 130, width: { sm: '80px', lg: '120px' } }}>
                                <InputLabel htmlFor="item-rate">Item Rate</InputLabel>
                                <OutlinedInput
                                    id="item-rate"
                                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                    label="Item Rate"
                                    value={item.itemRate}
                                    type='number'
                                    onChange={e => { itemList[index].itemRate = e.target.value; updateTotalAmount(index); updateItemList({ itemList }); }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: { xs: 1, md: 2 }, maxWidth: 130, width: { sm: '100px', lg: '120px' } }}>
                                <InputLabel htmlFor="total-amount">Total Amount</InputLabel>
                                <OutlinedInput
                                    id="total-amount"
                                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                    label="Total Amount"
                                    value={item.amount}
                                    type='number'
                                    disabled
                                />
                            </FormControl>

                            <IconButton className={styles.deleteButton} aria-label="deleteItem" size="small" onClick={() => { removeItem(index) }} disableRipple sx={{ m: 0, p: 0, display: 'contents', fontSize: '25px' }}>
                                <TiDelete className={styles.deleteIcon} />
                            </IconButton>
                        </Container>
                    </div>
                ))}

            </Container>
        </Grid>
        <Button variant="text" disableRipple startIcon={<MdArrowBack />} sx={{ position: 'absolute', top: 3, left: 3, "&:hover": { backgroundColor: 'transparent' }, }} onClick={() => { router.back() }}>
            Go Back
        </Button>
    </Grid>
    </>)
}

export default CreateNewInvoice