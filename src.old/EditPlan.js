import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {supabase} from './supabase';

export default function EditPlan({navigation, route}) {
  const [data, setData] = useState(null);
  const {plan} = route.params;

  useEffect(() => {
    console.log(typeof plan.plan);

    if (plan && plan.plan) {
      try {
        let parsedPlan = JSON.parse(plan.plan);
        let tmpArr = parsedPlan.map(item => {
          return {
            key: item.day,
            ...item,
          };
        });
        setData(tmpArr);
      } catch (error) {
        //
      }
    }
  }, [plan]);

  const updatePlan = () => {
    supabase
      .from('plans')
      .update({
        plan: JSON.stringify(data),
      })
      .eq('id', plan.id)
      .then(res => {
        navigation.navigate('My Plans', {plan: data});
      })
      .catch(err => {
        console.log(err);
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
        Edit Tour Plan
      </Text>

      {data && (
        <DraggableFlatList
          data={data}
          onDragEnd={({data}) => {
            console.log(data);

            setData(data);
          }}
          keyExtractor={item => item.key}
          renderItem={({item, drag, isActive}) => (
            <ScaleDecorator>
              <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                style={{
                  backgroundColor: isActive ? '#00b0bb' : '#ffffff',
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#000'}}>{item.day}</Text>
                <Text style={{color: '#000'}}>{item.theme}</Text>
              </TouchableOpacity>
            </ScaleDecorator>
          )}
          contentContainerStyle={{paddingBottom: 155}}
        />
      )}

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 19,
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
              margin: 5,
              //marginRight: 100
            }}
            onPress={updatePlan}>
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
              margin: 5,
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
