import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import NavBar from './NavBar';
import Footer from './Footer';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friends, setFriends] = useState([]);
  let allMessages = [];


  
  const fetchMessages = async (conversationId) => {
    try {
      console.log('Fetching messages for conversationId:', conversationId);
  
      const response = await axios.get(`http://localhost:8000/api/conversations/${conversationId}/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      console.log('Messages fetched successfully:', response.data);
      setMessages(response.data.messages);
      // setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  const handleFriendClick = async (friendId) => {
    try {
      // Check if there's an existing conversation with the friend
      const existingConversation = conversations.find((conv) => {
        return (
          (conv.user1_id === friendId && conv.user2_id === auth.user.id) ||
          (conv.user2_id === friendId && conv.user1_id === auth.user.id)
        );
      });
  
      if (existingConversation) {
        // If an existing conversation is found, set it as the selectedConversation
        setSelectedConversation(existingConversation.id);
      } else {
        // If no existing conversation, create a new one
        const response = await axios.post(
          'http://localhost:8000/api/conversations',
          { user2_id: friendId },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        // Set the newly created conversation as the selectedConversation
        setSelectedConversation(response.data.id);
      }
    } catch (error) {
      console.error('Error handling friend click:', error);
    }
  };


  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchFriends();
      await fetchConversations();
      if (selectedConversation) {
        await fetchMessages(selectedConversation);
      }
    };
  
    fetchInitialData();
  
    Pusher.logToConsole = true;
  
    const pusher = new Pusher('1d0f28c9248cd3fb0d26', {
      cluster: 'eu',
    });
  
    const channel = pusher.subscribe(`chat.${selectedConversation}`);
    channel.bind('new-message', function (data) {
      allMessages.push(data);
      console.log("dataaa", data)

       // Extract message content and conversation ID from data
    const { content, conversation_id } = data.message;

    const isDuplicate = messages.some(message => message.id === conversation_id && message.content === content);

    if (!isDuplicate) {
    // Update the messages state
    setMessages([...messages, { id: conversation_id, content }]);
  }

      // setMessages([...allMessages]);
      // Call fetchMessages to update the messages from the server
      fetchMessages(selectedConversation);
    });
  
    return () => {
      if (selectedConversation) {
        pusher.unsubscribe(`chat.${selectedConversation}`);
      }
    };
  }, [selectedConversation, conversations]);
  const fetchConversations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/conversations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      // Check if selectedConversation is defined
      if (!selectedConversation) {
        console.error('No conversation selected.');
        return;
      }
  
      // Make a POST request to send a new message
      const response = await axios.post(
        `http://localhost:8000/api/conversations/${selectedConversation}/messages`,
        {
          conversation_id: selectedConversation,  // Include the conversation_id
          content: newMessage,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Update the UI with the new message
      // setMessages([...messages, response.data]);
      setMessages((prevMessages) => [...prevMessages, response.data]);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/friendships/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (e.key === 'Enter') {
        // Prevent the default behavior (adding a new line)
        e.preventDefault();
        // Call the handleSendMessage function
        handleSendMessage();
    }
};

 

  return (
    <div>
      <NavBar />
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row">
            {/* Member List */}
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">Friends</h5>
              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {friends.map((friend) => (
                      <li key={friend.id} className="p-2 border-bottom" style={{ backgroundColor: '#eee' }}>
                        <button
                          onClick={() => handleFriendClick(friend.friend_id)}
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{friend.friend_name}</p>
                              {/* Add other details you want to display */}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="col-md-6 col-lg-7 col-xl-8">
              <ul className="list-unstyled">
                {messages.map((message) => (
                  <li key={message.id} className="d-flex justify-content-between mb-4">
                    {/* Add your message avatar rendering logic here */}
                    <div className="card">
                      <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{message?.user?.name}</p>
                        {/* <p className="text-muted small mb-0"> {message.created_at}</p> */}
                      </div>
                      <div className="card-body">
                        <p className="mb-0">{message.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Message Input */}
              <li className="bg-white mb-3">
                <div className="form-outline">
                  <textarea
                    className="form-control"
                    id="textAreaExample2"
                    rows="4"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                  ></textarea>
                  <label className="form-label" htmlFor="textAreaExample2">Message</label>
                </div>
              </li>
              <button
                type="button"
                className="btn btn-info btn-rounded float-end"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Chat;
