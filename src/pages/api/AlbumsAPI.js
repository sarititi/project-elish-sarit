const BASE_URL = "http://localhost:3001";

async function getResource(resource, query = "") {
  const res = await fetch(`${BASE_URL}/${resource}${query}`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource}`);
  return res.json();
}

async function getResourceById(resource, id) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource} with id ${id}`);
  return res.json();
}

async function createResource(resource, data) {
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create ${resource}`);
  return res.json();
}

async function updateResource(resource, id, data) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update ${resource}`);
  return res.json();
}

async function deleteResource(resource, id) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete ${resource}`);
}

export const getAlbumsByUser = (userId) => getResource("albums", `?userId=${userId}`);
// export const getAlbumById = (albumId) => getResourceById("albums", albumId);
export const createAlbum = (userId, title) => createResource("albums", { userId, title });
// export const updateAlbum = (albumId, title) => updateResource("albums", albumId, { title });
// export const deleteAlbum = (albumId) => deleteResource("albums", albumId);

export const getPhotosByAlbum = (albumId, page = 1, limit = 6) => {
  const start = (page - 1) * limit;
  return getResource(
    "photos",
    `?albumId=${albumId}&_sort=id&_order=asc&_start=${start}&_limit=${limit}`
  );
};
export const getPhotoById = (photoId) => getResourceById("photos", photoId);
export const createPhoto = (albumId, title, url) =>
  createResource("photos", { albumId, title, url, thumbnailUrl: url });
export const updatePhoto = (photoId, title, url) =>
  updateResource("photos", photoId, { title, url, thumbnailUrl: url });
export const deletePhoto = (photoId) => deleteResource("photos", photoId);
