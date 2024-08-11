import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">View Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id} className="border p-2 mb-2">
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsers;
