import { useEffect, useState } from "react";
import Loading from "../../UI/ScheletonLoading/Loading";
import Layout from "../../Components/Layout/Layout";
import "./Posts.css";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.history.replace("/");
    }
  });

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      let data = await fetch("https://jsonplaceholder.typicode.com/posts");
      data = await data.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const postGrid = posts.map((post, index) => {
    return (
      <div
        className="SinglePost"
        onClick={() => props.history.push(`/posts/${post.id}`)}
        key={index}
      >
        <span className="title">{post.title}</span>
        <p className="body">{post.body}</p>
      </div>
    );
  });
  return (
    <Layout>
      <div className="Posts">
        {loading ? <Loading /> : <div className="PostsGrid">{postGrid}</div>}
      </div>
    </Layout>
  );
};
export default Posts;
