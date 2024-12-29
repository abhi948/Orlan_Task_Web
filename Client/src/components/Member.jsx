import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Member = () => {
  const [orgs, setOrg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getEmployee");
        setOrg(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Link to="/addMember" className="btn btn-primary bg-cyan-400 text-black ml-20 mt-10">Add Member</Link>
      <div className="overflow-x-auto m-20 mt-10">
        <table className="table">
          {/* Head */}
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>UniqueID</th>
              <th>Team</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org, index) => {
              console.log(org); // Log each org to check its structure
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">
                        <a href="/member">{org.name}</a>
                      </div>
                    </div>
                  </td>
                  <td>{org.email}</td>
                  <td>{org.uniqueId}</td>
                  <td>{org.team ? org.team.name : 'No Team'}</td>
                  <td>{org.status}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
      <Link to="/teams" className="btn btn-primary bg-cyan-400 text-black ml-20 mt-10">Back</Link>
    </>
  );
};

export default Member;
