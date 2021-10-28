import { useEffect, useState } from "react";
import "./Post.css";
import Layout from "../../../Components/Layout/Layout";
import Spinner from "../../../UI/Spinner/Spinner";

const Posts = (props) => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.history.replace("/");
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchPost = async () => {
      let data = await fetch(
        `https://jsonplaceholder.typicode.com/posts?id=${props.match.params.id}`
      );
      data = await data.json();
      setPost(data);
      let comments = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${props.match.params.id}`
      );
      comments = await comments.json();
      setComment(comments);
      setLoading(false);
    };
    fetchPost();
  }, []);

  const posts = post.map((p, index) => {
    return (
      <div key={index} className="Post">
        <span>{p.title}</span>
        <p>{p.body}</p>
      </div>
    );
  });

  const comments = comment.map((c, index) => {
    return (
      <div className="Comment" key={index}>
        <span className="Name">{c.name}</span>
        <span className="Email">{c.email}</span>
        <p>{c.body}</p>
      </div>
    );
  });

  return (
    <Layout>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="blob"></div>
            {posts}
            <div className="Comments">
              <span>COMMENTS:</span>
              {comments}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Posts;
