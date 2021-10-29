import "./Home.css";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Spinner from "../../UI/Spinner/Spinner";

const Home = (props) => {
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.history.replace("/");
    }
  });

  useEffect(() => {
    document.title = "Homepage";
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchNasaAPI = async () => {
      let data = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=HjehelaDbzNgXZlFW3i6iiJu0NGfaCnniMCE3TIq"
      );
      data = await data.json();
      setTitle(data.title);
      setExplanation(data.explanation);
      setUrl(data.url);
      setMediaType(data.media_type);
      setDate(data.date);
      setLoading(false);
    };
    fetchNasaAPI();
  }, []);

  return (
    <Layout>
      <div className="Home">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="Image">
              <img src={url} alt="Nasa Picture of the day." />
            </div>
            <div className="Details">
              <div className="Title">
                <span>{title}</span>
              </div>
              <div className="Date">
                <span>Date: {date}</span>
              </div>
              <div className="Explanation">
                <span> {explanation}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default Home;
