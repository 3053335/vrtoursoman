import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function QuickSearch({navigation}) {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

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
          fontSize: 26,
          margin: 25,
          color: '#000000',
          textAlign: 'center',
        }}>
        Quick Search
      </Text>
      <Text
        style={{
          fontSize: 22,
          margin: 15,
          marginHorizontal: 26,
          color: '#000000',
          textAlign: 'center',
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
              padding: 7,
              textAlign: 'center',
            }}
            placeholder="Country"
            onChangeText={setCountry}
            value={country}
          />
        </View>
        <View style={{width: '35%'}}>
          <TextInput
            style={{
              fontSize: 18,
              color: '#000',
              backgroundColor: '#00b0bb',
              width: '100%',
              borderRadius: 10,
              margin: 5,
              padding: 7,
              textAlign: 'center',
            }}
            placeholder="City"
            onChangeText={setCity}
            value={city}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#00b0bb',
          width: '45%',
          borderRadius: 10,
          margin: 5,
          padding: 15,
          alignSelf: 'center',
          marginTop: 45,
        }}
        onPress={() => {
          navigation.navigate('Search Results', {country: country, city: city});
        }}>
        <Text style={{color: '#000', textAlign: 'center', fontWeight: 'bold'}}>
          Search
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
          resizeMode: 'contain',
          position: 'absolute',
          zIndex: -100,
          bottom: 0,
        }}
      />
    </View>
  );
}
