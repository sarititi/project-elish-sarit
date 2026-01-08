// import { useState } from "react";

// function AddAlbum({ onAdd }) {
//     const [title, setTitle] = useState("");

//     async function handleSubmit() {
//         if (!title) return;
//         await onAdd(title);
//         setTitle("");
//     }

//     return (
//         <div className="album-create">
//             <input
//                 placeholder="שם אלבום חדש"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <button onClick={handleSubmit}>הוסף אלבום</button>
//         </div>
//     );
// }

// export default AddAlbum;
