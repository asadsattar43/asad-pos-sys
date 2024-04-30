import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function OrderTable({ orders }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders && orders.orders.length > 0 ? (
            orders.orders.map((order) => (
              <TableRow key={order.orderID}>
              <TableCell>{order.orderID}</TableCell>
              <TableCell>{order.orderAmount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No orders found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default OrderTable;
