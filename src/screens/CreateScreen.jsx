import { useContext } from "react";
import NoteForm from "../components/NoteForm";
import { Context as NoteContext } from "../context/NoteContext";

const CreateScreen = ({navigation}) => {
  const { addNote } = useContext(NoteContext);

  return <NoteForm onSubmit={(title, content) => {
    addNote({title, content}, () => navigation.pop());
  }} />
};

export default CreateScreen;

