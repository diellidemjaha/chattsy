import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults'; 

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/api/searchusers?search=${searchTerm}`);
            setSearchResults(response.data.users);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };



  let hasToken = localStorage.getItem('token');

  const handleLogout = async (e) => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);

        localStorage.clear()

        window.location.href = '/login';

      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/"><b>Chattsy</b></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/chat">Chat</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/friends">Friends</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/friendrequests">Add friends</a>
            </li>
          </ul>
          {hasToken ? (
              <button type="button" className="btn btn-outline-light m-2" onClick={() => handleLogout()}>Sign out</button>
          
           ) : (
            <p> </p>
            )}
          <div className="nav-item">
          
          <form  onSubmit={handleSearch} className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search users..." aria-label="Search" name="search" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          </div>
          <div className="nav-item">
          <SearchResults style={{zIndex:'999999'}} users={searchResults} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
