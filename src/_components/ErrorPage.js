import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.css';
import noSignal from '../images/undraw_signal_searching_bhpc.svg';

function ErrorPage() {
  return (
    <div className="ErrorPage container mx-auto sm:px-4 container-1 pt-20 pb-12">
        <div className="flex flex-wrap ">
            <div className="image-container pr-4 pl-4">
                <svg width="640" height="448" viewBox="0 0 640 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M144 448C64.47 448 0 383.5 0 304C0 241.2 40.17 187.8 96.2 168.1C96.07 165.4 96 162.7 96 160C96 71.6 167.6 0 256 0C315.3 0 367 32.25 394.7 80.2C409.9 69.1 428.3 64 448 64C501 64 544 106.1 544 160C544 172.2 541.7 183.8 537.6 194.6C596 206.4 640 258.1 640 320C640 390.7 582.7 448 512 448H144Z" fill="var(--primary-color)"/>
                    <path d="M320 313.737C337.69 313.737 352 303.68 352 291.896V111.481C352 99.071 337.69 89 320 89C302.31 89 288 99.071 288 111.481V290.638C288 303.694 302.31 313.737 320 313.737ZM320 347.448C297.91 347.448 280 360.026 280 375.54C280 391.054 297.91 403 320 403C342.09 403 360 390.429 360 375.54C360 360.651 342.09 347.448 320 347.448Z" fill="white"/>
                </svg>

            </div>
            <article className="py-8 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
                <h4 className="h3">Error Encountered While Fetching Data</h4>
                <p className="text-xl font-light">Please Check your Internet Connectivity and Try Again...</p>
                <p>You can also <Link to="/contact" className="text-blue-200">contact us</Link> for more info</p>
            </article>
        </div>
    </div>
  )
}

export { ErrorPage };