import { createContext, useContext, useEffect, useState } from "react";
import {
  createNoteApi,
  deleteNoteApi,
  getNotesApi,
  updateNoteApi,
} from "../api/notes";
import { AuthContext } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { user, accessToken, loading: authLoading } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNotes = async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      setError("");

      const data = await getNotesApi();

      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);

      setError(error.response?.data?.message || "Unable to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (note) => {
    if (!accessToken) return;

    try {
      setError("");

      const data = await createNoteApi(note);

      setNotes((prevNotes) => [data.note, ...prevNotes]);

      return data.note;
    } catch (error) {
      console.error("Error creating note:", error);

      const message = error.response?.data?.message || "Unable to create note";

      setError(message);

      throw error;
    }
  };

  const updateNote = async (id, updatedNote) => {
    if (!accessToken) return;

    try {
      setError("");

      const data = await updateNoteApi(id, updatedNote);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? data.note : note)),
      );

      return data.note;
    } catch (error) {
      console.error("Error updating note:", error);

      const message = error.response?.data?.message || "Unable to update note";

      setError(message);

      throw error;
    }
  };

  const deleteNote = async (id) => {
    if (!accessToken) return;

    try {
      setError("");

      await deleteNoteApi(id);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);

      const message = error.response?.data?.message || "Unable to delete note";

      setError(message);

      throw error;
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user || !accessToken) {
      setNotes([]);
      return;
    }

    getNotes();
  }, [user, accessToken, authLoading]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        error,
        getNotes,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
