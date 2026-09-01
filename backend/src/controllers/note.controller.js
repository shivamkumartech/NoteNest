import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const newNote = await Note.create({
      title: title.trim(),
      content: content.trim(),
      owner: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Create note error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Get notes error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.userId,
      },
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        returnDocument: "after",
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Update note error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
