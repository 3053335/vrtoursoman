import { VideoView } from 'react-native-360';

export default function FullScreenPanorama({ navigation, route }) {
    const { image } = route.params;

    return (<PanoramaView 
      style={{height:200,width:width}}
      image={{uri: `https://nulnvlkwtmuyujmtvsxg.supabase.co/storage/v1/object/public/images/${image}`}}
      displayMode={'embedded'}
      enableFullscreenButton
      enableCardboardButton
      enableTouchTracking
      hidesTransitionView
      enableInfoButton={false} 
      //imageUrl={`https://nulnvlkwtmuyujmtvsxg.supabase.co/storage/v1/object/public/images/${image}`}             
  />);
  };
  