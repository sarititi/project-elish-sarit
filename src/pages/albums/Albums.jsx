// function AlbumPhotos() {
//     const [albumData, setAlbumData] = useState(null);
//     const [photos, setPhotos] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const { albumId } = useParams();

//     useEffect(() => {
//         async function fetchAlbum() {
//             setIsLoading(true);
//             try {
//                 const album = await getAlbumById(albumId); // אלבום אחד
//                 const albumPhotos = await getPhotosByAlbum(albumId); // תמונות

//                 setAlbumData(album);
//                 setPhotos(albumPhotos);
//             } catch (err) {
//                 console.error(err);
//             }
//             setIsLoading(false);
//         }

//         fetchAlbum();
//     }, [albumId]);

//     function handleDelete(photoId) {
//         setPhotos(prev => prev.filter(photo => photo.id !== photoId));
//     }

//     return (
//         <div className="album-photos-page">
//             <h2 className="album-title">
//                 📸 {albumData?.title || "Album Photos"}
//             </h2>

//             {isLoading && <p className="loading-text">טוען תמונות...</p>}

//             <div className="photos-grid">
//                 {photos.map(photo => (
//                     <div key={photo.id} className="photo-card">
//                         <img
//                             src={photo.url}
//                             alt={photo.title}
//                         />
//                         <h4 className="photo-title">{photo.title}</h4>
//                         <button onClick={() => handleDelete(photo.id)}>
//                             מחיקה
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {!isLoading && photos.length === 0 && (
//                 <p className="empty-text">אין תמונות באלבום הזה</p>
//             )}
//         </div>
//     );
// }

// src/pages/Albums/Albums.jsx

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { getAlbumsByUser, createAlbum } from "../api/AlbumsAPI";
import { Link } from "react-router-dom";
import "./Albums.css";

function Albums() {
    const { user } = useContext(AuthContext);
    const [albums, setAlbums] = useState([]);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        async function fetchAlbums() {
            const data = await getAlbumsByUser(user.id);
            setAlbums(data);
        }
        fetchAlbums();
    }, [user.id]);

    async function handleAddAlbum() {
        if (!newTitle) return;
        const album = await createAlbum(user.id, newTitle);
        setAlbums(prev => [...prev, album]);
        setNewTitle("");
    }

    return (
        <div className="albums-page">
            <h2>האלבומים שלי</h2>

            <div className="album-create">
                <input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="שם אלבום חדש"
                />
                <button onClick={handleAddAlbum}>הוסף אלבום</button>
            </div>

            <div className="albums-list">
                {albums.map(album => (
                    <Link
                        key={album.id}
                        to={`/users/${user.id}/home/albums/${album.id}`}
                        className="album-card"
                    >
                        <h3>{album.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Albums;

