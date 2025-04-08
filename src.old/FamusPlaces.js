import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function FamusPlaces({navigation, route}) {
  const {country, city, days} = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCtSX9d1zN81EwVGuSA3ouzdZgZ-YaG_vA',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    'give me list of 5 famus places in ' +
                    country +
                    ', ' +
                    city +
                    ', give me this in JSON array format [place_name] without discription',
                },
              ],
            },
          ],
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data.candidates[0]['content']['parts'][0]['text'].replace(/```json/g, '').replace(/```/g, ''));

        try {
          let tmpArr = JSON.parse(
            data.candidates[0]['content']['parts'][0]['text']
              .replace(/```json/g, '')
              .replace(/```/g, ''),
          );

          setData(tmpArr);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

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
        Famus places to visit in {country}, {city}
      </Text>

      {data &&
        data.map(item => (
          <TouchableOpacity
            style={{
              backgroundColor: '#00b0bb',
              padding: 15,
              paddingLeft: 25,
              paddingRight: 25,
              borderRadius: 15,
              width: '80%',
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
