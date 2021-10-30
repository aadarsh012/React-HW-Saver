import "./Albums.css";
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Loading from "../../UI/ScheletonLoading/Loading";
import { connect } from "react-redux";

const Albums = (props) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.token) {
      props.history.replace("/");
    }
  }, [props.token, props.history]);

  useEffect(() => {
    document.title = "Albums";
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchAlbums = async () => {
      let data = await fetch(`https://jsonplaceholder.typicode.com/albums`);
      data = await data.json();
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
        <i>{album.id}.</i>
        <span className="title">{album.title}</span>
      </div>
    );
  });

  return (
    <Layout>
      <div className="Albums">
        {loading ? <Loading /> : <div className="AlbumsGrid">{albumsGrid}</div>}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Albums);
