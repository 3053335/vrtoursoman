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

export default function FeedbackScreen({navigation}) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState(null);

  const saveFeedback = () => {
    setMsg('');
    if (
      name == '' &&
      mobile == '' &&
      email == '' &&
      message == ''
    ) {
      setMsg('Please enter all the required fields.');

      return false;
    }

    if (mobile.length < 7) {
      setMsg('Please enter a valid mobile number.');

      return false;
    }
    supabase
        .from('feedback')
        .insert([
        {
            name: name,
            mobile: mobile,
            email: email,
            message: message,
        },
        ])
        .then(({data}) => {
            navigation.navigate('Plans');
        })
        .catch(err => {
        console.log(err);

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
          resizeMode: 'contain',
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

      <Text
        style={{
          fontSize: 24,
          margin: 15,
          marginHorizontal: 26,
          color: '#000',
          textAlign: 'center',
        }}>
        Send us your feedback
      </Text>

      <View style={{alignSelf: 'center', width: '75%'}}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Mobile Number"
          value={mobile}
          onChangeText={setMobile}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your message content"
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={saveFeedback}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Submit
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
    color: '#fff',
    padding: 5,
  },
});
