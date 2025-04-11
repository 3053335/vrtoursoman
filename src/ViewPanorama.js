import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, Image, PanResponder } from 'react-native';
import { gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const imageWidth = deviceWidth * 5; 
const zoomFactor = 0.6; 
const ipdOffset = 50; 
const distortionStrength = 0.2; 

export default function ViewPanorama({ route }) {
  const [movementX, setMovementX] = useState(0); 
  const movementAnim = useRef(new Animated.Value(0)).current; 
  const { image } = route.params;

  useEffect(() => {
    if (gyroscope !== undefined) {
      setUpdateIntervalForType(SensorTypes.gyroscope, 100); 
      const gyroscopeSubscription = gyroscope.subscribe(({ x }) => {
        // Update position based on left-right movement 
        updatePanoramaPosition(x);
      });

      return () => {
        gyroscopeSubscription.unsubscribe(); 
      };
    } else {
      console.error('Gyroscope is not available');
    }
  }, [movementX]);
  const updatePanoramaPosition = (x) => {
    const newMovementX = movementX + (x * 30); 


    if (newMovementX > imageWidth / 2) {
      setMovementX(-imageWidth / 2);
    } else if (newMovementX < -imageWidth / 2) {
      setMovementX(imageWidth / 2); 
    } else {
      setMovementX(newMovementX);
    }

    Animated.spring(movementAnim, {
      toValue: newMovementX,
      useNativeDriver: true,
    }).start();
  };

 
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true, 
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState; 

       
        const scaledMovementX = movementX + dx * 0.5; 

        
        if (scaledMovementX > imageWidth / 2) {
          setMovementX(-imageWidth / 2); 
        } else if (scaledMovementX < -imageWidth / 2) {
          setMovementX(imageWidth / 2); 
        } else {
          setMovementX(scaledMovementX);
        }

       
        Animated.spring(movementAnim, {
          toValue: scaledMovementX,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderRelease: () => {
      
      },
    })
  ).current;

  // Apply VR Distortion Effect
  const applyVRDistortion = (xMovement) => {
    
    const distortion = Math.pow(xMovement / imageWidth, 2) * distortionStrength; 

   
    return distortion;
  };

  return (
    <View style={styles.container}>
      {/* Left Eye Image - Moves within its container */}
      <View style={styles.eyeContainer}>
        <Animated.Image
          source={{ uri: `https://nulnvlkwtmuyujmtvsxg.supabase.co/storage/v1/object/public/images/${image}` }}
          style={[
            styles.image,
            {
              transform: [
                { translateX: movementAnim }, 
                { scale: zoomFactor },
                { translateX: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: [-ipdOffset, ipdOffset],
                  })
                }, 
                { perspective: 1000 },
                {
                  rotateY: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: ['-20deg', '20deg'],
                  }), 
                },
              ],
            },
          ]}
          {...panResponder.panHandlers} 
        />
      </View>

      {/* Right Eye Image - Same movement as left eye */}
      <View style={styles.eyeContainer}>
        <Animated.Image
          source={{ uri: `https://nulnvlkwtmuyujmtvsxg.supabase.co/storage/v1/object/public/images/${image}` }}
          style={[
            styles.image,
            {
              transform: [
                { translateX: movementAnim }, 
                { scale: zoomFactor }, 
                { translateX: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: [ipdOffset, -ipdOffset],
                  })
                }, 
                { perspective: 1000 }, 
                {
                  rotateY: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: ['20deg', '-20deg'],
                  }), 
                },
              ],
            },
          ]}
          {...panResponder.panHandlers} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  eyeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth, 
    height: deviceHeight,
    overflow: 'hidden',  
  },
  image: {
    width: imageWidth, 
    height: deviceHeight, 
    resizeMode: 'cover',  
  },
});
