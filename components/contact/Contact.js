"use client";

{/*
    please refer to the readme.md file for a breakdown of how to use this component.
    some other useful things to know ↓.

    web3forums:
        - https://web3forms.com/
    ternary operator:
        - condition ? consequent : alternative
    tailwind information:
        - container - https://tailwindcss.com/docs/container
        - button - https://v1.tailwindcss.com/components/buttons
        - form - https://v1.tailwindcss.com/components/forms
*/}

import React, { useState } from 'react';

import FacebookIcon from '@/components/contact/icon-components/FacebookIcon';
import InstagramIcon from '@/components/contact/icon-components/InstagramIcon';
import LinkedInIcon from '@/components/contact/icon-components/LinkedInIcon';
import XIcon from '@/components/contact/icon-components/XIcon';

export default function Contact() {
    //form state
    const [form, setForm] = useState({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    //error state to keep track of validation errors
    const [error, setError] = useState({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({ //updates form state with new input values
            ...prevForm,
            [name]: value
        }));

        setError((prevError) => ({ //clears any existing error messages for the current input
            ...prevError,
            [name]: ''
        }));
    };

    //regex to validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(String(email).toLowerCase());
    };

    //regex to validate phone number format
    const validatePhoneNumber = (phoneNumber) => {
        const re = /^(\+\d{1,4}\s?)?(\(?\d{3}\)?[-\s.]?)?\d{3}[-\s.]?\d{4}$/;
        return re.test(String(phoneNumber));
    };

    const validateForm = () => {
        let valid = true; //flag to track form validity
        let newError = { ...error }; //creates a copy of the error state

        //loops through form field to check for empty values
        for (let key in form) {
            if (!form[key]) {
                newError[key] = 'This field is required'; //sets an error message if a field is empty
                valid = false;
            } else {
                newError[key] = ''; //clear error message if field is not empty
            }
        }

        //validate email format
        if (form.email && !validateEmail(form.email)) {
            newError.email = 'Invalid email format';
            valid = false;
        }

        //validate phone number format
        if (form.phone && !validatePhoneNumber(form.phone)) {
            newError.phone = 'Invalid phone number';
            valid = false;
        }

        setError(newError); //update error state with validation results
        return valid;
    };

    const submitForm = async (event) => {
        /* this code below allows for quick form submission using https://web3forms.com/ */
        const formData = new FormData(event.target);
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); //input your access key here

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const result = await response.json();
            if (result.success) {
                console.log(result);
                window.location.href = "https://web3forms.com/success"; //redirects to thank you page from web3forms
            }
        } catch (error) {
            console.error("Form submission error:", error);
        }
        /* this code above allows for quick form submission using https://web3forms.com/ */
    };

    async function handleSubmit(event) {
        event.preventDefault(); //prevents default submission

        if (!validateForm()) { //checks for validation
            return;
        }

        if (validateForm()) { //submits the form if inputs are valid
            submitForm(event);
        }
    };

    return (
        <div>
            {/* container */}
            <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
                {/* component section */}
                <div className="flex flex-col md:flex-row my-8 py-8 px-8 bg-gray-50 rounded-md">
                    {/* information section */}
                    <div className="md:w-1/2 flex flex-col justify-center items-center text-center px-6 py-4">
                        <p className="text-3xl font-semibold tracking-tight text-gray-900">
                            Contact Us
                        </p>
                        <p className="text-lg font-medium tracking-tight text-gray-600 mt-6">
                            Please fill out this form and we will reach out to you soon.
                        </p>
                        <p className="text-lg font-medium tracking-tight text-gray-600 mt-2">
                            We look forward to connecting with you!
                        </p>
                        <p className="text-md font-normal tracking-tight text-gray-600 mt-6">
                            Hours of operation: <span className="italic">Monday - Friday 7:00 AM - 5:00 PM (PST)</span>
                        </p>
                        <p className="text-md font-normal tracking-tight text-gray-600 mt-2">
                            Call us at: <span className="italic">+1 (800) 000-0000</span>
                        </p>
                        <p className="tracking-tight text-gray-600 mt-8">
                            Check us out on...
                        </p>
                        {/* icon buttons */}
                        <div className="mt-4">
                            <button onClick={() => window.open('https://www.facebook.com/', '_blank')}
                                className="text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out rounded-full mx-1 p-2"
                            >
                                <FacebookIcon />
                            </button>
                            <button onClick={() => window.open('https://www.instagram.com/', '_blank')}
                                className="text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out rounded-full mx-1 p-2"
                            >
                                <InstagramIcon />
                            </button>
                            <button onClick={() => window.open('https://x.com/?lang=en', '_blank')}
                                className="text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out rounded-full mx-1 p-2"
                            >
                                <XIcon />
                            </button>
                            <button onClick={() => window.open('https://www.linkedin.com/', '_blank')}
                                className="text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out rounded-full mx-1 p-2"
                            >
                                <LinkedInIcon />
                            </button>
                        </div>
                    </div>

                    {/* form section */}
                    <div className="md:w-1/2 px-6 py-4">
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            {/* subject */}
                            <div className={`${error.name ? "mb-2" : "mb-4"}`}>
                                <label className={`text-xs ml-3 ${error.subject ? "text-red-600" : "text-gray-600"}`}>Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={`
                                        w-full border rounded
                                        ${error.subject ? "border-red-600" : "border-gray-300"}
                                        ${error.subject
                                            ? "focus:outline-none focus:ring-2 ring-inset focus:ring-red-500 focus:border-red-500"
                                            : "hover:border-gray-900 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500"}
                                        px-3 py-3`
                                    }
                                />
                                {error.subject && <p className="text-xs text-red-600 mt-1 ml-3">{error.subject}</p>}
                            </div>
                            {/* full name */}
                            <div className={`${error.name ? "mb-2" : "mb-4"}`}>
                                <label className={`text-xs ml-3 ${error.name ? "text-red-600" : "text-gray-600"}`}>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={`
                                        w-full border rounded
                                        ${error.name ? "border-red-600" : "border-gray-300"}
                                        ${error.name
                                            ? "focus:outline-none focus:ring-2 ring-inset focus:ring-red-500 focus:border-red-500"
                                            : "hover:border-gray-900 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500"}
                                        px-3 py-3`
                                    }
                                />
                                {error.name && <p className="text-xs text-red-600 mt-1 ml-3">{error.name}</p>}
                            </div>
                            {/* email address */}
                            <div className={`${error.email ? "mb-2" : "mb-4"}`}>
                                <label className={`text-xs ml-3 ${error.email ? "text-red-600" : "text-gray-600"}`}>Email Address *</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`
                                        w-full border rounded
                                        ${error.email ? "border-red-600" : "border-gray-300"}
                                        ${error.email
                                            ? "focus:outline-none focus:ring-2 ring-inset focus:ring-red-500 focus:border-red-500"
                                            : "hover:border-gray-900 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500"}
                                        px-3 py-3`
                                    }
                                />
                                {error.email && <p className="text-xs text-red-600 mt-1 ml-3">{error.email}</p>}
                            </div>
                            {/* phone number */}
                            <div className={`${error.phone ? "mb-2" : "mb-4"}`}>
                                <label className={`text-xs ml-3 ${error.phone ? "text-red-600" : "text-gray-600"}`}>Phone Number *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={`
                                        w-full border rounded
                                        ${error.phone ? "border-red-600" : "border-gray-300"}
                                        ${error.phone
                                            ? "focus:outline-none focus:ring-2 ring-inset focus:ring-red-500 focus:border-red-500"
                                            : "hover:border-gray-900 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500"}
                                        px-3 py-3`
                                    }
                                />
                                {error.phone && <p className="text-xs text-red-600 mt-1 ml-3">{error.phone}</p>}
                            </div>
                            {/* message */}
                            <div className={`${error.message ? "mb-2" : "mb-4"}`}>
                                <label className={`text-xs ml-3 ${error.message ? "text-red-600" : "text-gray-600"}`}>Message *</label>
                                <textarea
                                    type="text"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`
                                        w-full border rounded
                                        ${error.message ? "border-red-600" : "border-gray-300"}
                                        ${error.message
                                            ? "focus:outline-none focus:ring-2 ring-inset focus:ring-red-500 focus:border-red-500"
                                            : "hover:border-gray-900 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500"}
                                        px-3 py-3`
                                    }
                                />
                                {error.message && <p className="text-xs text-red-600 mt-1 ml-3">{error.message}</p>}
                            </div>
                            {/* submission button */}
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 ease-in-out py-2 px-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
