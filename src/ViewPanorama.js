import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, Image, PanResponder } from 'react-native';
import { gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

// Get screen dimensions
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Image width for full 360-degree effect (5 times the screen width for full panoramic effect)
const imageWidth = deviceWidth * 5; // Increased width for a 360-degree effect
const zoomFactor = 0.6; // Slight zoom factor for the image
const ipdOffset = 50; // Adjust IPD (Interpupillary Distance) - increase/decrease to simulate eye separation
const distortionStrength = 0.2; // Strength of the VR lens distortion effect

export default function ViewPanorama({ route }) {
  const [movementX, setMovementX] = useState(0); // X-axis movement for left-right (rotation)
  const movementAnim = useRef(new Animated.Value(0)).current; // Both eye movement (same for both eyes)
  const { image } = route.params;

  // Set up gyroscope listener
  useEffect(() => {
    if (gyroscope !== undefined) {
      setUpdateIntervalForType(SensorTypes.gyroscope, 100); // Set gyroscope update interval
      const gyroscopeSubscription = gyroscope.subscribe(({ x }) => {
        // Update position based on X-axis (left-right movement)
        updatePanoramaPosition(x);
      });

      return () => {
        gyroscopeSubscription.unsubscribe(); // Clean up on unmount
      };
    } else {
      console.error('Gyroscope is not available');
    }
  }, [movementX]);

  // Function to update the movement position based on X-axis
  const updatePanoramaPosition = (x) => {
    const newMovementX = movementX + (x * 30);  // Adjust multiplier for faster/slower movement if needed

    // Ensure the image moves smoothly and wraps around for 360-degree effect
    if (newMovementX > imageWidth / 2) {
      setMovementX(-imageWidth / 2); // Wraparound to the start (loop)
    } else if (newMovementX < -imageWidth / 2) {
      setMovementX(imageWidth / 2); // Wraparound to the end (loop)
    } else {
      setMovementX(newMovementX);
    }

    // Animate both images (same movement for both left and right eyes)
    Animated.spring(movementAnim, {
      toValue: newMovementX,
      useNativeDriver: true,
    }).start();
  };

  // Create a pan responder for touch dragging
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true, // Enable pan responder for touch
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState; // dx is the horizontal drag

        // Scale the drag to move across the full 360-degree range (multiply by a factor for the full loop effect)
        const scaledMovementX = movementX + dx * 0.5; // Scaling factor for horizontal movement (adjust as needed)

        // Ensure the images wrap around horizontally for 360-degree effect
        if (scaledMovementX > imageWidth / 2) {
          setMovementX(-imageWidth / 2); // Wraparound to the start (loop)
        } else if (scaledMovementX < -imageWidth / 2) {
          setMovementX(imageWidth / 2); // Wraparound to the end (loop)
        } else {
          setMovementX(scaledMovementX);
        }

        // Update the animated position for both images (left and right eye will move together)
        Animated.spring(movementAnim, {
          toValue: scaledMovementX,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderRelease: () => {
        // Optional: You can add logic to snap the image back to center if needed
      },
    })
  ).current;

  // Apply VR Distortion Effect
  const applyVRDistortion = (xMovement) => {
    // Apply barrel distortion effect using a simple mathematical formula
    const distortion = Math.pow(xMovement / imageWidth, 2) * distortionStrength; // Apply distortion formula

    // Use the distortion to adjust the movement of both images, for a more VR lens-like effect
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
                { translateX: movementAnim }, // Apply animated movement for both left and right eyes
                { scale: zoomFactor }, // Apply zoom factor
                { translateX: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: [-ipdOffset, ipdOffset],
                  })
                }, // Apply IPD adjustment for horizontal spacing between eyes
                { perspective: 1000 }, // Apply perspective for VR effect
                {
                  rotateY: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: ['-20deg', '20deg'],
                  }), // Apply rotation to simulate the VR distortion
                },
              ],
            },
          ]}
          {...panResponder.panHandlers} // Attach pan responder to enable dragging
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
                { translateX: movementAnim }, // Same movement as left eye
                { scale: zoomFactor }, // Apply zoom factor
                { translateX: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: [ipdOffset, -ipdOffset],
                  })
                }, // Apply IPD adjustment for horizontal spacing between eyes
                { perspective: 1000 }, // Apply perspective for VR effect
                {
                  rotateY: movementAnim.interpolate({
                    inputRange: [-imageWidth / 2, imageWidth / 2],
                    outputRange: ['20deg', '-20deg'],
                  }), // Apply rotation to simulate the VR distortion
                },
              ],
            },
          ]}
          {...panResponder.panHandlers} // Attach pan responder to enable dragging
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',  // Place images side by side for stereo view
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  eyeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,  // Ensure each container takes full screen width
    height: deviceHeight,  // Ensure each container takes full screen height
    overflow: 'hidden',  // Prevent image from overflowing its container
  },
  image: {
    width: imageWidth,  // Image width should be the full panoramic width (5 times the device width)
    height: deviceHeight,  // Ensure image takes full screen height
    resizeMode: 'cover',  // Ensure the image covers the screen area
  },
});
