import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';

export default function ViewPanorama({navigation, route}) {
  const { image } = route.params;
  const htmlContent = `<!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://pchen66.github.io/js/three/three.min.js" ></script>
    <script src="https://pchen66.github.io/js/panolens/panolens.min.js"></script>
    <style>

      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000;
      }

      a:link, a:visited{
        color: #bdc3c7;
      }

      .credit{
        position: absolute;
        text-align: center;
        width: 100%;
        padding: 20px 0;
        color: #fff;
      }
    
    </style>
</head>

<body>
    <div id="msg"></div>
    <script>        
        const panorama = new PANOLENS.ImagePanorama( 'https://nulnvlkwtmuyujmtvsxg.supabase.co/storage/v1/object/public/images/${image}' );
        const viewer = new PANOLENS.Viewer( { output: 'console' } );
        viewer.add( panorama );
    </script>
</body>

</html>`;
  return (
    <View style={{flex: 1}}>
      <WebView
        javaScriptEnabled={true}
        originWhitelist={['*']}
        source={{html: htmlContent}}
        style={{flex: 1}}
        injectJavaScript={`
          alert('test');
        `}
        renderLoading={() => <Text>Loading...</Text>}
        startInLoadingState={true}
      />
    </View>
  );
}
