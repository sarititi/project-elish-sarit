import {useState} from "react";
import "./Albums.css";

function CreateAlbumForm({ onCreateAlbum }) {
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    setIsCreating(true);
    await onCreateAlbum(newTitle);
    
    setTimeout(() => {
    setNewTitle("");
    setIsCreating(false);
  }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="create-album-form">
      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="שם אלבום חדש"
        className="album-input"
        disabled={isCreating}
      />
      <button 
        type="submit" 
        className="btn-add"
        disabled={isCreating || !newTitle.trim()}
      >
        {isCreating ? "יוצר..." : "+ הוסף אלבום"}
      </button>
    </form>
  );
}
export default CreateAlbumForm;