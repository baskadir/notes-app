import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable } from "react-native";

const PURPLE = "#DBCDF0";
const GREEN = "#C9E4DE";
const ORANGE = "#F7D9C3";

const NoteItem = ({ item, index, onPress }) => {
  const navigation = useNavigation();

  const setColor = (index) => {
    return index % 3 === 0 ? ORANGE : (index - 1) % 3 === 0 ? GREEN : PURPLE
  }

  return (
    <Pressable
      style={[styles.container, {
        backgroundColor: setColor(index)
      }]}
      onPress={() => navigation.navigate("Detail", {id: item.id, color: setColor(index)})}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </Pressable>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C9E4DE",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
});
