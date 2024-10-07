import React from 'react'

export const Profile = () => {
  return (
    <div id="profile-page">
      <div id="user-container">
        <img src="" alt="profile picture" />
        <div id="user-name-container">
          <h1 id="user-name">placeholder</h1>
          <button id="edit"></button>
        </div>
        <div id="user-bio-container">
          <h2 id="user-bio-header">about me</h2>
          <p id="user-bio">Lorem ipsum</p>
        </div>
      </div>
      <div id="user-favorites">
        // will hold Game components
      </div>
      <div id="user-rankings">
        // will hold Ranking components
      </div>
    </div>
  );
}
