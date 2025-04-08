import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from './supabase';

export default function UsersPlans({navigation, route}) {
  const [plans, setPlans] = useState(null);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('plans')
      .select('*')
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          supabase
          .from('users')
          .select('*')
          .then(response => {
            if (!response.error && response.data && response.data.length != 0) {
              let tmpArr = {};
              response.data.map(item => {
                tmpArr[item.user_id] = item.name;
              })
              setUsers(tmpArr);
            }
          })
          .catch(err => {
            //
          });
          setPlans(response.data);
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
        Users Plans
      </Text>

      {!loading && plans && plans.length == 0 && (
        <View>
          <Text style={{color: '#000', textAlign: 'center'}}>
            No users plans found...
          </Text>
        </View>
      )}
      {!loading && plans && (
        <FlatList
          data={plans}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#00b0bb',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('Details', {plan: item});
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                User: {users && users[item.user]}
              </Text>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                {item.country}, {item.city}
              </Text>
              <Text style={{color: '#000', padding: 3}}>
                Interests: {item.interest}, for {item.days} days
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => 'day' + item.day}
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
