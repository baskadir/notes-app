import { StyleSheet, View } from "react-native";
import { useContext, useEffect, useRef } from "react";
import NoteItem from "../components/NoteItem";
import { Context as NoteContext } from "../context/NoteContext";
import { SwipeListView } from "react-native-swipe-list-view";
import NoteListHeader from "../components/NoteListHeader";
import NoteListSwipeButton from "../components/NoteListSwipeButton";

const HomeScreen = ({ navigation }) => {
  const {
    state: { notes, isSearchActive, filteredNotes },
    getAllNotes,
    reset,
  } = useContext(NoteContext);

  const searchInputRef = useRef();

  const resetNotesList = () => {
    getAllNotes();
    reset();
    searchInputRef.current.clear();
  };

  useEffect(() => {
    getAllNotes();

    const unsubscribe = navigation.addListener("focus", resetNotesList);

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <NoteItem item={item} index={index} />
  );

  const renderHiddenItem = ({ item }) => (
    <NoteListSwipeButton itemId={item.id} resetNotesList={resetNotesList} />
  );

  const data = isSearchActive ? filteredNotes : notes;

  return (
    <View style={styles.container}>
      <NoteListHeader
        dataLength={data.length}
        searchInputRef={searchInputRef}
      />
      <SwipeListView
        data={data}
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
