import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile({ handleCloseEdit }) {
    const [formData, setFormData] = useState({
        jobType: '',
        username: '',
        image: null,
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append('jobType', formData.jobType);
        updatedData.append('username', formData.username);
        if (formData.image) {
            updatedData.append('image', formData.image);
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/edit-profile`,
                updatedData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true // Ensure cookies are sent for auth if needed
                }
            );
            const updatedUser = response.data.user; 
            console.log('Updated User:', updatedUser);
            handleCloseEdit(true);

            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Profile update failed:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleCloseEdit} // Close when clicking outside the form
        >
            <form 
                onSubmit={handleSubmit} 
                onClick={(e) => e.stopPropagation()} // Prevent click inside the form from closing it
                className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Profile</h2>

                {/* Username Input */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                {/* Job Type Input */}
                <div className="mb-4">
                    <label htmlFor="jobType" className="block text-gray-700 font-medium mb-2">Job Type</label>
                    <input
                        type="text"
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter job type"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Profile Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
