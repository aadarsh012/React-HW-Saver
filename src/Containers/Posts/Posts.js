import { useEffect, useState } from "react";
import Loading from "../../UI/ScheletonLoading/Loading";
import "./Posts.css";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      let data = await fetch("https://jsonplaceholder.typicode.com/posts");
      data = await data.json();
      setPosts(data);
      console.log(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const postGrid = posts.map((post, index) => {
    return (
      <div className="Post" onClick={() => props.history.push(`/posts/${post.id}`)}>
        <span className="title">{post.title}</span>
        <p className="body">{post.body}</p>
      </div>
    );
  });
  return (
    <div className="Posts">
      {loading ? <Loading /> : <div className="PostsGrid">{postGrid}</div>}
    </div>
  );
};
export default Posts;
