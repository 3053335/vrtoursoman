import React, {useCallback, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from './supabase';
import {useFocusEffect} from '@react-navigation/native';

export default function MyPlan({navigation, route}) {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      supabase.auth
        .getSession()
        .then(({data: {session}}) => {
          if (session && session.user) {
            if (session && session.user) {
              supabase
                .from('plans')
                .select('*')
                .eq('user', session.user.identities[0].id)
                .then(response => {
                  if (
                    !response.error &&
                    response.data &&
                    response.data.length != 0
                  ) {
                    setPlans(response.data);
                    setLoading(false);
                  }
                })
                .catch(err => {
                  setLoading(false);
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, []),
  );

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
          fontSize: 25,
          margin: 25,
          color: '#000000',
          textAlign: 'center',
        }}>
        My Plans
      </Text>

      {!loading && plans && plans.length == 0 && (
        <View>
          <Text style={{color: '#000', textAlign: 'center'}}>
            No Plans Found, start a new plan
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: 15,
              paddingLeft: 25,
              paddingRight: 25,
              borderRadius: 15,
              width: '40%',
              marginLeft: 25,
              marginTop: 35,
              alignSelf: 'center',
            }}
            onPress={() => {
              navigation.navigate('Full Plan');
            }}>
            <Text
              style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
              NEW PLAN
            </Text>
          </TouchableOpacity>
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
