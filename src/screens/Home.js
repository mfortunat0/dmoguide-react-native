import React, {useState} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import data from '../data/digimons.json';
import digimonsImages from '../assets/digimon/digimon';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const Home = ({navigation}) => {
  const [results, setResults] = useState([]);
  const onChangeTextInput = (text) => {
    if (text === '') setResults([]);
    else
      setResults(
        data.filter((value) => value.name.includes(text.toLowerCase())),
      );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar animated={true} backgroundColor="#005877" />
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Digite um nome"
            style={styles.textInput}
            onChangeText={(text) => onChangeTextInput(text)}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          {results.length > 0 && (
            <>
              {results.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('Details', {
                        name: value.name,
                      })
                    }>
                    <ImageBackground
                      style={styles.imageContainer}
                      source={require('../assets/background.png')}>
                      <Image
                        source={digimonsImages[value.name.replace(/\s/g, '')]}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={600}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: vw * 28,
    height: vh * 20,
  },
  imageContainer: {
    width: vw * 28,
    height: vh * 25,
    justifyContent: 'center',
    marginBottom: vw * 2,
    borderRadius: 120,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 4,
    width: vw * 70,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#222',
    paddingTop: vh * 10,
    paddingHorizontal: vw * 5,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  subContainer: {
    width: vw * 90,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    width: vw * 70,
    marginBottom: vh * 5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: vw * 90,
    flexWrap: 'wrap',
  },
});

export default Home;
