import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useStateValue } from '@/_helpers';

import './DisplayOrders.css';

function DisplayOrders() {
    const [{ user }] = useStateValue();
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true
        },
        {
            name: 'Total',
            selector: row => (row.price * row.quantity).toFixed(2),
            sortable: true
        },
        {
            name: '',
            selector: row => <Link to={`/items/${row.linkId}`} >View Item</Link>,
        },
        {
            name: 'Date Placed',
            selector: row => new Date(row.dateCreated).toString('YYYY-MM-dd'),
            sortable: true
        }
    ];
    // console.log(props)
    const dataCopy = JSON.parse(JSON.stringify(user.orders));

    let i;
    for (i=0; i < dataCopy.length; i++) {
        dataCopy[i]['linkId'] = dataCopy[i]['id']
        delete dataCopy[i]['id']
    }
  return (
        <div className='DisplayOrders'>

            <DataTable
            title='Completed Orders'
            key={1}
            columns={columns}
            data={dataCopy}
            pagination
            responsive
            striped
            noDataComponent
            classNames="table-component"
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