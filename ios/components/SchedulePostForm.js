/* A component that uploads a photo and schedules a post to Instagram via API*/
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { PostDateTimePicker } from './PostDateTimePicker';

const serverUri = `https://9478-71-83-117-239.ngrok.io`;

export const SchedulePostForm = (props) => {
  const [date, setDate] = useState(new Date());
  
  let handleDateChange = (selectedDate) => {
    setDate(selectedDate);

  }

  return (
  <Formik
     initialValues={{ caption: '', location: '', isInstagramPost: true, scheduledPostDateTime: date }}
      onSubmit={values => {
        console.log(values);
        createPost('1', values.caption, values.location, values.isInstagramPost, date, props.mediaUri);
     }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
          onChangeText={handleChange('caption')}
          onBlur={handleBlur('caption')}
          value={values.caption}
          placeholder={'Caption goes here...'}
          />
          <TextInput
          onChangeText={handleChange('location')}
          onBlur={handleBlur('location')}
          value={values.location}
          placeholder={'Location'}
          />
          <PostDateTimePicker date={date} handleDateChange={handleDateChange}></PostDateTimePicker>
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
      </Formik>
  )
}

/* A function that calls a POST request creating a Post object on the API server */
function createPost(userId, caption, location, isInstagramPost, scheduledPostDateTime, media) {
  console.log('Creating post...');
  let body = {
    user_id: userId,
    caption: caption,
    location: location,
    is_posted: false,
    is_instagram_post: isInstagramPost,
    post_date_time: scheduledPostDateTime,
    media: media,
  }

  console.log('-----------------');
  console.log(body);

  fetch(`${serverUri}/post/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);
      // return response.json()
      console.log(response.json())
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
