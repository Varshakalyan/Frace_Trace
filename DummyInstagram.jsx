import React from "react";
import users from "../data/users";
import "./DummyInstagram.css";

function DummyInstagram() {
  return (
    <div className="ig-wrapper">
      {users.map((user, index) => (
        <div key={index} className="ig-profile">
          
          <div className="ig-profile-header">
            <img
              src={
                user.profile_pic_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`
              }
              alt="profile"
              className="ig-avatar"
            />
            <div className="ig-profile-details">
              <div className="ig-username-row">
                <h2>{user.username}</h2>
                {user.is_verified ? (
                  <>
                    <button className="ig-btn ig-follow-btn">Follow</button>
                    <button className="ig-btn ig-message-btn">Message</button>
                  </>
                ) : (
                  <span className="invalid-user">Unverified Profile</span>
                )}
              </div>
              <ul className="ig-stats">
                <li>
                  <strong>{user.posts?.length || 0}</strong> posts
                </li>
                <li>
                  <strong>{user.followers_count || 0}</strong> followers
                </li>
                <li>
                  <strong>{user.following_count || 0}</strong> following
                </li>
              </ul>
              <div className="ig-name">{user.full_name}</div>
              <div className="ig-bio">{user.bio || "No bio available."}</div>
            </div>
          </div>

          
          <div className="ig-gallery">
            {user.posts && user.posts.length > 0 ? (
              user.posts.map((post, idx) => (
                <div key={idx} className="ig-post-card">
                  <img
                    src={post.image_url}
                    alt={`post-${idx}`}
                    className="ig-post-img"
                  />
                  <div className="ig-post-info">
                    <p className="ig-post-caption">{post.caption}</p>
                    <div className="ig-post-meta">
                      <span>❤️ {post.likes}</span>
                      <span>🕒 {new Date(post.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-posts">No posts yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DummyInstagram;
