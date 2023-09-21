import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const ActionTypes = {
  GET_NOTES: "GET_NOTES",
  EDIT_NOTE: "EDIT_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
  SEARCH_NOTES: "SEARCH_NOTES",
  RESET: "RESET"
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTES:
      return { ...state, notes: action.payload };
    case ActionTypes.EDIT_NOTE:
      return state.map((note) => {
        return note.id === action.payload.id ? action.payload.editedNote : note;
      });
    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload)
      };
    case ActionTypes.SEARCH_NOTES:
      return {
        ...state,
        isSearchActive: action.payload ? true : false,
        filteredNotes: state.notes.filter((n) =>
          n.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
        ),
      };
    case ActionTypes.RESET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const getAllNotes = (dispatch) => async () => {
  const response = await jsonServer.get("/notes?_sort=date&_order=desc");
  dispatch({ type: ActionTypes.GET_NOTES, payload: response.data });
};

const addNote = (dispatch) => async (note, callback) => {
  await jsonServer.post("/notes", {
    title: note.title,
    content: note.content,
    date: new Date().toLocaleString(),
  });
  if (callback) {
    callback();
  }
};

const editNote = (dispatch) => async (id, editedNote) => {
  await jsonServer.put(`/notes/${id}`, {
    title: editedNote.title,
    content: editedNote.content,
    date: new Date().toLocaleString(),
  });
  dispatch({ type: ActionTypes.EDIT_NOTE, payload: { id, editedNote } });
};

const deleteNote = (dispatch) => async (id) => {
  await jsonServer.delete(`/notes/${id}`);
  dispatch({ type: ActionTypes.DELETE_NOTE, payload: id });
};

const searchNotes = (dispatch) => (searchTerm) => {
  dispatch({ type: ActionTypes.SEARCH_NOTES, payload: searchTerm });
};

const reset = (dispatch) => async () => {
  dispatch({
    type: ActionTypes.RESET,
    payload: { isSearchActive: false, filteredNotes: [] },
  });
};

export const { Context, Provider } = createDataContext(
  noteReducer,
  { getAllNotes, addNote, editNote, deleteNote, searchNotes, reset },
  { notes: [], isSearchActive: false, filteredNotes: [] }
);
