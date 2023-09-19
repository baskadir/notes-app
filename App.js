import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./src/navigations/AppStackNavigator";
import { Provider } from "./src/context/NoteContext";

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <AppStackNavigator />
      </Provider>
    </NavigationContainer>
  );
}
