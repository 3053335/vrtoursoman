import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function MyProfile({navigation, route}) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        if (session && session.user) {
          setUser(session.user.identities[0].id);
          supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.identities[0].id)
            .then(response => {
              if (
                !response.error &&
                response.data &&
                response.data.length != 0
              ) {
                setName(response.data[0].name);
                setMobile(response.data[0].mobile);
                setEmail(response.data[0].email);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });

    supabase.auth.onAuthStateChange((_event, session) => {});
  }, []);

  const updateUser = () => {
    supabase
      .from('users')
      .update({
        name: name,
        mobile: mobile,
      })
      .eq('user_id', user)
      .then(async (data) => {
        if(password != ''){
          await supabase.auth.updateUser({ password: password });
        }
        navigation.navigate('Plans');
      })
      .catch(err => {
        setMsg('Sorry something went wrong.');
      });
  };

  return (
    <View
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

      <Text style={{fontSize: 25, margin: 5, color: '#000000', textAlign: 'center'}}>
        My Profile
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
        <Text style={styles.input}>{email}</Text>
        <Text style={styles.label}>Password</Text>
        <Text style={{ fontSize: 12, color: '#111', padding: 3 }}>Leave empty if you don't want to update your password.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {msg && <Text style={styles.errorMsg}>{msg}</Text>}

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btn} onPress={updateUser}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#078184',
          padding: 15,
          borderRadius: 100,
          margin: 15,
          position: 'absolute',
          right: 5,
          bottom: 5,
        }}
        onPress={() => {
          navigation.navigate('Plans');
        }}>
        <Image
          source={require('./assets/homeicon.png')}
          style={{width: 30, height: 30, resizeMode: 'contain'}}
        />
      </TouchableOpacity>

      <Image
        source={require('./assets/footerbg.png')}
        style={{
          width: '100%',
          height: 135,
          resizeMode: 'cover',
          position: 'absolute',
          zIndex: -100,
          bottom: 0,
        }}
      />
    </View>
  );
}

// external style
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#00b0bb',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    width: '100%',
  },
  label: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
  btn: {
    backgroundColor: '#00b0bb',
    padding: 8,
    borderRadius: 15,
    margin: 5,
    width: '45%',
  },
  errorMsg: {
    color: '#fff',
    padding: 5,
  },
});
