import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoAdd from "./PhotoAdd.jsx";
import PhotoCard from "./PhotoCard.jsx";
import { AuthContext } from "../AuthContext.jsx";
import { getPhotosByAlbum, getAlbumsByUser, deletePhoto, updatePhoto } from "../api/AlbumsAPI.js";
import "./Albums.css";

function AlbumPhotos() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [albumTitle, setAlbumTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAlbumData();
    loadPhotos(1);
  }, [albumId]);

  async function fetchAlbumData() {
    const albums = await getAlbumsByUser(user.id);
    const album = albums.find(a => a.id === albumId);
    if (album) {
      setAlbumTitle(album.title);
    }
  }

  async function loadPhotos(pageNum) {
    setIsLoading(true);
    const newPhotos = await getPhotosByAlbum(albumId, pageNum, 6);
    
    setTimeout(() => {
      if (newPhotos.length < 6) {
        setHasMore(false);
      }
      if (pageNum === 1) {
        setPhotos(newPhotos);
      } else {
        setPhotos(prev => [...prev, ...newPhotos]);
      }
      setIsLoading(false);
    }, 500);
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(nextPage);
  }

  async function handleDeletePhoto(photoId) {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) {
      return;
    }
    await deletePhoto(photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  }

  async function handleUpdatePhoto(photoId, title, url) {
    await updatePhoto(photoId, title, url);
    setPhotos(prev => prev.map(p =>
      p.id === photoId ? { ...p, title, url } : p
    ));
  }

  function handlePhotoAdded(newPhoto) {
    setPhotos(prev => [newPhoto, ...prev]);
  }

  return (
    <div className="album-photos-page">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← חזרה לאלבומים
      </button>

      <h2 className="album-photos-title">📸 {albumTitle}</h2>

      <PhotoAdd albumId={albumId} onPhotoAdded={handlePhotoAdded} />

      <div className="photos-grid">
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onDelete={handleDeletePhoto}
            onUpdate={handleUpdatePhoto}
          />
        ))}
      </div>

      {isLoading && <div className="loading">טוען תמונות...</div>}

      {hasMore && !isLoading && photos.length > 0 && (
        <button onClick={handleLoadMore} className="btn-load-more">
          📥 טען עוד תמונות
        </button>
      )}

      {!hasMore && photos.length > 0 && (
        <div className="end-message">זה הכל! אין עוד תמונות 🎉</div>
      )}

      {photos.length === 0 && !isLoading && (
        <div className="no-photos">אין תמונות באלבום זה. הוסף תמונות כדי להתחיל!</div>
      )}
    </div>
  );
}

export default AlbumPhotos;