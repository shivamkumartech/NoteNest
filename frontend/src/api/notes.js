import api from "./client";

export const getNotesApi = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const createNoteApi = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const updateNoteApi = async (id, updatedNote) => {
  const response = await api.put(`/notes/${id}`, updatedNote);
  return response.data;
};

export const deleteNoteApi = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
