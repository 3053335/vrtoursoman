import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FullPlan({ navigation, route }) {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [days, setDays] = useState('');
    const { choice } = route.params;

    const handleNext = () => {
      if(choice == 'ai'){
        if(country !== ''){
          navigation.navigate('Famous Places', {country: country});
        } else {
          ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        }
      } else {
        if(country != "" && city != "" && days != ""){
          navigation.navigate('Intersts', {country: country, city: city, days: days});
        } else {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        }
      }
    }

    return (
    <View
      style={{
        padding: 0,
        margin: 0,
        position: 'relative',
        backgroundColor: '#ffffff',
        width: "100%",
        height: '100%',
      }}>
        <Image source={require('./assets/headerbgtop.png')} style={{ width: '100%', height: 145, resizeMode: 'cover', position: 'absolute', zIndex: -100 }} />
        <Image source={require('./assets/logo.png')} style={{ width: 145, height: 145, resizeMode: 'contain', alignSelf: 'center', marginTop: 15 }} />

      <Text style={{fontSize: 25, margin: 25, color: '#000000', textAlign: 'center'}}>
        Tour Plan
      </Text>
      <Text
        style={{
          fontSize: 18,
          margin: 15,
          marginHorizontal: 26,
          color: '#000000',
          textAlign: 'center'
        }}>
        Where is your journey To?
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{width: '35%'}}>
          <TextInput
            style={{
              fontSize: 18,
              color: '#000',
              backgroundColor: '#00b0bb',
              width: '100%',
              borderRadius: 10,
              margin: 5,
              padding: 3,
              textAlign: 'center',
            }}
            placeholder='Country'
            onChangeText={setCountry}
            value={country}
          />
        </View>
        {choice == 'specific' &&<View style={{width: '35%'}}>
          <TextInput
            style={{
              fontSize: 18,
              color: '#000',
              backgroundColor: '#00b0bb',
              width: '100%',
              borderRadius: 10,
              margin: 5,
              padding: 3,
              textAlign: 'center',
            }}
            placeholder='City'
            onChangeText={setCity}
            value={city}
          />
        </View>}
      </View>
      {choice == 'specific' && <Text
        style={{
          fontSize: 18,
          margin: 15,
          marginHorizontal: 26,
          color: '#000000',
          textAlign: 'center'
        }}>
        How long is your journey?
      </Text>}

      {choice == 'specific' && <View style={{width: '35%', marginHorizontal: 25, alignSelf: 'center'}}>
          <TextInput
            style={{
              fontSize: 18,
              color: '#000',
              backgroundColor: '#00b0bb',
              width: '100%',
              borderRadius: 10,
              margin: 5,
              padding: 3,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            onChangeText={setDays}
            value={days}
            placeholder='Days'
          />
        </View>}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', alignSelf: 'center', }}>
      <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 7,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 15,
            margin: 15,
            width: '40%',
            alignSelf: 'center',
            marginVertical: 95
          }}
          onPress={handleNext}>
          <Text
            style={{color: '#000', textAlign: 'center', fontWeight: 'bold'}}>
            Display
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#00b0bb',
            padding: 7,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 15,
            margin: 15,
            width: '40%',
            alignSelf: 'center',
            marginVertical: 95
          }}
          onPress={() => navigation.goBack()}>
          <Text
            style={{color: '#000', textAlign: 'center', fontWeight: 'bold'}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
        

      <TouchableOpacity
        style={{
          backgroundColor: '#078184',
          padding: 15,
          borderRadius: 100,
          margin: 15,
          position: 'absolute',
          right: 5,
          bottom: 5
        }}
        onPress={() => {
          navigation.navigate('Plans');
        }}>
        <Image source={require('./assets/homeicon.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>

      <Image source={require('./assets/footerbg.png')} style={{ width: '100%', height: 135, resizeMode: 'cover', position: 'absolute', zIndex: -100, bottom: 0 }} />
    </View>
  );
}
