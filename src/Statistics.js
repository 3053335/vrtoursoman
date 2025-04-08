import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from './supabase';

export default function Statistics({navigation, route}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {adminUser} = route.params;

  useEffect(() => {
    supabase
      .from('statistics')
      .select('*')
      .order('id',  { ascending: false })
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch(err => {
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
        Statistics
      </Text>

      {!loading && data && data.length == 0 && (
        <View>
          <Text style={{color: '#000', textAlign: 'center'}}>
            No Statistics Found...
          </Text>
        </View>
      )}
      {!loading && data && (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#00b0bb',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                {item.name}
              </Text>
              <Text style={{color: '#000', padding: 3}}>
                {item.statistic_value}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => 'item' + item.id}
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
          {adminUser && <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 15,
            }}
            onPress={() => {
              navigation.navigate('New Statistic');
            }}>
            <Image
              source={require('./assets/plusicon.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>}
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
            resizeMode: 'cover',
            position: 'absolute',
            zIndex: -100,
            bottom: 0,
          }}
        />
      </View>
    </View>
  );
}
