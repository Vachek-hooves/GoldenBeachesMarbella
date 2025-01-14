import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Activities, Main, Reviews, Setting} from './screen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height:90,
          backgroundColor: '#151515',
          borderTopColor: '#333',
          paddingVertical: 8,
          paddingTop: 1,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="Beaches"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/icons/beach.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : 'white'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/icons/surfing.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : 'white'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/icons/reviews.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : 'white'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/icons/setting.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : 'white'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
