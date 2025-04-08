import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function Details({navigation, route}) {
  const {plan} = route.params;

  const handleDelete = () => {
    Alert.alert('Delete Plan', 'Are you sure you want to delete this plan?', [
      {
        text: 'No',
        //onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          supabase
            .from('plans')
            .delete()
            .eq('id', plan.id)
            .then(data => {
              navigation.navigate('My Plans');
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };

  const createPDF = async () => {
    if (plan) {
      let content = `<div style="padding: 15px;"><h1>TOUR GUIDE</h1><h2>Plan for ${plan.country}, ${plan.city}</h2><p>Itinerary for ${plan.days} Days'</p>`;
      let list =
        '<table><th><td>Day</td><td>Theme</td><td>Description</td></th>';
      try {
        const planData = JSON.parse(plan.plan);
        planData.map(item => {
          list += `<tr><td>${item.day}</td><td>${item.theme}</td><td>${item.description}</td></tr>`;
        });
        list += '</table></div>';
        content += list;

        try {
          let PDFOptions = {
            html: content,
            fileName: 'plan to visit ' + plan.country + ' ' + plan.city,
            //directory: 'Download',
            directory: '../../../../Download',
          };
          let file = await RNHTMLtoPDF.convert(PDFOptions);
          if (!file.filePath) {
          } else {
            ToastAndroid.show(
              'File downloaded successfully.',
              ToastAndroid.SHORT,
            );
          }
        } catch (error) {
          console.log('Failed to generate pdf', error.message);
        }
      } catch (error) {
        ToastAndroid.show(
          'Error while trying to save PDF file, try again.',
          ToastAndroid.SHORT,
        );
      }
    }
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
          fontSize: 23,
          margin: 15,
          marginHorizontal: 25,
          color: '#000',
          fontStyle: 'italic',
          textTransform: 'capitalize',
        }}>
        Plan for {plan && plan.country}, {plan && plan.city}
      </Text>
      <Text
        style={{
          fontSize: 18,
          margin: 15,
          marginHorizontal: 25,
          color: '#000',
          fontStyle: 'italic',
          textTransform: 'capitalize',
        }}>
        Interest in {plan && plan.interest}{' '}
        {plan && plan.days && 'for' + plan.days + ' Days'}
      </Text>

      {plan.plan && (
        <FlatList
          data={JSON.parse(plan.plan)}
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
            </View>
          )}
          keyExtractor={(item, index) => 'day' + item.day}
          contentContainerStyle={{paddingBottom: 155}}
        />
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
              margin: 5,
              //marginRight: 100
            }}
            onPress={handleDelete}>
            <Image
              source={require('./assets/deleteicon.png')}
              style={{width: 25, height: 25, resizeMode: 'contain', }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 5,
            }}
            onPress={() => navigation.navigate("Edit Plan", { plan: plan })}
          >
            <Image
              source={require('./assets/editicon.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#078184',
              padding: 15,
              borderRadius: 100,
              margin: 5,
            }}
            onPress={createPDF}>
            <Image
              source={require('./assets/saveion.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
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
              style={{width: 25, height: 25, resizeMode: 'contain'}}
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
