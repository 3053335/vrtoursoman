import React from 'react';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {supabase} from './supabase';

export default function PlansScreen({navigation}) {
  const {width, height} = Dimensions.get('window');

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
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

  const handleSignOut = () => {
    Alert.alert('Hold on!', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          supabase.auth
            .signOut()
            .then(res => {
              navigation.navigate('Login');
            })
            .catch(err => {
              //
            });
        },
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        bottom: 0,
      }}>
      <Image
        source={require('./assets/headerlogoright.png')}
        style={{
          width: 220,
          height: 120,
          resizeMode: 'contain',
          margin: 0,
          right: 0,
          position: 'absolute',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 200,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 15,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 15,
            width: '45%',
            margin: 5,
            paddingVertical: 50,
          }}
          onPress={() => {
            navigation.navigate('Plan Choice');
          }}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
            TOUR PLAN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 15,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 15,
            width: '45%',
            margin: 5,
            paddingVertical: 50,
          }}
          onPress={() => {
            navigation.navigate('My Plans');
          }}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
            MY PLANS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 15,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 15,
            width: '45%',
            margin: 5,
            paddingVertical: 50,
          }}
          onPress={() => {
            navigation.navigate('Quick Search');
          }}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
            QUICK SEARCH
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 15,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 15,
            width: '45%',
            margin: 5,
            paddingVertical: 50,
          }}
          onPress={() => navigation.navigate('Panorama', {adminUser: false})}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
            360° Panorama
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 15,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 15,
            width: '45%',
            margin: 5,
            paddingVertical: 50,
          }}
          onPress={() => navigation.navigate('Statistic', { adminUser: false})}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          width: '100%',
          padding: 0,
          margin: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 5,
            bottom: 5,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 5,
            }}
            onPress={handleSignOut}>
            <Image
              source={require('./assets/logout.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 5,
            }}
            onPress={() => {
              navigation.navigate('Feedback');
            }}>
            <Image
              source={require('./assets/feedbackicon.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 5,
            }}
            onPress={() => {
              navigation.navigate('My Profile');
            }}>
            <Image
              source={require('./assets/usericon.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>

        <Image
          source={require('./assets/footerbg.png')}
          style={{
            width: '100%',
            height: 135,
            resizeMode: 'cover',
            position: 'absolute',
            zIndex: -100,
            bottom: 0,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
}
