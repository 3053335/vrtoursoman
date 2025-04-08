import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default function PlanChoice({navigation}) {
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

      <Text
        style={{
          fontSize: 25,
          margin: 25,
          color: '#000000',
          textAlign: 'center',
        }}>
        Tour Plan
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#00b0bb',
          padding: 15,
          paddingLeft: 25,
          paddingRight: 25,
          borderRadius: 15,
          width: '60%',
          alignSelf: 'center',
          marginTop: 15,
          paddingVertical: 20,
        }}
        onPress={() => {
          navigation.navigate('Full Plan', {
            choice: 'ai',
          });
        }}>
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          AI
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#00b0bb',
          padding: 15,
          paddingLeft: 25,
          paddingRight: 25,
          borderRadius: 15,
          width: '60%',
          alignSelf: 'center',
          marginTop: 15,
          paddingVertical: 20,
        }}
        onPress={() => {
          navigation.navigate('Full Plan', {
            choice: 'specific',
          });
        }}>
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Specific
        </Text>
      </TouchableOpacity>

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
