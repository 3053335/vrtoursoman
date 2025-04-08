import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from './supabase';

export default function Panorama({navigation, route}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase
      .from('panorama')
      .select('*')
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data);
        }
      })
      .catch(err => {
        console.log(err);
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
        360° Panorama
      </Text>

      {data && (
        <FlatList
          data={data}
          renderItem={({item}) => (
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
                navigation.navigate('View Panorama', {
                  image: item.image,
                });
              }}>
              <Text
                style={{
                  color: '#000000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  textAlign: 'center',
                }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => 'item-' + item.id}
          contentContainerStyle={{paddingBottom: 155}}
        />
      )}

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
