import React from "react";
import users from "../data/twitter_users.json";
import "../styles/TwitterProfile.css";

function TwitterProfile() {
  return (
    <div className="tw-container">
      {users.map((user, index) => (
        <div className="tw-card" key={index}>
          <img src={user.profile_image} alt="avatar" className="tw-avatar" />
          <h2>{user.name}</h2>
          <p className="tw-username">@{user.username}</p>
          <p className="tw-bio">{user.bio}</p>
          <div className="tw-stats">
            <span>{user.followers} Followers</span> · <span>{user.following} Following</span>
          </div>
          <div className="tw-tweets">
            {user.tweets.length > 0 ? (
              user.tweets.map((tweet, i) => (
                <p key={i} className="tw-tweet">📝 {tweet.text}</p> 
              ))
            ) : (
              <p>No tweets yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TwitterProfile;
