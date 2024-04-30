import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Snackbar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation, useGetOrdersByDateQuery } from '../RTK/apiSlice';
import OrderTable from './OrderTable';
import { getOrdersByDate, getOrdersByDateSuccess } from '../redux/orderSlice'; 

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function CreateOrder() {
  const formik = useFormik({
    initialValues: {
      orderAmount: 0,
      orderDateTime: '',
      venueOpenDate: '',
    },
  });

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const { data: ordersData, isLoading: isFetching } = useGetOrdersByDateQuery(
    formik.values.venueOpenDate ? formik.values.venueOpenDate : new Date().toLocaleDateString(), 
    {
      skip: !formik.values.venueOpenDate,
    }
  );
  
  
  useEffect(() => {
    const fetchOrders = async () => {
      const venueOpenDate = formik.values.venueOpenDate;
      const { data } = await useGetOrdersByDateQuery(venueOpenDate).fetchNextPage();
      dispatch(getOrdersByDateSuccess(data || []));
    };
    fetchOrders();
  }, [formik.values.venueOpenDate, dispatch]);
  
  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      dispatch(getOrdersByDateSuccess(ordersData));

    } else if (ordersData && ordersData.length === 0) {
      dispatch(getOrdersByDateSuccess([])); 
    }
  }, [ordersData, dispatch]);

const handleSubmit = async (event) => {
  event.preventDefault();
  const { orderAmount, orderDateTime, venueOpenDate } = formik.values;
  if (!orderAmount || !orderDateTime || !venueOpenDate) {
    setOpen(true);
    setMessage("Please fill all fields");
    return;
  }

  try {
    const requestBody = {
      "orderAmount": orderAmount,
      "orderDateTime": `${orderDateTime.slice(0, 4)}-${orderDateTime.slice(5, 7)}-${orderDateTime.slice(8, 10)}T${orderDateTime.slice(11, 13)}:${orderDateTime.slice(14, 16)}:00.000Z`,
      "venueOpenDate": venueOpenDate
    };
    const response = await createOrder(requestBody).unwrap();
    setOpen(true);
    setMessage(response.message);

  } catch (error) {
    setOpen(true);
    setMessage(error.data?.message || 'Error creating order');
  }
};
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage("");

  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ margin: 2, padding: 2 }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <div>
          <h2>Create Order</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              InputLabelProps={{
               shrink: true,
                }}

              id="orderAmount"
              label="Order Amount"
              type="number"
              value={formik.values.orderAmount}
              onChange={formik.handleChange}
              error={formik.touched.orderAmount && Boolean(formik.errors.orderAmount)}
              helperText={formik.touched.orderAmount && formik.errors.orderAmount}
              InputProps={{
                style: {
                  fontSize: 16,
                },
              }}
              sx={{ m: 2 }}
            />
            <TextField
              InputLabelProps={{
    shrink: true,
      }}

              id="orderDateTime"
              label="Order Date and Time"
              type="datetime-local"
              value={formik.values.orderDateTime}
              onChange={formik.handleChange}
              error={formik.touched.orderDateTime && Boolean(formik.errors.orderDateTime)}
              helperText={formik.touched.orderDateTime && formik.errors.orderDateTime}
              InputProps={{
                style: {
                  fontSize: 16,
                },
              }}
              sx={{ m: 2 }}
            />
            <TextField
              InputLabelProps={{
    shrink: true,
  }}

              id="venueOpenDate"
              label="Venue Date"
              type="date"
              value={formik.values.venueOpenDate}
              onChange={formik.handleChange}
              error={formik.touched.venueOpenDate && Boolean(formik.errors.venueOpenDate)}
              helperText={formik.touched.venueOpenDate && formik.errors.venueOpenDate}
              InputProps={{
                style: {
                  fontSize: 16,
                },
              }}
              sx={{ m: 2 }}
            />
            <Button type="submit" sx={{ m: 2, p: 2, fontSize: 16 }}>
              Create Order
            </Button>
          </form>
        </div>
        <OrderTable orders={orders} />

      </Box>
    </ThemeProvider>
  );
}

export default CreateOrder;