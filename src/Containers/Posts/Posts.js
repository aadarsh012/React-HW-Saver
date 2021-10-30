import { useEffect, useState } from "react";
import Loading from "../../UI/ScheletonLoading/Loading";
import { connect } from "react-redux";
import Layout from "../../Components/Layout/Layout";
import "./Posts.css";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.token) {
      props.history.replace("/");
    }
  }, [props.token, props.history]);

  useEffect(() => {
    document.title = "Posts";
    window.scrollTo(0, 0);
    setLoading(true);
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
const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Posts);
