import React from "react";
import users from "../data/facebook_users";
import "../styles/FacebookProfile.css";

function FacebookProfile() {
  return (
    <div className="fb-container">
      {users.map((user, index) => (
        <div className="fb-profile" key={index}>
          
          <img src={user.cover_image || "https://via.placeholder.com/900x300"} alt="cover" className="fb-cover" />
          <div className="fb-profile-main">
            <img src={user.profile_image} alt="profile" className="fb-avatar" />
            <h2>{user.name}</h2>
            <p className="fb-username">@{user.username}</p>
            <p className="fb-bio">{user.bio}</p>
            <p className="fb-friends">{user.friends_count} Friends</p>

            
            <div className="fb-gallery">
              {user.posts.length > 0 ? (
                user.posts.map((post, i) => (
                  <div key={i} className="fb-post-card">
                    <img src={post.image_url} alt={`post-${i}`} className="fb-post-img" />
                    <p className="fb-post-content">{post.content}</p>
                    <span className="fb-post-timestamp">{new Date(post.timestamp).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p>No posts yet</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FacebookProfile;
