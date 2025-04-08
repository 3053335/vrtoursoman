import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SearchResults({navigation, route}) {
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {country, city} = route.params;

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
                    'I plan to visit ' +
                    country +
                    ', ' +
                    city +
                    ' give famus places to visit, restults should be in JSON format [{name, description, type}] without ```json',
                },
              ],
            },
          ],
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data.candidates[0]['content']['parts'][0]['text']);

        try {
          let planData = JSON.parse(
            data.candidates[0]['content']['parts'][0]['text'],
          );

          setPlanData(planData);
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

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 24,
            margin: 15,
            marginHorizontal: 26,
            color: '#000000',
            textAlign: 'center'
          }}>
          Intersting places to visit in {country}, {city}
        </Text>
      </View>

      {planData && (
        <FlatList
          data={planData}
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                {item.name}
              </Text>
              <Text style={{color: '#000', padding: 3}}>{item.type}</Text>
              <Text style={{color: '#000', padding: 3}}>
                {item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => 'place-' + index}
          contentContainerStyle={{paddingBottom: 155}}
        />
      )}

      {loading && (
        <Text
          style={{
            fontSize: 14,
            margin: 15,
            marginHorizontal: 26,
            color: '#ffffff',
            textAlign: 'center',
          }}>
          Perpearing your plan...
        </Text>
      )}

      <View
        style={{
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
              margin: 15,
            }}
            onPress={() => {
              navigation.navigate('Plans');
            }}>
            <Image
              source={require('./assets/homeicon.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
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
    </View>
  );
}
