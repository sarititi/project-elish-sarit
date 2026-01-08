import {useState} from "react";
import { createPhoto} from "../api/AlbumsAPI";
import "./Albums.css";

function AddPhotoForm({ albumId, onPhotoAdded }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newPhoto = await createPhoto(albumId, newTitle, newUrl);
    onPhotoAdded(newPhoto);
    setNewTitle("");
    setNewUrl("");
    setIsAdding(false);
  }

  if (!isAdding) {
    return (
      <button onClick={() => setIsAdding(true)} className="btn-add-photo">
        + הוסף תמונה חדשה
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-photo-form">
      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="כותרת התמונה"
        className="photo-input"
      />
      <input
        value={newUrl}
        onChange={e => setNewUrl(e.target.value)}
        placeholder="קישור לתמונה (URL)"
        className="photo-input"
      />
      <div className="form-buttons">
        <button type="submit" className="btn-save">💾 הוסף</button>
        <button type="button" onClick={() => setIsAdding(false)} className="btn-cancel">
          ✖ ביטול
        </button>
      </div>
    </form>
  );
}
export default AddPhotoForm;