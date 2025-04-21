import React, { useState, useEffect } from "react";
import "./ImageComment.css";

const ImageComment = ({ imageKey, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedComments = localStorage.getItem(`${imageKey}_comments`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    setIsLoading(false);
  }, [imageKey]);

  const addComment = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      text: inputText,
      timestamp: new Date().toISOString()
    };
    
    const newComments = [...comments, newComment];
    setComments(newComments);
    localStorage.setItem(`${imageKey}_comments`, JSON.stringify(newComments));
    setInputText("");
  };

  const deleteComment = (commentId) => {
    const filteredComments = comments.filter(comment => comment.id !== commentId);
    setComments(filteredComments);
    localStorage.setItem(`${imageKey}_comments`, JSON.stringify(filteredComments));
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="image-comment">
      <div className="image-container">
        <img src={imageUrl} alt={`Image ${imageKey}`} loading="lazy" />
      </div>
      <form className="comment-form" onSubmit={addComment}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a comment..."
          maxLength={200}
        />
        <button type="submit">Comment</button>
      </form>
      <ul className="comments-list">
        {comments.map(({ id, text, timestamp }) => (
          <li key={id} className="comment-item">
            <span>{text}</span>
            <div className="comment-meta">
              <small>{new Date(timestamp).toLocaleString()}</small>
              <button 
                onClick={() => deleteComment(id)}
                className="delete-btn"
                aria-label="Delete comment"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageComment;