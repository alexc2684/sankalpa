/* A React native app where you can upload a photo and post it with a button */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* A react component to upload a photo*/
import { CreatePost } from './components/CreatePost';
import { NativeBaseProvider, Box } from "native-base";

export default function App() { 
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <Box>suppp</Box>
      <Text style={styles.title}>Social Scheduler</Text>
      <Text style={styles.subtitle}>Upload a photo and post it with a button</Text>
      <CreatePost></CreatePost>
      <View style={styles.post}>
        <Text style={styles.postText}>Post</Text>
      </View>
      </View>
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
