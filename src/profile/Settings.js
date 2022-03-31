import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { accountService } from '@/_services';

import { useStateValue } from '@/_helpers';

function Settings() {
    const [{ user}] = useStateValue();
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
      if (confirm("Are you sure you want to delete this Account?. Please note that this action is irreversible ")){
        // accountService.delete();
        setIsDeleting(true);
        accountService.delete(user.id)
        .then(() => {
          accountService.logout();
          alert("Account Deleted Successfully");
          navigate('/account/login');
        })
      }
    }

    return (
      <div className='Settings'>
      <div className="card ">
        <div className="card-block mx-4 my-3">
          <h4 className="card-title m-0">Settings</h4>
          <hr />
          <div className="card-text">
            <strong>Note: </strong> 
            <p>This functionality is still a work in progress as other features are yet to be added.</p>
          </div>
          <button type='button' className='btn btn-danger' onClick={handleClick}  disabled={isDeleting}>
          {isDeleting &&
             <span className="spinner-border spinner-border-sm me-2"></span>
          } 
          <span>Delete Account</span>
          </button>
        </div>
      </div>
      </div>
  )
}

export { Settings }