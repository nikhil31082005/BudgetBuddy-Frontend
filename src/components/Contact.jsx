import React, { useState, useEffect } from "react";
import emailjs from 'emailjs-com'; // Ensure you have installed this: npm install emailjs-com

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Determine the correct prefix based on your build tool (Create React App vs. Vite)
    // You can usually just pick one or handle conditionally if you're unsure or for a generic example.
    // For simplicity, let's assume it's one or the other.

    // If using Create React App:
    // const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    // const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    // const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

    // If using Vite: (uncomment and replace the above if you're using Vite)
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;


    // Initialize EmailJS when the component mounts
    useEffect(() => {
        if (!EMAILJS_PUBLIC_KEY) {
            console.error("EmailJS Public Key is not defined. Please check your .env file.");
            // You might want to handle this error more gracefully in a production app
            return;
        }
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }, [EMAILJS_PUBLIC_KEY]); // Dependency array includes the key to re-init if it changes (though unlikely)

    // Handle input changes to update state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Function to send the email
    const sendEmail = (e) => {
        e.preventDefault(); // Prevent default form submission which would reload the page

        const { name, email, message } = formData;

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Basic check for environment variables
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
            console.error("EmailJS Service ID or Template ID is not defined. Please check your .env file.");
            alert("Email sending failed due to missing configuration.");
            return;
        }

        const params = {
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then((response) => {
                alert("Email sent successfully!");
                // Optionally clear the form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }, (error) => {
                console.error("Failed to send email:", error); // Log the error for debugging
                alert("Failed to send email. Please try again later.");
            });
    };

    return (
        <>
            <div id="contact" className="bg-gray-100 py-16 px-8 lg:px-32">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
                        Contact Me
                    </h2>

                    <form className="bg-white shadow-lg rounded-lg p-8 space-y-6" onSubmit={sendEmail}>
                        <div>
                            <label
                                className="block text-gray-600 text-sm font-medium mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-600 text-sm font-medium mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-600 text-sm font-medium mb-2"
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="6"
                                placeholder="Your Message"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;