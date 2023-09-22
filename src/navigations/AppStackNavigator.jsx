import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CreateScreen from "../screens/CreateScreen";
import EditScreen from "../screens/EditScreen";
import DetailScreen from "../screens/DetailScreen";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitle: 'Your Notes' }} >
      <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity style={{marginRight: 12}} onPress={() => navigation.navigate("Create")}>
            <Entypo name="plus" size={36} color="#000" />
          </TouchableOpacity>
        )
      })} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
