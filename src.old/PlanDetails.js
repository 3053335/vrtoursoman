import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function PlanDetails({navigation, route}) {
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const {country, city, interest, days} = route.params;

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        if (session && session.user) {
          setUser(session.user.identities[0].id);
        }
      })
      .catch(err => {
        console.log(err);
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        setUser(session.user.identities[0].id);
      }
    });
  }, []);

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
                    'give me a plan to visit ' +
                    country +
                    ', ' +
                    city +
                    " I'm intersted in " +
                    interest +
                    ' for ' +
                    days +
                    ' days, give me the plan in JSON array format [{day, theme, description}]',
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
          let planData = JSON.parse(
            data.candidates[0]['content']['parts'][0]['text']
              .replace(/```json/g, '')
              .replace(/```/g, ''),
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

  const savePlan = () => {
    supabase
      .from('plans')
      .insert([
        {
          country: country,
          city: city,
          days: days,
          interest: interest,
          plan: JSON.stringify(planData),
          user: user,
        },
      ])
      .then(({data, error}) => {
        ToastAndroid.show('Plan saved successfully.', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('Sorry something went wrong...', ToastAndroid.SHORT);
      });
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
        source={require('./assets/headerbgleft.png')}
        style={{width: 195, height: 110, resizeMode: 'contain', margin: 0}}
      />

      <Text
        style={{
          fontSize: 20,
          margin: 15,
          marginHorizontal: 26,
          color: '#000',
          textTransform: 'capitalize',
          textAlign: 'center',
        }}>
        Plan for {country}, {city} Interest in {interest}{' '}
        {days && 'for' + days + ' Days'}
      </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 14,
            margin: 15,
            marginHorizontal: 26,
            color: '#ffffff',
          }}>
          Your Plan is ready
        </Text>
      </View>

      {planData && (
        <FlatList
          data={planData}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                {item.day}
              </Text>
              <Text style={{color: '#000', fontWeight: 'bold', padding: 3}}>
                {item.theme}
              </Text>
              <Text style={{color: '#000', padding: 3}}>
                {item.description}
              </Text>
              {/* {item.activities &&
                item.activities.map(activity => (
                  <Text style={{color: '#000'}}>{activity}</Text>
                ))} */}
            </View>
          )}
          keyExtractor={(item, index) => 'day' + item.day}
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
            onPress={savePlan}>
            <Image
              source={require('./assets/saveion.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
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
