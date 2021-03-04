import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import attributeImages from '../assets/attribute/attribute';
import digimonsImages from '../assets/digimon/digimon';
import elementImages from '../assets/element/element';
import familyImages from '../assets/family/family';
import rankImages from '../assets/rank/rank';
import skillImages from '../assets/skills/skills';
import status from '../assets/status/status';
import data from '../data/digimons.json';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const App = ({route, navigation}) => {
  const {name} = route.params;
  const digimon = data.find((value) => value.name === name);

  return (
    <>
      <ScrollView>
        <View
          style={{
            width: '100%',
          }}>
          <ImageBackground
            style={styles.imageContainer}
            source={require('../assets/background.png')}>
            <Image
              source={
                digimonsImages[name.replace(/\s/g, '')] ||
                require('../assets/none.png')
              }
              style={styles.image}
              resizeMode="contain"
              fadeDuration={800}
            />
          </ImageBackground>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>Stage: {digimon.stage}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsProfileInformation}>
              <View style={styles.rowDirection}>
                <Text style={styles.text}>Attribute:</Text>
                <Image source={attributeImages[digimon.attribute]} />
              </View>
              <View style={styles.rowDirection}>
                {digimon.rank !== 'none' && (
                  <>
                    <Text style={styles.text}>Rank: </Text>
                    <Image source={rankImages[digimon.rank]} />
                  </>
                )}
              </View>
              <View style={styles.rowDirection}>
                <Text style={styles.text}>Element: </Text>
                <Image source={elementImages[digimon.element]} />
              </View>
            </View>
            <View style={styles.familyContainer}>
              <Text style={styles.text}>Family: </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {digimon.family.map((value, index) => (
                  <View key={index}>
                    <Image
                      source={
                        familyImages[value.replace(' ', '').replace("'", '')]
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
            {digimon.from !== 'none' && (
              <>
                <View style={{width: '100%'}}>
                  <Text style={styles.evolveText}>Digivolve from:</Text>
                </View>
                <View style={{width: '100%'}}>
                  <Text style={styles.evolveDigimons}>{digimon.from}</Text>
                </View>
              </>
            )}

            <View style={{width: '100%', marginTop: 25}}>
              <Text
                style={{
                  ...styles.subTitle,
                  fontSize: 30,
                }}>
                Skills
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              {digimon.skills.map((value, index) => (
                <View key={index} style={{width: '50%'}}>
                  <View style={styles.contentSkillContainer}>
                    <Image
                      source={
                        skillImages[value.name.replace(/\s/g, '')] ||
                        require('../assets/none.png')
                      }
                    />
                    <Text style={styles.text}>
                      {' '}
                      {value.name.replace('.', '')}
                    </Text>
                  </View>
                  <Text style={styles.skillText}>
                    <Text style={{fontWeight: 'bold'}}>Damage: </Text>
                    {value.lvl1} to {value.lvl25}
                  </Text>
                  <Text style={styles.skillText}>
                    <Text style={{fontWeight: 'bold'}}>DS consumed: </Text>
                    {value.ds}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.skillText, fontWeight: 'bold'}}>
                      Element:{' '}
                    </Text>
                    <Image source={elementImages[value.element]} />
                  </View>
                  <Text style={{...styles.skillText, width: '100%'}}>
                    {value.cooldown} seconds cooldown
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={{
                  ...styles.subTitle,
                  fontSize: 30,
                }}>
                Status
              </Text>
              <Text style={styles.warningText}>
                Approximate statistics with 140% size and level 120
              </Text>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <View>
                  {digimon.status.map((value, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image source={status[value.label]} />
                      <Text style={styles.text}>
                        {value.label === 'ct' || value.label === 'ev'
                          ? ` ${value.value}%`
                          : ` ${value.value}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  warningText: {
    color: 'red',
    letterSpacing: 1,
    textAlign: 'center',
  },
  familyContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: vh * 3,
  },
  statusContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  skillText: {
    color: 'white',
    letterSpacing: 2,
    marginTop: 5,
    fontSize: vw * 3,
  },
  contentSkillContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  evolveText: {
    color: 'white',
    letterSpacing: 2,
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vh * 4,
  },
  evolveDigimons: {
    color: 'white',
    letterSpacing: 2,
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 1,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailsProfileInformation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '120%',
  },
  image: {
    height: vh * 35,
    width: vw * 50,
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#222',
    padding: vw * 4,
    paddingBottom: vw * 4,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
