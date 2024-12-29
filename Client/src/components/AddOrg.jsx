import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';


function AddOrg() {

    const organizations = {
        name:"",
        email:"",
        location:""
    }

    const nav = useNavigate();

    const [organization, setOrg] = useState(organizations);

    // Handle form changes
    const inputHandler = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);
        setOrg({
            ...organization,
            [name]: value
        });
    };

    // Handle form submit
    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     // Add logic to handle the form submission, e.g., send data to API
    //     await axios.post("http://localhost:3000/api/organization",organization)
    //     .then((response)=>{
    //         // console.log('User added:', user);
    //         toast.success(response.data.message, {position:"top-right"});
    //         nav("/orgnization");
    //     }).catch((error)=>{
    //         console.log("errrrrrrrrrrrror");
    //         toast.error("User Already Exist", {position:"top-right"});
    //     });        
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Send data to API
            const response = await axios.post("http://localhost:3000/api/organization", organization);
    
            // On success, show toast and navigate
            toast.success(response.data.message, { position: "top-right" });
            nav("/organization");
    
        } catch (error) {
            // Log the error for debugging
            console.error("Error during form submission:", error);
    
            // If the error response exists, log it
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
            }
    
            // Show error toast with more dynamic message if available
            const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again later.";
            toast.error(errorMessage, { position: "top-right" });
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-full max-w-md">
                <a href='/organization' className='btn btn-primary p-0 pl-5 pr-5'>Back</a>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input input-bordered w-full mb-4 p-2"
                        placeholder="Enter Your Name"
                        value={organization.name}
                        onChange={inputHandler}
                    />

                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input input-bordered w-full mb-4 p-2"
                        placeholder="Enter your Email"
                        value={organization.email}
                        onChange={inputHandler}
                    />

                    <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="input input-bordered w-full mb-4 p-2"
                        placeholder="Enter Your Address"
                        value={organization.location}
                        onChange={inputHandler}
                    />

                    <button type="submit" className="btn btn-primary w-full py-2 mt-4 text-white">
                        Add Organization
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddOrg;
