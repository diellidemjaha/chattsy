import React,{useState, useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    // Fetch friend requests and friend list on component mount
    fetchFriendRequests();
    fetchFriendList();
  }, []);


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
      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

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
