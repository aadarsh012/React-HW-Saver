import { useEffect, useState } from "react";
import classes from "./Album.module.css";
import Layout from "../../../Components/Layout/Layout";
import Loading from "../../../UI/ScheletonLoading/Loading";
import { connect } from "react-redux";
const Album = (props) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.token) {
      props.history.replace("/");
    }
  }, [props.token, props.history]);

  useEffect(() => {
    document.title = "Photos";
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchAlbum = async () => {
      let data = await fetch(
        `https://jsonplaceholder.typicode.com/albums?id=${props.match.params.albumId}`
      );
      data = await data.json();
      let photos = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${props.match.params.albumId}`
      );
      photos = await photos.json();
      setPhotos(photos);
      setLoading(false);
    };
    fetchAlbum();
  }, [props.match.params.albumId]);

  const photosGrid = photos.map((photo, index) => {
    return (
      <div className={classes.Photo}>
        <img src={photo.url} alt="" />
      </div>
    );
  });

  return (
    <Layout>
      <div className={classes.Album}>
        {loading ? <Loading /> : <div className={classes.PhotosGrid}>{photosGrid}</div>}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Album);
