import { useContext } from 'react'
import NoteForm from '../components/NoteForm'
import { Context as NoteContext } from '../context/NoteContext';

const EditScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { state: { notes }, editNote } = useContext(NoteContext)

  const note = notes.find(n => n.id === id);

  return <NoteForm
    onSubmit={(title, content) => {
      editNote({ id, title, content, date: (new Date().toLocaleString()) }, () => navigation.pop())
    }}
    initialValues={{ title: note.title, content: note.content, date: note.date }}
  />
}

export default EditScreen;