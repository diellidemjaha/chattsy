// resources/js/components/SearchResults.js
import axios from 'axios';
import React from 'react';

const SearchResults = ({ users }) => {

    const handleAddFriend = async (userId) => {
        try {
          const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          };
      
          // Implement your logic to send a friend request
          // You can use the existing method or create a new one in FriendshipController
          await axios.post('http://localhost:8000/api/friendships/send-request', { receiver_id: userId }, { headers });
          
          alert('Friend request sent successfully!');
        } catch (error) {
          console.error('Error sending friend request:', error);
        }
      };

    console.log('users',users)
    return (
        <div className="container mt-5">
            <h2>Search Results</h2>
            {users?.length === 0 ? (
                <p>No users found.</p>
            ) : (
                users.map((user) => (
                    <div key={user.id} className="card m-3">
                        <div className="card-body p-4">
                            <h5 className="card-title">{user?.name}</h5>
                            <button className="btn btn-primary float-end" onClick={() => handleAddFriend(user.id)}>
                                Add Friend
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;
