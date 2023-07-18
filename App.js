import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import SpaceCraft from './screens/SpaceCrafts';
import DailyPic from './screens/DailyPic';
import StarMap from './screens/StarMap';
import IssLocation from './screens/IssLocation';
import MeteorScreen from './screens/Meteors';

const Stack = createStackNavigator();

function App() {
  return (
    // Wrapping the app with NavigationContainer to enable navigation
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Space Craft Screen */}
        <Stack.Screen name="Space Craft" component={SpaceCraft} />

        {/* Star Map Screen */}
        <Stack.Screen name="Star Map" component={StarMap} />

        {/* Daily Picture Screen */}
        <Stack.Screen name="Daily Picture" component={DailyPic} />

        {/* ISS Location Screen */}
        <Stack.Screen name="IssLocation" component={IssLocation} />

        {/* Meteor Screen */}
        {/* <Stack.Screen name="Meteor" component={MeteorScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
