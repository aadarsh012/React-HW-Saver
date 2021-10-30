import { useEffect, useState } from "react";
import "./Post.css";
import Layout from "../../../Components/Layout/Layout";
import { connect } from "react-redux";
import Spinner from "../../../UI/Spinner/Spinner";

const Posts = (props) => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.token) {
      props.history.replace("/");
    }
  }, [props.token, props.history]);

  useEffect(() => {
    document.title = "Comments";
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
  }, [props.match.params.id]);

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
        <span className="Name">
          <span className="DP">{c.name[0].toUpperCase()}</span>
          {c.name}
        </span>
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
const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Posts);
