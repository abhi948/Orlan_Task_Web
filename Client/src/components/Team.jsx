import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Team = () => {
  const [org, setOrg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getTeam");
        setOrg(response.data);
      } catch (error) {
        // Handle error
        toast.error("Error fetching teams", { position: "top-right" });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <a href='/addTeam' className='btn btn-primary bg-cyan-400 text-black ml-20 mt-10'>Add Team</a>
      <div className="overflow-x-auto m-20 mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Organization</th>
              <th>Member</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {org.map((team, index) => {
              return (
                <tr key={team._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">
                        <a href="/member">{team.name}</a>
                      </div>
                    </div>
                  </td>
                  <td>{team.organization ? team.organization.name : 'No Organization'}</td>
                  <td>
                    {team.members ? (
                      team.members.map((member, idx) => (
                        <span className='flex m-2 font-bold' key={idx}>
                          {member.name}
                        </span>
                      ))
                    ) : ('No Members')
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <a href='/organization' className='btn btn-primary bg-cyan-400 text-black ml-20 mt-10'>Back</a>
    </>
  );
}

export default Team;
