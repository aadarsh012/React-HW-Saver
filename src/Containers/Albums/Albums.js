import "./Albums.css";
import { useEffect, useState } from "react";
import Loading from "../../UI/ScheletonLoading/Loading";

const Albums = (props) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchAlbums = async () => {
      let data = await fetch(`https://jsonplaceholder.typicode.com/albums`);
      data = await data.json();
      console.log(data);
      setAlbums(data);
      setLoading(false);
    };
    fetchAlbums();
  }, []);

  const albumsGrid = albums.map((album, index) => {
    return (
      <div
        className="SingleAlbum"
        onClick={() => props.history.push(`/albums/photos/${album.id}`)}
        key={index}
      >
        <span className="title">
          {album.id}. {album.title}
        </span>
      </div>
    );
  });

  return (
    <div className="Albums">
      {loading ? <Loading /> : <div className="AlbumsGrid">{albumsGrid}</div>}
    </div>
  );
};
export default Albums;
