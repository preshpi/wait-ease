import React from "react";
import Onboarding from "./Screens/Onboarding";
import "../global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
const Stack = createStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      const appData = await AsyncStorage.getItem("isFirstLaunch");
      if (appData === null) {
        setIsFirstLaunch(true);
        AsyncStorage.setItem("isFirstLaunch", "false");
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);
  return (
    isFirstLaunch !== null && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch && (
          <Stack.Screen name="OnboardingScreen" component={Onboarding} />
        )}
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
    )
  );
};

export default App;
