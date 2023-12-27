import React,{useState, useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import UserList from './UserList';

const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch friend requests and friend list on component mount
    fetchFriendRequests();
    fetchFriendList();
    // fetchUsers();
  }, []); // Empty dependency array ensures this effect runs once on mount


  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/users/not-friends', {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  const fetchFriendRequests = async () => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axios.get('http://localhost:8000/api/friendships/requests', {headers: headers});
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriendList = async () => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axios.get('http://localhost:8000/api/friendships/list', {headers: headers});
      setFriendList(response.data);
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };

  const acceptFriendRequest = async (senderId) => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      await axios.post('http://localhost:8000/api/friendships/accept-request', { sender_id: senderId }, {headers: headers});
      // Remove the accepted friend request from the list
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.sender_id !== senderId));
      // Fetch the updated friend list
      fetchFriendList();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleAddFriend = async (userId) => {
    try {
      await axios.post('http://localhost:8000/api/friendships/send-request', {
        receiver_id: userId,
      });
      // You can update the UI to show a success message or update the list of friend requests
      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // const handleSendRequest = async () => {
  //   // Assuming you have a form to input the receiver's ID
  //   const receiverId = prompt('Enter the ID of the user you want to send a friend request to:');
  //   try {
  //     await axios.post('http://localhost:8000/api/friendships/send-request', { receiver_id: receiverId });
  //     // You can update the UI to show a success message or update the list of friend requests
  //   } catch (error) {
  //     console.error('Error sending friend request:', error);
  //   }
  // };

  return (
    <div>
      <NavBar />
      {/* Friend Requests */}
      <div className="container mt-5">
        <h2>Friend Requests</h2>
        {friendRequests.map((request) => (
          <div key={request.id} className="card m-3">
            <div className="card-body p-4">
              <h5 className="card-title">{request.sender_name}</h5>
              <button
                className="btn btn-success float-end"
                onClick={() => acceptFriendRequest(request.sender_id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
