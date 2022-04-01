import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useStateValue } from '@/_helpers';

function UserDetails() {
  const [{ user}] = useStateValue();

  return (
    <div className='UserDetails'>
      <h3 className='txt-dark-blue'>Hello {user.firstName} {user.lastName}</h3>
      <div className="card ">
        <div className="card-block mx-4 my-3">
          <h4 className="card-title m-0">Orders</h4>
          <hr />
          <div className="card-text">
            <strong>Note: </strong> 
            <p>This functionality is still a work in progress</p>
            <p>You have completed {user.orders?.length} orders</p>
          </div>
          <Link to="/profile/orders" className="btn btn-primary">View All Orders</Link>
        </div>
      </div>
    </div>
  )
}

export { UserDetails }