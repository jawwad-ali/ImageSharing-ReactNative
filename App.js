import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker"
import * as Sharing from "expo-sharing"

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null)

  // func to choose an image from gallery
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required')
      // return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return
    }
    setSelectedImage({ localUri: pickerResult.uri })
  }

  // image sharing func
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('sharing not available on your platform ')
      // return
    }
    await Sharing.shareAsync(selectedImage.localUri)
  }


  // getting the selected images from gallery
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync}>
          <Text style={styles.shareButton}>Share the photo</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instruction}>To share an image with friend click the button below!</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 20
  },
  instruction: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain" 
  },
  shareButton:{
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'black',
    padding: 20,
    marginTop:20,
    borderRadius: 5,
  }

});