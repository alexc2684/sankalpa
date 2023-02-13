import React, { Fragment, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

/* A react component to upload a photo*/
import * as ImagePicker from 'expo-image-picker';
import { SchedulePostForm } from './SchedulePostForm';
import { Modal } from "native-base";

const serverUri = `https://9478-71-83-117-239.ngrok.io`;

export const CreatePost = () => {
  const [media, setMedia] = useState()
  const [uploadedMedia, setUploadedMedia] = useState()
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
    await uploadMedia();
  };

  /* A function that calls a POST request sending media as an image */
  let uploadMedia = async () => {
    console.log('Sending media to server...');
    const data = new FormData();
    data.append('media_data', {
      uri: media.uri,
      type: media.type,
      name: media.uri.split('/').pop(),
    });
    data.append('user_id', '1')
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
        return response.json()
      })
      .then((data) => {
        console.log('Success:', data);
        setUploadedMedia(data)
        console.log(uploadedMedia)
        alert("Uploaded!")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <View style={styles.container}>
      {
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
          _dark: {
            bg: "coolGray.800"
          },
          bg: "coolGray.800"
        }}>
        <Modal.Content maxWidth="400" maxH="800">
          <Modal.Body>
            <Fragment>
              <Image source={{ uri: media.uri }} defaultSource={{uri: 'https://static.vecteezy.com/system/resources/previews/008/158/082/non_2x/flat-design-illustration-of-cloud-data-upload-vector.jpg' }} style={{ width: 300, height: 200 }}></Image>
              <SchedulePostForm mediaUri={serverUri.concat('/media/42/')}>
              </SchedulePostForm>
            </Fragment>
          </Modal.Body>
        </Modal.Content>
          </Modal>
      }
      <StatusBar style="auto" />
      <Button
        onPress={selectMedia}
        title="Upload Photo"
        color="#841584"
        accessibilityLabel="Select a photo"
      />
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

/* A function that calls a POST request sending media_data to share API */
function shareMediaToInstagram() {
  console.log('Sharing to Instagram...');

  let body = {
    "img_uri": uploadedMedia.media_data,
    "user_id": uploadedMedia.user_id,
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