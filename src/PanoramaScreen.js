import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import PanoramaImage from './PanoramaImage'; // Adjust the path as needed

export default function PanoramaScreen({navigation, route}) {
  const { image } = route.params;
  const [enableVR, setEnableVR] = useState("stereo");

  return (
    <View style={{ flex: 1 }}>
      <PanoramaImage 
        style={{ height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}
        imageWidth={Dimensions.get('screen').width}
        imageHeight={Dimensions.get('screen').height}
        source={{ uri: "https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg" }} // Image URI
        //imageUrl={image}
      />
    </View>
  );
}
