import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotosByAlbum, getAlbumsByUser } from "../api/AlbumsAPI.js";
import "./AlbumPhotos.css";

function AlbumPhotos() {
    const { albumId } = useParams();
    const navigate = useNavigate();

    const [albumData, setAlbumData] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const album = await getAlbumsByUser(albumId);
            const albumPhotos = await getPhotosByAlbum(albumId);
            setAlbumData(album);
            setPhotos(albumPhotos);
            setIsLoading(false);
        }
        fetchData();
    }, [albumId]);

    return (
        <div className="album-photos-page">
            <button onClick={() => navigate(-1)}>⬅ חזרה לאלבומים</button>

            <h2>📸 {albumData?.title}</h2>

            {isLoading && <p>טוען...</p>}

            <div className="photos-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-card">
                        <img src={photo.url} alt={photo.title} />
                        <h4>{photo.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumPhotos;
