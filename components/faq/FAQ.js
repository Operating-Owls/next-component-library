"use client";

import { useState } from "react";

export default function FAQ() {
    //state to keep track of active indexes
    const [activeIndexes, setActiveIndexes] = useState([]);

    //example static questions/answers
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "Our return policy allows you to return items within 30 days of purchase. Items must be in their original condition and packaging. Please contact our customer service for a return authorization."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has been shipped, you will receive an email with a tracking number and a link to the carrier's website where you can track your shipment."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination. Please check our shipping policy for more details."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. You can choose your preferred payment method at checkout."
        },
        {
            question: "How do I contact customer service?",
            answer: "You can contact our customer service team via email at support@example.com or call us at 1-800-123-4567. Our support hours are Monday to Friday, 9 AM to 5 PM EST."
        }
    ]

    //function called when a question is clicked
    const toggleFAQ = (index) => {
        setActiveIndexes((prevIndexes) => //updates the state of active indexes
          prevIndexes.includes(index) //checks if index is already active
            ? prevIndexes.filter((i) => i !== index) //if so, then removes it from the array
            : [...prevIndexes, index] //if not, then adds it to the array
        );
    };

    return (
        <div>
            {/* container */}
            <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
                {/* component */}
                <div className="flex flex-col bg-gray-50 rounded-md my-8 py-8 px-8">
                    {/* information section */}
                    <div className="px-6 pt-4">
                        {/* title */}
                        <div className="text-2xl font-bold tracking-tight text-slate-900 pb-5">
                            Frequently asked questions
                        </div>
                        {/* info */}
                        <div className="text-md font-normal tracking-tight text-slate-600 mb-5">
                            Here are some of the frequently asked questions about out product.
                        </div>
                    </div>
                    {/* questions/answers section */}
                    <div className="px-6 pb-2">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b mb-5">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-md font-normal tracking-tight text-left text-slate-800 pb-5"
                                    // className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                                >
                                    <div>{faq.question}</div>
                                    <div>{activeIndexes.includes(index) ? '-' : '+'}</div>
                                </button>
                                {activeIndexes.includes(index) && (
                                    <div className="text-md font-normal tracking-tight text-slate-600 pb-5">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
