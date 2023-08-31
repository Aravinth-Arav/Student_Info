import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get('http://localhost:3017/getStudents')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
