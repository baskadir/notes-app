import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Context as NoteContext } from "../context/NoteContext";

const NoteListSwipeButton = ({ itemId, resetNotesList }) => {
  const {deleteNote} = useContext(NoteContext);

  const deleteNoteById = (id) => {
    Alert.alert("Confirm!", "Are you sure?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteNote(id);
          resetNotesList();
        },
      },
    ]);
  };

  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNoteById(itemId)}
      >
        <Octicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NoteListSwipeButton;

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    maxHeight: 80,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    marginVertical: 7,
    backgroundColor: "#5C5F62",
  },
  deleteButton: {
    height: "100%",
    width: 75,
    borderRadius: 25,
    backgroundColor: "#5C5F62",
    position: "absolute",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
});
