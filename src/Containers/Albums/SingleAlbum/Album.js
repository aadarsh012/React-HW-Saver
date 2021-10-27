import { useEffect, useState } from "react";
import classes from "./Album.module.css";
import Loading from "../../../UI/ScheletonLoading/Loading";
const Album = (props) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchAlbum = async () => {
      let data = await fetch(
        `https://jsonplaceholder.typicode.com/albums?id=${props.match.params.albumId}`
      );
      data = await data.json();
      console.log(data);
      let photos = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${props.match.params.albumId}`
      );
      photos = await photos.json();
      setPhotos(photos);
      console.log(photos);
      setLoading(false);
    };
    fetchAlbum();
  }, []);

  const photosGrid = photos.map((photo, index) => {
    return (
      <div className={classes.Photo}>
        <img src={photo.url} />
      </div>
    );
  });

  return (
    <div className={classes.Album}>
      {loading ? <Loading /> : <div className={classes.PhotosGrid}>{photosGrid}</div>}
    </div>
  );
};
export default Album;
