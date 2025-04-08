import React, {useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Intersts({navigation, route}) {
  const interstsList = ['All', 'Art', 'Sport', 'History', 'Health'];
  const {country, city, days} = route.params;

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
        source={require('./assets/headerbgleft.png')}
        style={{width: 195, height: 110, resizeMode: 'contain', margin: 0}}
      />

      <Text
        style={{
          fontSize: 24,
          margin: 15,
          marginHorizontal: 26,
          color: '#000',
          textAlign: 'center',
        }}>
        What is your interests?
      </Text>

      {interstsList &&
        interstsList.map(item => (
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
              navigation.navigate('PlanDetails', {
                country: country,
                city: city,
                interest: item,
                days: days,
              });
            }}
            key={item}>
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}

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
