import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AppStackNavigator from "./src/navigations/AppStackNavigator";
import { Provider as NoteProvider } from "./src/context/NoteContext";
import { useColorScheme } from "react-native";

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NoteProvider>
        <AppStackNavigator />
      </NoteProvider>
    </NavigationContainer>
  );
}
