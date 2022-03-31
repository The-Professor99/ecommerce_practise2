import { Alert } from '@/_components';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import contactImage from '../images/undraw_contact.svg';
import contactImageDark from '../images/undraw_contact_dark.svg';

function Contact() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [darkTheme] = useLocalStorage('darkTheme', defaultDark ? true : false);

    return (
        <>
        <Alert />
        <div className="Contact container mx-auto mt-4 px-4 container-1 pt-20 pb-12">
            <div className="flex flex-wrap ">
                <div className="image-container pr-4 pl-4 ">
                    <img alt="" src={darkTheme ? contactImageDark : contactImage } className="img-responsive max-w-full h-auto" />
                </div>
                <article className="py-8 px-4 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
                    <h3 className="h1 mt-2">Contact Page</h3>
                    <div>
                        <ul>
                        <li className="contact-card mb-2">
                            <a href="tel:+2348132770015">
                            <div className="icon inline">
                                <button
                                className="bg-white text-blue-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                type="button"
                                >
                                <i className="fas fa-phone-alt"></i>
                                </button>
                            </div>
                            <span>Call Me</span>
                            </a>
                        </li>
                        <li className="contact-card mb-2 mt-3">
                            <a href="https://wa.me/+2348132770015">
                            <div className="inline icon">
                                <button
                                className="bg-white text-green-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                type="button"
                                >
                                <i className="fab fa-whatsapp"></i>
                                </button>
                            </div>
                            <span>Chat me up on Whatsapp</span>
                            </a>
                        </li>
                        <li className='contact-card'>
                            <a className='btn btn-primary mt-2' href='https://ihechifestus9.web.app/#contact'>View More Options</a>
                        </li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
        </>
    )
}

export { Contact };