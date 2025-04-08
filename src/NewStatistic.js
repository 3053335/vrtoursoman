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

export default function NewStatistic({navigation}) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState(null);

  const handleNewStatistic = () => {
    setMsg('');
    if (name == '' && value == '') {
      setMsg('Please enter all the required fields.');

      return false;
    }

    supabase
      .from('statistics')
      .insert([
        {
          name: name,
          statistic_value: value,
        },
      ])
      .then(({data}) => {
        navigation.navigate('Statistic');
      })
      .catch(err => {
        setMsg('Sorry something went wrong.');
      });
  };
  //jsx
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
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Value</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Value"
          value={value}
          onChangeText={setValue}
        />

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleNewStatistic}>
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
