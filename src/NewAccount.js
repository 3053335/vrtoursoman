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

export default function NewAccount({navigation}) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');
  const [repeatPass, setRepeatPAss] = useState('');
  const [msg, setMsg] = useState(null);

  const handleNewAccount = () => {
    setMsg('');
    if (
      name == '' &&
      mobile == '' &&
      email == '' &&
      password == '' &&
      repeatPass == ''
    ) {
      setMsg('Please enter all the required fields.');

      return false;
    }

    if (mobile.length < 7) {
      setMsg('Please enter a valid mobile number.');

      return false;
    }

    if (password != repeatPass) {
      setMsg('Passwords are not matched.');

      return false;
    }

    supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response);

        supabase
          .from('users')
          .insert([
            {
              name: name,
              mobile: mobile,
              email: email,
              userType: 'user',
              user_id: response.data.user.id,
            },
          ])
          .then(({data}) => {
            navigation.navigate('Plans');
          })
          .catch(err => {
            console.log(err);

            setMsg('Sorry something went wrong.');
          });
      })
      .catch(error => {
        console.log(error);

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
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPAssword}
        />
        <Text style={styles.label}>Repeat Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Repeat your Password"
          value={repeatPass}
          onChangeText={setRepeatPAss}
        />

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleNewAccount}>
          <Text
            style={{
              color: '#000',
              textAlign: 'cover',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Register
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
    color: '#fff',
    padding: 5,
  },
});
