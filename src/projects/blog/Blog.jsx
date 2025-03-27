import React, { useEffect, useState } from "react";
import "./Blog.css";

const Blog = () => {
 const [posts, setPosts] = useState([]);
 const [newPost, setNewPost] = useState({ title: "", content: "", author: "" });
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
   setPosts(JSON.parse(savedPosts));
   setIsLoaded(true);
  }
 }, []);

 useEffect(() => {
  try {
   if (isLoaded && posts.length >= 0) {
    localStorage.setItem("posts", JSON.stringify(posts));
   }
  } catch (error) {
   console.log(error);
  }
 }, [posts, isLoaded]);

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewPost((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  try {
   const post = {
    id: Date.now(), // Better unique ID using timestamp
    title: newPost.title,
    content: newPost.content,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
    }),
    author: newPost.author || "Anonymous",
   };
   setIsLoaded(true);
   const sortedPosts = [...posts, post].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
   );
   setPosts(sortedPosts);
   setNewPost({ title: "", content: "", author: "" });
  } catch (error) {
   console.log("Error adding new post:", error);
  }
 };

 const clearAllPosts = () => {
  if (window.confirm("Are you sure you want to delete all posts?")) {
   setPosts([]);
  }
 };

 const deletePost = (id) => {
  const updatedPosts = posts.filter((post) => post.id !== id);
  setPosts(updatedPosts);
 };

 return (
  <div className="blog-app">
   <header className="blog-header">
    <h1>Simple Blog</h1>
    <p className="subtitle">Share your thoughts with the world</p>
   </header>

   <main className="blog-container">
    <section className="post-form-section">
     <div className="form-card">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
       <div className="form-group">
        <label>Title</label>
        <input
         type="text"
         name="title"
         value={newPost.title}
         onChange={handleInputChange}
         placeholder="Enter post title"
         required
        />
       </div>
       <div className="form-group">
        <label>Content</label>
        <textarea
         name="content"
         value={newPost.content}
         onChange={handleInputChange}
         placeholder="Write your post content here..."
         required
         rows="5"
        />
       </div>
       <div className="form-group">
        <label>Author</label>
        <input
         type="text"
         name="author"
         value={newPost.author}
         onChange={handleInputChange}
         placeholder="Your name (optional)"
        />
       </div>
       <button type="submit" className="publish-button">
        Publish Post
       </button>
      </form>
     </div>
    </section>

    <section className="posts-section">
     <div className="posts-header">
      <h2>Recent Posts</h2>
      {posts.length > 0 && (
       <button onClick={clearAllPosts} className="clear-all-button">
        Clear All Posts
       </button>
      )}
     </div>

     {posts.length > 0 ? (
      <div className="posts-grid">
       {posts.map((post) => (
        <article key={post.id} className="post-card">
         <div className="post-header">
          <h3>{post.title}</h3>
          <button
           onClick={() => deletePost(post.id)}
           className="delete-button"
           aria-label="Delete post"
          >
           ×
          </button>
         </div>
         <p className="post-meta">
          By {post.author} on {post.date}
         </p>
         <p className="post-content">{post.content}</p>
        </article>
       ))}
      </div>
     ) : (
      <div className="empty-state">
       <div className="empty-icon">✍️</div>
       <h3>No Posts Yet</h3>
       <p>Write your first post to get started !</p>
      </div>
     )}
    </section>
   </main>
  </div>
 );
};

export default Blog;
