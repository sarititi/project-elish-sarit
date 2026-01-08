import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { getAlbumsByUser, createAlbum } from "../api/AlbumsAPI";
import AlbumCreate from "./AlbumCreate.jsx";
import AlbumSearch from "./AlbumSearch.jsx";
import AlbumCard from "./AlbumCard.jsx";
import { filterByIdTitle } from "../utils/filterByIdTitle";
import "./Albums.css";

function Albums() {
  const { user } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, [user.id]);

  async function fetchAlbums() {//טוליפת נתונים של האלבומים מהשרת
    setIsLoading(true);
    const data = await getAlbumsByUser(user.id);
    setTimeout(() => {
      setAlbums(data);
      setIsLoading(false);
    }, 500);
  }

  async function handleCreateAlbum(title) {
    const newAlbum = await createAlbum(user.id, title);
    setAlbums(prev => [...prev, newAlbum]);//בתוך הקודם של האלבומים מוסיף את האלבום החדש
  }

const filteredAlbums = filterByIdTitle(
  albums,
  searchBy === "id" ? searchTerm : "",
  searchBy === "title" ? searchTerm : ""
);


  return (
    <div className="albums-page">
      <h2 className="page-title">📚 האלבומים שלי</h2>

      <AlbumCreate onCreateAlbum={handleCreateAlbum} />

      <AlbumSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />

      {/* תצוגת האלבומים */}
      {isLoading ? (
        <div className="loading">טוען אלבומים...</div>
      ) : filteredAlbums.length === 0 ? (
        <div className="no-results">
          {searchTerm ? "לא נמצאו תוצאות" : "אין אלבומים עדיין"}
        </div>
      ) : (
        <div className="albums-grid">
          {filteredAlbums.map(album => (
            <AlbumCard key={album.id} album={album} userId={user.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;