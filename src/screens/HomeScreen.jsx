import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>IndexScreen</Text>
      <Button title="Go to details" onPress={() => navigation.navigate('Detail')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
