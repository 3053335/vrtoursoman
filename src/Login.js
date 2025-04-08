import {useState} from 'react';
import {
    Alert,
    BackHandler,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleLogin = async () => {
    setMsg('');
    if (email == '' && password == '') {
      setMsg('Please enter all the required fields.');

      return false;
    }

    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMsg('Wrong email or password.');
    } else {
      navigation.navigate('Welcome');
    }
  };

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return (
    <ImageBackground
      source={require('./assets/homebgimg.jpeg')}
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          alignSelf: 'center',
          width: '60%',
          marginTop: 45,
        }}>
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

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => navigation.navigate('NewAccount')}>
          <Text style={{fontSize: 16, textAlign: 'center', color: '#fff'}}>
            Don't have an account?{' '}
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center', color: '#000'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// external style
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    width: '100%',
    color: '#000000'
  },
  label: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  btn: {
    width: '65%',
    backgroundColor: '#078184',
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
