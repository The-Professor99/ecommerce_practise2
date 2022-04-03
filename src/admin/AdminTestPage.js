import React, { useEffect, useState } from 'react';
import { adminService } from '@/_admin_services';
import DataTable from 'react-data-table-component';
import './AdminTestPage.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { Role, useStateValue } from '@/_helpers';


// Basic Admin Page with no functionalities.
// With real backend, this would be stored in a different directory
// and doesn't share states with account pages.
// other functionalities such as update user, set role, navbar etc will be
// added with time. For now, the page will just serve to show registered
// users. and is embedded into the users side.
function AdminTestPage() {
    const [data, setData] = useState([])
    const [{ user }] = useStateValue();
    // a login page would be made for admin login
    // for now, we'll make use of the account login.
    // However, note that this is not ideal. 
    const navigate = useNavigate()

    useEffect(() => {
        adminService.getUsers()
        .then((data) => {
            setData(data)
        })
        .catch(error => {
            console.log(error)
            navigate('/not-found')
        })

        // setData('')
      }, []);

    const customStyles = {
        header: {
            style: {
                textAlign: 'center',
            },
        }
    };

    
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Date Created',
            selector: row => new Date(row.dateCreated).toString('YYYY-MM-dd'),
        },
        {
            name: 'Verification Status',
            selector: row => row.isVerified
        }
    ];
    // const dataCopy = JSON.parse(JSON.stringify(props.value));

  return (
    user.role === Role.Admin ? (
    <div>
        <main>
            <div className='AdminTestPage'>

                <DataTable
                title='All Users'
                columns={columns}
                data={data.reverse()}
                highlightOnHover
                pagination
                responsive
                striped
                customStyles={customStyles} 
                theme='dark'
                />
            </div>
        </main>
    </div> ) : (
        <Navigate to="/not-found"/>
    )
  )
}

export { AdminTestPage }


// function DisplayOrders(props) {

//     const customStyles = {
//         header: {
//             style: {
//                 textAlign: 'center',
//             },
//         }
//     };

    
//     const columns = [
//         {
//             name: 'Name',
//             selector: row => (row.title).toLowerCase(),
//             sortable: true
//         },
//         {
//             name: 'Price',
//             selector: row => (row.price).toFixed(1),
//             sortable: true
//         },
//         {
//             name: 'Quantity',
//             selector: row => (row.quantity).toFixed(1),
//             sortable: true
//         },
//         {
//             name: 'Total',
//             selector: row => (row.price * row.quantity).toFixed(2),
//             sortable: true
//         },
//         {
//             name: 'Date Placed',
//             selector: row => new Date(row.dateCreated).toString('YYYY-MM-dd'),
//         },
//         {
//             name: '',
//             selector: row => <Link to={`/items/${row.linkId}`} >View Item</Link>,
//         }
//     ];
//     const dataCopy = JSON.parse(JSON.stringify(props.value));

//     let i;
//     for (i=0; i < dataCopy.length; i++) {
//         dataCopy[i]['linkId'] = dataCopy[i]['id']
//         delete dataCopy[i]['id']
//     }

//   return (
//         <div className='DisplayOrders'>

//             <DataTable
//             title='Completed Orders'
//             columns={columns}
//             data={dataCopy.reverse()}
//             highlightOnHover
//             pagination
//             responsive
//             striped
//             customStyles={customStyles} 
//             theme='dark'
//             />
//         </div>
//   )
// }

// export { DisplayOrders }