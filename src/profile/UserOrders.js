import React from 'react';

import { InProgress } from '@/_components';
import { useStateValue } from '@/_helpers';

import './UserOrders.css';
import { DisplayOrders, NoOrder } from '@/_components';

function UserOrders() {
  const [{ user }] = useStateValue();
  return (
    user.orders?.length ? (
      <>
      <DisplayOrders  value={user.orders} />
      </>
    ) 
    : (
    <NoOrder />
    )
  )
}

export { UserOrders }