// src/api/AlbumsAPI.js

const BASE_URL = "http://localhost:3001";

/* =========================
   אלבומים
========================= */

// כל האלבומים של משתמש
export async function getAlbumsByUser(userId) {
  const res = await fetch(`${BASE_URL}/albums?userId=${userId}`);
  return await res.json();
}

// יצירת אלבום חדש
export async function createAlbum(userId, title) {
  const res = await fetch(`${BASE_URL}/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title })
  });

  return await res.json();
}

/* =========================
   תמונות
========================= */

// תמונות של אלבום – טעינה הדרגתית
export async function getPhotosByAlbum(albumId, page, limit = 6) {
  const res = await fetch(
    `${BASE_URL}/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`
  );
  return await res.json();
}

// הוספת תמונה
export async function createPhoto(albumId, title, url, thumbnailUrl) {
  const res = await fetch(`${BASE_URL}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ albumId, title, url, thumbnailUrl })
  });

  return await res.json();
}

// מחיקת תמונה
export async function deletePhoto(photoId) {
  await fetch(`${BASE_URL}/photos/${photoId}`, {
    method: "DELETE"
  });
}
