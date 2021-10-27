import "./Images.css";
import { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";

const Images = (props) => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(props);

  useEffect(() => {
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
      console.log(data);
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
          <img src={img.urls.full} alt="unsplash" />
        </div>
      );
    }
  });

  return (
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
  );
};
export default Images;
//  https://api.unsplash.com/search/photos/?query=space

//cXrE78i9mpNC00_KikdMu-SPaznzPkj-yVv2znQkOyg
