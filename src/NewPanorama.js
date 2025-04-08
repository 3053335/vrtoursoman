import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';
import {launchImageLibrary} from 'react-native-image-picker';

export default function NewPanorama({navigation}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [msg, setMsg] = useState(null);

  const handleNewPanorama = () => {
    setMsg('');
    if (title == '' && description == '') {
      setMsg('Please enter all the required fields.');

      return false;
    }

    supabase
      .from('panorama')
      .insert([
        {
          title: title,
          description: description,
          image: image,
        },
      ])
      .then(({data}) => {
        navigation.navigate('Panorama');
      })
      .catch(err => {
        setMsg('Sorry something went wrong.');
      });
  };

  const selectPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      console.log(response);
      
      if (response.assets && response.assets.length > 0) {
        console.log(response.assets);
        const uri = response.assets[0].uri;

        const res = await fetch(uri);
        const blob = await res.blob();
        const extension = uri.split('.').pop();
        const fileName = Date.now() + '.' + extension;

        setImage(fileName);

        const formData = new FormData();

        formData.append('file', {
          name: fileName,
          type: 'image/' + extension,
          uri: uri,
        });

        supabase.storage
          .from('images')
          .upload(`${fileName}`, formData)
          .then(data => {
            console.log(data);
            
            setMsg('Photo has been uploaded successfully..');
          })
          .catch(error => {
            console.log(error);
            
            setMsg('Error while uploading photo...');
          });
      }
    });
  };

  return (
    <ScrollView
      style={{
        padding: 0,
        margin: 0,
        position: 'relative',
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
      }}>
      <Image
        source={require('./assets/headerbgtop.png')}
        style={{
          width: '100%',
          height: 145,
          resizeMode: 'cover',
          position: 'absolute',
          zIndex: -100,
        }}
      />
      <Image
        source={require('./assets/logo.png')}
        style={{
          width: 145,
          height: 145,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />

      <View style={{alignSelf: 'center', width: '75%'}}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Panorama Title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Panorama Description"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={selectPhoto}>
          <Text style={{color: '#000000'}}>Select a 360 Panorama File</Text>
        </TouchableOpacity>

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleNewPanorama}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// external style
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#00b0bb',
    padding: 15,
    borderRadius: 15,
    margin: 3,
    width: '100%',
    color: '#000000'
  },
  label: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    width: '65%',
    backgroundColor: '#00b0bb',
    padding: 5,
    borderRadius: 15,
    margin: 5,
    marginTop: 35,
    marginBottom: 45,
    alignSelf: 'center',
  },
  errorMsg: {
    color: '#000',
    padding: 5,
  },
});
