import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Organization = () => {

  const [org, setOrg] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getOrganizations");
        setOrg(response.data);
      } catch (error) {

      }
    };
    fetchData();
  }, []);

  const deleteUser = async (orgId) => {
    await axios
      .delete(`http://localhost:3000/api/deleteOrganization/${orgId}`)
      .then((response) => {
        setOrg((prevOrg) => prevOrg.filter((org) => org._id !== orgId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <a href='/addOrganization' className='btn btn-primary bg-cyan-400 text-black ml-20 mt-10' >Add Organization</a>
      <div className="overflow-x-auto m-20 mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                Sr. No.
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {org.map((org, index) => {
              return (
                <tr>
                  <th>
                    {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">
                        <a href="/teams">{org.name}</a>
                      </div>
                    </div>
                  </td>
                  <td>
                    {org.email}
                  </td>
                  <td>{org.location} </td>
                  <th>
                    {/* <Link to={`/update/` + user._id} className="btn border-cyan-500 btn-xs mr-1">Edit</Link> */}
                    <button onClick={() => deleteUser(org._id)} type="button" className="btn border-cyan-500 btn-xs mr-1">
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <a href='/' className='btn btn-primary bg-cyan-400 text-black ml-20 mt-10' >Back</a>

    </>
  )
}

export default Organization