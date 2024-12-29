import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Heirarchy = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getOrganizations'); // Fetch organizations
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold">Organizations, Teams, and Members</h1>
      {organizations.map((org) => (
        <div key={org._id} className="mt-5">
          <h2 className="text-xl font-semibold">Organization: {org.name}</h2>
          <div className="ml-6">
            {org.teams && org.teams.length > 0 ? (
              org.teams.map((team) => (
                <div key={team._id} className="mt-5">
                  <h3 className="text-lg font-medium">Team: {team.name}</h3>
                  <ul>
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member) => (
                        <li key={member._id} className="ml-5">
                          <span className="font-bold">Member: </span>{member.name} (Email: {member.email})
                        </li>
                      ))
                    ) : (
                      <li className="ml-5">No members found</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No teams found</p>
            )}
          </div>
        </div>
      ))}

      <a href='/' className="btn mt-10 btn-primary">Back</a>
    </div>
  );
};

export default Heirarchy;
