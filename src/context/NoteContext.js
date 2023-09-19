import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const ActionTypes = {
  GET_NOTES: "GET_NOTES",
  EDIT_NOTE: "EDIT_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTES:
      return action.payload;
    case ActionTypes.EDIT_NOTE:
      return state.map((note) => {
        return note.id === action.payload.id
            ? action.payload.editedNote
            : note
      });
    case ActionTypes.DELETE_NOTE:
      return state.filter(n => n.id !== action.payload);
    default:
      return state;
  }
};

const getAllNotes = (dispatch) => async () => {
  const response = await jsonServer.get("/notes");
  dispatch({ type: ActionTypes.GET_NOTES, payload: response.data });
};

const addNote = (dispatch) => async (note) => {
  await jsonServer.post("/notes", { 
    title: note.title,
    content: note.content,
    date: new Date().toLocaleDateString()
  });
};

const editNote = (dispatch) => async (id, editedNote) => {
  await jsonServer.put(`/notes/${id}`, { 
    title: editedNote.title, 
    content: editedNote.content,
    date: new Date().toLocaleDateString()
  });
  dispatch({ type: ActionTypes.EDIT_NOTE, payload: { id, editedNote } });
};

const deleteNote = (dispatch) => async (id) => {
  await jsonServer.delete(`/notes/${id}`);
  dispatch({ type: ActionTypes.DELETE_NOTE, payload: id });
};

export const { Context, Provider } = createDataContext(
  noteReducer,
  { getAllNotes, addNote, editNote, deleteNote },
  []
);
