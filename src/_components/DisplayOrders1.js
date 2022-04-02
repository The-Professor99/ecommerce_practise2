import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useStateValue } from '@/_helpers';

import './DisplayOrders.css';


function DisplayOrder(props) {
    return (
        <tr>
            <td>{props.value.title}</td>
            <td>{props.value.price}</td>
            <td>{props.value.quantity}</td>
            <td>{(props.value.quantity * props.value.price).toFixed(2)}</td>
            <td>{new Date(props.value.dateCreated).toString('YYYY-MM-dd')}</td>
            <td><Link to={`/items/${props.value.linkId}`}>View Item</Link></td>
        </tr>
    )
}

function DisplayOrders(props) {
    // const [{ user }] = useStateValue();

    
    const columns = [
        {
            name: 'Title',
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
    // console.log(props)
    const dataCopy = JSON.parse(JSON.stringify(props.value));

    let i;
    for (i=0; i < dataCopy.length; i++) {
        dataCopy[i]['linkId'] = dataCopy[i]['id']
        dataCopy[i]['id'] = i
    }

    console.log(dataCopy, 'data copy')

  return (
      <>
    <div 
    className='DisplayOrders flex-container'>
    <h3>Completed Orders</h3>
    <table>
    <caption>Completed Orders</caption>
    {/* To build this using datatables. */}
        <thead>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date Created</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        { dataCopy.map((item) => (
            <DisplayOrder key={item.id} value={item}/>
        ))}
        </tbody>
    </table>
    {/* <table class="row-border hover table-auto block overflow-x-auto table-auto mx-auto" style="width: 90%;">
        <thead class="justify-between">
            <tr class="bg-gray-800">
                <th class="px-16 py-2">
                <span class="text-gray-300"></span>
                </th>
                <th class="px-16 py-2">
                <span class="text-gray-300">Transaction ID</span>
                </th>
                <th class="px-16 py-2">
                <span class="text-gray-300">Type</span>
                </th>
                <th class="px-16 py-2">
                <span class="text-gray-300">Amount/Balance</span>
                </th>
                <th class="px-16 py-2">
                <span class="text-gray-300">Date/Time</span>
                </th>

                <th class="px-16 py-2">
                <span class="text-gray-300">Status</span>
                </th>

                <th class="px-16 py-2">
                <span class="text-gray-300"></span>
                </th>
            </tr>
        </thead>
        <tbody class="bg-gray-200">
            <tr class="bg-white border-4 border-gray-200" *ngFor="let transaction of transactions" title="{{transaction.type}} Request - status: {{transaction.status}}">
                <td class="px-16 py-2">
                <span class="text-center ml-2 font-semibold">#</span>
                </td>
                <td class="px-16 py-2">
                <span class="text-center ml-2 font-semibold">{{ transaction.transaction_id }}</span>
                </td>
                <td class="px-16 py-2">
                <span class="text-center ml-2 font-semibold">{{ transaction.type }}</span>
                </td>
                <td class="px-16 py-2">
                </td>
                <td class="px-16 py-2">
                <span>{{ transaction.transaction_date }}</span>
                </td>
                <td class="px-16 py-2 font-semibold">
                <span>{{ transaction.status }}</span>
                </td>
                <td class="px-16 py-2">
                <a (click)="toggleModal(transaction.transaction_id)"><button class="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">
                    View Details
                </button></a>
                </td>
            </tr>
        </tbody>
    </table> */}
    </div>
    </>
    
  )
}

export { DisplayOrders }
