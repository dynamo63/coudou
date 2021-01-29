import React, { useState } from 'react';
import { Image, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BitlyClient } from 'bitly'; // pour l'API bitly
import * as Sharing from 'expo-sharing'; // Pour le sharing

// Importation des fonts
import { useFonts, Nunito_400Regular, Nunito_400Regular_Italic, Nunito_700Bold } from '@expo-google-fonts/nunito';

// Importation des icones
import { FaShareAlt, FaSmileWink } from 'react-icons/fa';

export default function App() {

  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const bitly = new BitlyClient('01b5cd2606dece875c4f5261e5c0e994bddbd260', {});

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold
  })

  const onShortURL = async () => {

    const result = await bitly.shorten(longURL);

    // console.log(result.link);
    setShortURL(result.link)

  }

  const onShareURL = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(shortURL);
  }

  // On charge d'abord les fonts 
  if (!fontsLoaded) {
    return <Text>Chargement des assets</Text>;
  } else {
    if (shortURL !== '') {
      return (
        <View style={styles.container}>
          <Image  source={ require('./assets/default.png') } style={styles.logo}  />
          <Text style={styles.description}>Partager ce lien a vos amis !</Text>
          <Text style={styles.lienGenere}>{shortURL}</Text>
          <TouchableOpacity style={styles.button} onPress={onShareURL}>
            <Text>Partager <FaShareAlt /> </Text>
          </TouchableOpacity> 
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
        <Image  source={ require('./assets/default.png') } style={styles.logo}  />
        <Text style={styles.description}>Coudou!! Coudoutons nos Urls ! <FaSmileWink /> </Text>
        <TextInput style={styles.input} placeholder="Entrer votre url" onChangeText={url => setLongURL(url)} />
        <TouchableOpacity style={styles.button} onPress={onShortURL}>
          <Text>Raccourcir l'url</Text>
        </TouchableOpacity> 
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFBFF'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  description:{
    fontFamily:'Nunito_400Regular',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input:{
    borderColor:'#000009',
    borderRadius: 7,
    borderWidth: 1,
    padding: 9,
    fontFamily:'Nunito_400Regular_Italic'
  },
  button: {
    backgroundColor:'#F8F32B',
    fontFamily: 'Nunito_700Bold',
    padding: 8,
    borderRadius: 6,
    marginTop: 10
  },
  lienGenere:{
    backgroundColor:'#f5f5f5',
    borderRadius: 8,
    padding: 9,
    fontFamily: 'Nunito_400Regular',
    fontSize: 18
  }
});
