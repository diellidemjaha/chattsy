// FriendRequest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const FriendRequest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []); 

  const handleAddFriend = async (userId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      };
  
      await axios.post('http://localhost:8000/api/friendships/send-request', { receiver_id: userId }, { headers });
      
      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div>

    <NavBar />
    <div className="container mt-5">
      <h2>All Users</h2>
      {users.map((user) => (
        <div key={user.id} className="card m-3">
          <div className="card-body p-4">
            <h5 className="card-title">{user.name}</h5>
            <button
              className="btn btn-primary float-end"
              onClick={() => handleAddFriend(user.id)}
              >
              Add Friend
            </button>
          </div>
        </div>
      ))}
    </div>
      </div>
  );
};

export default FriendRequest;
