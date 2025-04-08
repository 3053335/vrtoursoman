import React, { useCallback } from 'react';
import {Image, View} from 'react-native';
import {supabase} from './supabase';
import { useFocusEffect } from '@react-navigation/native';

export default function Welcome({navigation}) {
  useFocusEffect(useCallback(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        if (session && session.user) {
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
                if(response.data[0].userType == 'user'){
                  navigation.navigate('Plans');
                } else {
                  navigation.navigate('Adminstrator');
                }
              } else {
                navigation.navigate('Login');
              }

          })
          .catch(err => {

          })
        } else {
          navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []));
  
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
      <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={require('./assets/logo.png')} />
    </View>
  );
}
