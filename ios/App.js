/* A React native app where you can upload a photo and post it with a button */
import React, { Fragment, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

/* A react component to upload a photo*/
import * as ImagePicker from 'expo-image-picker';

const serverUri = `https://4d40-71-83-117-239.ngrok.io`;

function UploadPhoto() {
  const [media, setMedia] = useState()
  const [tempMedia, setTempMedia] = useState()

  let selectMedia = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let selectedMedia = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    console.log(selectedMedia);

    if (selectedMedia.cancelled === true) {
      return;
    }

    setMedia(selectedMedia);    
  };

  /* A function that calls a POST request sending media as an image */
  function uploadMedia() {
    console.log('Sending media to server...');
    const data = new FormData();
    data.append('media_data', {
      uri: media.uri,
      type: media.type,
      name: media.uri.split('/').pop(),
    });
    data.append('user_id', '2')
    console.log(`${serverUri}/media/`);
    let uploadMediaUri = `${serverUri}/media/`;
    fetch(uploadMediaUri, {
      method: 'POST',
      body: data,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log("HERE")
        return response.json()
      })
      .then((data) => {
        console.log('Success:', data);
        setTempMedia(data)
        console.log(tempMedia)
        alert("Uploaded!")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /* A function that calls a POST request sending media_data to share API */
  function shareMediaToInstagram() {
    console.log('Sharing to Instagram...');

    let body = {
      "img_uri": tempMedia.media_data,
      "user_id": tempMedia.user_id,
      "caption": 'This is a test caption',
    }

    

    fetch(`${serverUri}/share/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        alert("Posted to Instagram!")
        response.json()
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <View style={styles.container}>
      {media &&
        <Fragment>
          <Image source={{ uri: media.uri }} style={{ width: 380, height: 340 }}></Image>
          <Button
            title="Upload to Instagram"
            onPress={shareMediaToInstagram} />
        </Fragment>
      }
      <Text style={styles.title}>Upload a photo</Text>
      <StatusBar style="auto" />
      <Button
        onPress={selectMedia}
        title="Select Photo"
        color="#841584"
        accessibilityLabel="Select a photo"
      />
      <Button
        onPress={uploadMedia}
        title="Upload Photo"
        color="#841584"
        accessibilityLabel="Upload a photo"
      />
      
    </View>
    
  );
}

// VIEW FOR VIEWING PHOTO
// {media &&
//   <Fragment>
//     <Image source={{ uri: media.uri }} style={{ width: 380, height: 340 }}></Image>
//     <Button
//       title="Upload"
//       onPress={uploadMedia} />
//   </Fragment>
// }

/* A react component to upload a photo via post request */


export default function App() { 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Scheduler</Text>
      <Text style={styles.subtitle}>Upload a photo and post it with a button</Text>
      <View style={styles.upload}>
        <Text style={styles.uploadText}>Upload a photo</Text>
      </View>
      <UploadPhoto></UploadPhoto>
      <View style={styles.post}>
        <Text style={styles.postText}>Post</Text>
      </View>
    </View>
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
