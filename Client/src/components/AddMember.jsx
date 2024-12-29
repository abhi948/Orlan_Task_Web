import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import team from '../../../Server/models/team';

function AddMember() {
    const initialMemberState = {
        name: "",
        email: "",
        uniqueId: "",
        team: team._id,
        image: null,  // Store the file object here
        
    };

    const nav = useNavigate();
    const [member, setMember] = useState(initialMemberState);
    const [teams, setteams] = useState([]); // For storing teams

    // Fetch teams when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3000/api/getTeam")
            .then(response => {
                setteams(response.data);
            })
            .catch(error => {
                console.log("Error fetching teams:", error);
                toast.error("Failed to load teams.", { position: "top-right" });
            });
    }, []);

    // Handle form changes
    const inputHandler = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setMember({
                ...member,
                image: files[0] // Store the first selected file
            });
        } else if (type === 'radio') {
            setMember({
                ...member,
                [name]: value // Update team
            });
        } else {
            setMember({
                ...member,
                [name]: value // Update other fields
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/addEmployee", member);
            toast.success("Team added successfully!", { position: "top-right" });
            nav("/member");
        } catch (error) {
            console.error("Error adding team:", error);
            toast.error("An error occurred while adding the team.", { position: "top-right" });
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-full max-w-md">
                <a href='/member' className='btn btn-primary p-0 pl-5 pr-5'>Back</a>
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
                        value={member.name}
                        onChange={inputHandler}
                    />
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="input input-bordered w-full mb-4 p-2"
                        placeholder="Enter Your Email"
                        value={member.email}
                        onChange={inputHandler}
                    />
                    <label htmlFor="uniqueId" className="block text-sm font-medium text-white mb-2">
                        Unique I'D
                    </label>
                    <input
                        type="text"
                        id="uniqueId"
                        name="uniqueId"
                        className="input input-bordered w-full mb-4 p-2"
                        placeholder="Enter Your Unique I'D"
                        value={member.uniqueId}
                        onChange={inputHandler}
                    />

                    <label className="block text-sm font-medium text-white mb-2">
                        Team
                    </label>
                    {teams.length > 0 ? (
                        <div className="mb-4">
                            {teams.map((org) => (
                                <label key={org._id} className="block text-sm text-white mb-2">
                                    <input
                                        type="radio"
                                        name="team"
                                        value={org._id}
                                        checked={member.team === org._id}
                                        onChange={inputHandler}
                                        className="mr-2"
                                    />
                                    {org.name}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">No teams available.</p>
                    )}

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={inputHandler}
                    />

                    <button type="submit" className="btn btn-primary w-full py-2 mt-4 text-white">
                        Add Member
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMember;
