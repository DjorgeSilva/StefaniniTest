import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import BottomNavigationTab from "./navigation/BottomNavigation";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import configureStore from "./store/configureStore";

const Stack = createNativeStackNavigator();
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="BottomNavigationTab"
          >
            <Stack.Screen
              name="BottomNavigationTab"
              component={BottomNavigationTab}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
