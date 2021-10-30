import "./Images.css";
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";

const Images = (props) => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.token) {
      props.history.replace("/");
    }
  }, [props.token, props.history]);

  useEffect(() => {
    document.title = "Search Images";
    window.scrollTo(0, 0);
    setError("");
    setLoading(true);
    const fetchImages = async () => {
      let data = await fetch(
        `https://api.unsplash.com/search/photos/?query=${
          props.location.search.split("=")[1]
        }&client_id=cXrE78i9mpNC00_KikdMu-SPaznzPkj-yVv2znQkOyg`
      );
      data = await data.json();
      setUrls(data.results);
      if (data.total === 0) {
        setError("No Results Found.");
      }
      setLoading(false);
    };
    fetchImages();
  }, [props.location.search]);

  const searchHandler = async (event) => {
    event.preventDefault();
    if (search === "") {
      setError("*Please enter valid query.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      try {
        props.history.push(`/images?search=${search}`);
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  const imageGrid = urls.map((img, index) => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="Img" key={index}>
          <img src={img.urls.small} alt="unsplash" />
        </div>
      );
    }
  });

  return (
    <Layout>
      <div className="Images">
        <div className="Search">
          <form onSubmit={searchHandler}>
            <input
              type="search"
              placeholder="Search Images."
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <span className="Error">{error}</span>
        </div>
        {loading ? <Spinner /> : <div className="ImageGrid">{imageGrid}</div>}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Images);

//  https://api.unsplash.com/search/photos/?query=space
