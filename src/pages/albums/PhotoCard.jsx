import {useState } from "react";
import "./Albums.css";

function PhotoCard({ photo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(photo.title);
  const [editUrl, setEditUrl] = useState(photo.url);

  async function handleUpdate() {
    await onUpdate(photo.id, editTitle, editUrl);
    setIsEditing(false);
  }

  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} className="photo-image" />
      
      {isEditing ? (
        <div className="photo-edit">
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="כותרת"
            className="edit-input"
          />
          <input
            value={editUrl}
            onChange={e => setEditUrl(e.target.value)}
            placeholder="קישור לתמונה"
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="btn-save">💾 שמור</button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">✖ ביטול</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="photo-title">{photo.title}</h4>
          <div className="photo-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✏️ ערוך
            </button>
            <button onClick={() => onDelete(photo.id)} className="btn-delete">
              🗑️ מחק
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default PhotoCard;