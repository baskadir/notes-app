import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const NoteForm = ({ onSubmit, initialValues = { title: "", content: "" } }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const date = initialValues.date ?? (new Date()).toLocaleString();
  const titleInputRef = useRef();

  const clearAllInputs = () => {
    setTitle("");
    setContent("");
    titleInputRef.current.focus();
  };

  const saveNote = () => {
    if (title.trim().length > 0 && content.trim().length > 0) {
      Alert.alert("Confirm!", "Are you sure?", [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            onSubmit(title.trim(), content.trim());
          },
        },
      ]);
    } else {
        Alert.alert("You must write title and content.")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formArea}>
        <View style={styles.header}>
          <Text style={styles.date}>{`${date}${!initialValues.date ? ' - today' : ''}`}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={clearAllInputs}>
              <MaterialIcons
                style={{ paddingRight: 10 }}
                name="clear"
                size={28}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveNote}>
              <MaterialIcons name="check" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.inputTitle}
            placeholder="New Title"
            value={title}
            onChangeText={setTitle}
            maxLength={32}
            ref={titleInputRef}            
          />
          <TextInput
            style={styles.inputContent}
            placeholder="Write your note here..."
            numberOfLines={10}
            multiline
            maxLength={500}
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formArea: {
    backgroundColor: "#F0F0F0",
    margin: 20,
    paddingBottom: 30,
    borderRadius: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  icons: {
    flexDirection: "row",
  },
  inputs: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputTitle: {
    paddingVertical: 10,
    marginBottom: 4,
    paddingHorizontal: 4,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#777",
    borderBottomWidth: 1,
  },
  inputContent: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  date: {
    color: "#777",
    fontStyle: "italic",
  },
});
