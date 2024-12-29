
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddTeam() {
    const teams = {
        name: "",
        email: "",
        location: "",
        organization: ""  // Organization will be set via radio button
    };

    const nav = useNavigate();
    const [team, setTeam] = useState(teams);
    const [organizations, setOrganizations] = useState([]); // For storing organizations
    const [loading, setLoading] = useState(true); // Loading state for organizations

    // Fetch organizations when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3000/api/getorganizations")
            .then(response => {
                console.log('Fetched Organizations:', response.data);  // Debugging log
                setOrganizations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching organizations:", error);
                toast.error("Failed to load organizations.", { position: "top-right" });
                setLoading(false);
            });
    }, []);

    // Handle form changes
    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(`Updating field: ${name} with value: ${value}`);  // Debugging log
        setTeam({
            ...team,
            [name]: value
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/team", team);
            toast.success("Team added successfully!", { position: "top-right" });
            nav("/teams");
        } catch (error) {
            console.error("Error adding team:", error);
            toast.error("An error occurred while adding the team.", { position: "top-right" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-full max-w-md">
                <a href='/teams' className='btn btn-primary p-0 pl-5 pr-5'>Back</a>
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
                        value={team.name}
                        onChange={inputHandler}
                    />

                    <label className="block text-sm font-medium text-white mb-2">
                        Organization
                    </label>
                    {loading ? (
                        <p className="text-white">Loading organizations...</p>
                    ) : (
                        organizations.length > 0 ? (
                            <div className="mb-4">
                                {organizations.map((org) => (
                                    <label key={org._id} className="block text-sm text-white mb-2">
                                        <input
                                            type="radio"
                                            name="organization"
                                            value={org._id} 
                                            checked={team.organization === org._id}  
                                            onChange={inputHandler}  
                                            className="mr-2"
                                        />
                                        {org.name}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white">No organizations available.</p>
                        )
                    )}

                    <button type="submit" className="btn btn-primary w-full py-2 mt-4 text-white">
                        Add Team
                    </button>
                </form>
                <p>Selected Organization ID: {team.organization}</p> 
            </div>
        </div>
    );
}

export default AddTeam;
