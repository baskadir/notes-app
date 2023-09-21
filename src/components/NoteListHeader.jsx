import { StyleSheet, Text, View, TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Context as NoteContext } from "../context/NoteContext";

const NoteListHeader = ({ dataLength, searchInputRef }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchNotes } = useContext(NoteContext);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Octicons name="search" size={24} color="#40464f" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchTerm}
          onChangeText={(value) => {
            setSearchTerm(value);
            searchNotes(value.trim());
          }}
          ref={searchInputRef}
        />
      </View>
      <Text style={styles.text}>{dataLength} Notes</Text>
    </View>
  );
};

export default NoteListHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  searchContainer: {
    borderRadius: 25,
    backgroundColor: "#F0F0EF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 16,
  },
  input: {
    marginLeft: 14,
    fontSize: 16,
    flex: 1
  },
  text: {
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
});
