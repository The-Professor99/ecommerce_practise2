import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useStateValue } from '@/_helpers';

import './DisplayOrders.css';

function DisplayOrders(props) {
    // const [{ user }] = useStateValue();

    const customStyles = {
        header: {
            style: {
                textAlign: 'center',
            },
        }
    };

    
    const columns = [
        {
            name: 'Name',
            selector: row => (row.title).toLowerCase(),
            sortable: true
        },
        {
            name: 'Price',
            selector: row => (row.price).toFixed(1),
            sortable: true
        },
        {
            name: 'Quantity',
            selector: row => (row.quantity).toFixed(1),
            sortable: true
        },
        {
            name: 'Total',
            selector: row => (row.price * row.quantity).toFixed(2),
            sortable: true
        },
        {
            name: 'Date Placed',
            selector: row => new Date(row.dateCreated).toString('YYYY-MM-dd'),
        },
        {
            name: '',
            selector: row => <Link to={`/items/${row.linkId}`} >View Item</Link>,
        }
    ];
    const dataCopy = JSON.parse(JSON.stringify(props.value));

    let i;
    for (i=0; i < dataCopy.length; i++) {
        dataCopy[i]['linkId'] = dataCopy[i]['id']
        delete dataCopy[i]['id']
    }

  return (
        <div className='DisplayOrders'>

            <DataTable
            title='Completed Orders'
            columns={columns}
            data={dataCopy.reverse()}
            highlightOnHover
            pagination
            responsive
            striped
            customStyles={customStyles} 
            theme='dark'
            />
        </div>
    // <div 
    // className='DisplayItems flex-container'>
    //     <div 
    //     className="card" >
    //         <img 
    //         className="card-img-top" 
    //         src={props.value.image} 
    //         alt="Produce Image" />
    //         <div className="card-block">
    //             <h4 className="card-title">
    //                 {(props.value.title).toUpperCase()}
    //             </h4>
    //             <p 
    //             className="card-text" >
    //                 {(props.value.price)} x
    //             </p>
    //             <p>
    //                 {()}
    //             </p>
    //         </div>
    //     </div>
    // </div>
  )
}

export { DisplayOrders }