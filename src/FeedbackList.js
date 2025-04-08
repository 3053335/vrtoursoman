import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function FeedbackList({navigation, route}) {
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('feedback')
      .select('*')
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, [update]);

  const handleDelete = (item) => {
    Alert.alert('Confirm', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Okay',
        onPress: () => {
            supabase
              .from('feedback')
              .delete()
              .eq('id', item)
              .then(response => {
                setUpdate(Date.now());                
              })
              .catch(err => {
                console.log(err);
                
                });
        },
      },
    ]);
  };

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
        Feedback List
      </Text>

      {!loading && data && data.length == 0 && (
        <View>
          <Text style={{color: '#000', textAlign: 'center'}}>
            No users yet, try again later...
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
                flexDirection: 'row',
              }}>
              <View style={{width: '70%'}}>
                <Text style={{color: '#000', padding: 3}}>
                  Name: {item.name}
                </Text>
                <Text style={{color: '#000', padding: 3}}>
                  Mobile: {item.mobile}
                </Text>
                <Text style={{color: '#000', padding: 3}}>
                  Email: {item.email}
                </Text>
                <Text style={{color: '#000', padding: 3}}>
                  {item.message}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#078184',
                    padding: 15,
                  }}
                  onPress={() => handleDelete(item.id)}>
                  <Text>x Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => 'user' + item.id}
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
              navigation.navigate('Adminstrator');
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
