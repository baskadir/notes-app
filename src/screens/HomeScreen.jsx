import { StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import NoteItem from "../components/NoteItem";
import { Context as NoteContext } from "../context/NoteContext";
import { SwipeListView } from "react-native-swipe-list-view";
import NoteListSwipeButton from "../components/NoteListSwipeButton";

const HomeScreen = ({ navigation }) => {
  const {
    state: { notes, isSearchActive, filteredNotes },
    getAllNotes,
    reset,
  } = useContext(NoteContext);

  const resetNotesList = () => {
    getAllNotes();
    reset();
  };

  useEffect(() => {
    getAllNotes();

    const unsubscribe = navigation.addListener("focus", resetNotesList);

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <NoteItem
      item={item}
      index={index}
    />
  );

  const renderHiddenItem = ({ item }) => (
    <NoteListSwipeButton itemId={item.id} resetNotesList={resetNotesList} />
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe={true}
        previewRowKey={"0"}
        previewFirstRow
        previewOpenValue={40}
        previewOpenDelay={100}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
});
