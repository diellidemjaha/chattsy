import { useState } from 'react'
// import HelloWorld from './Components/Home'
// import SignUp from './Components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import Chat from './Components/Chat';
import Friends from './Components/Friends';
import FriendRequest from './Components/FriendRequests';
// import UserList from './Components/UserList';

function App() {


  let logged_in = localStorage.getItem('token');

  return (
    <>
  <Router>
    {logged_in == null?
    
                <Routes>
                    <Route path="/*" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                </Routes>
                :
                <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/friendrequests" element={<FriendRequest />} />
                {/* <Route path="/users/not-friends" element={<UserList />} /> */}
                {/* <Route path="/logout" /> */}
            </Routes>
  }
            </Router>
    </>
  )
}

export default App
