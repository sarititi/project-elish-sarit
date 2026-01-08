import { Link } from "react-router-dom";
import "./Albums.css";

function AlbumCard({ album, userId }) {
  return (
    <Link
      to={`/users/${userId}/home/albums/${album.id}`}
      className="album-card"
    >
      <div className="album-id">ID: {album.id}</div>
      <h3 className="album-title">{album.title}</h3>
      <div className="album-arrow">←</div>
    </Link>
  );
}
export default AlbumCard;