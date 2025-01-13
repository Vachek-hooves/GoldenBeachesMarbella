import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StoreProvider} from './store/context';
import {IntroScreen} from './screen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 500,
          }}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
