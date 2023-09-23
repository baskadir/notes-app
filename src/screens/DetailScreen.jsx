import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context as NoteContext } from "../context/NoteContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailScreen = ({ route, navigation }) => {
  const { id, color } = route.params;
  const {
    state: { notes },
  } = useContext(NoteContext);

  const note = notes.find((n) => n.id === id);

  return (
    <View style={styles.container}>
      <View style={[styles.noteArea, { backgroundColor: color }]}>
        <View style={styles.header}>
          <Text style={styles.date}>{note.date}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: id})}>
            <MaterialCommunityIcons name="note-edit-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.content}>{note.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noteArea: {
    margin: 20,
    paddingBottom: 30,
    borderRadius: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 12,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  title: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
  },
  content: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    textAlign: "justify",
    fontSize: 16,
    minHeight: 250,
  },
  date: {
    color: "#777",
    fontStyle: "italic",
  },
});
