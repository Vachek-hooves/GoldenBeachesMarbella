import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import AddBeach from '../components/ui/IconBtn/AddBeach';
import BeachCard from '../components/actions/BeachCard';
import MainLayout from '../components/Layout/MainLayout';
import ImagedLayout from '../components/Layout/ImagedLayout';

const Main = () => {
  const {beaches, theme} = useStoreProvider();
  const [activeTab, setActiveTab] = useState('General');

  return (
    <ImagedLayout>
      {/* <MainLayout> */}
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>
          Marbella Beaches
        </Text>
        <TouchableOpacity>
          {/* <Ionicons name="heart-outline" size={24} color="#FFD700" /> */}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.beachList}>
        <View style={styles.beachGrid}>
          {beaches.map((beach, index) => (
            <BeachCard key={index} beach={beach} />
          ))}
        </View>
      </ScrollView>
      <AddBeach />
      {/* </SafeAreaView> */}
      {/* </MainLayout> */}
    </ImagedLayout>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
  },
  activeTabText: {
    color: 'black',
  },
  beachList: {
    flex: 1,
  },
  beachGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
