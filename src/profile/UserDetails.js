import React, { useEffect } from 'react';

import { useStateValue } from '@/_helpers';

function UserDetails() {
  const [{cart, user}, dispatch] = useStateValue();

  console.log(user, cart, "checking cart user")

  return (
    <div>
        User Details: 
        <h4>{user.email}</h4>
        {cart.map(item => (
            <h2 key={item.id}>{item.title}</h2>
        ))}

    </div>
  )
}

export { UserDetails }