import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
  ScrollView,
  Deminsion,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class DailyPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apod: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getApod();
  }

  // Fetches Astronomy Picture of the Day (APOD) using the NASA API
  getApod = () => {
    axios
      .get(
        'https://api.nasa.gov/planetary/apod?api_key=muYpP7WcHwjhnb6TacUHh0NFPHD1eHjrQnaFMkFX'
      )
      .then((response) => {
        this.setState({ apod: response.data, loading: false });
      })
      .catch((error) => {
        alert(error.message);
        this.setState({ loading: false });
      });
  };

  // Renders the loading screen while fetching the APOD data
  renderLoadingScreen() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  render() {
    // Check if data is still loading
    if (this.state.loading) {
      return this.renderLoadingScreen();
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        {Platform.OS === 'android' && (
          <View
            style={{
              height: (StatusBar.currentHeight = 0),
              backgroundColor: '#000',
            }}
          />
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.routeText}>Astronomy Picture Of The Day</Text>
          <Text style={styles.subText}> → → Swipe Right To Go Home → → </Text>
          <Text style={styles.titleText}>{this.state.apod.title}</Text>
          <Text style={styles.dateText}>{this.state.apod.date}</Text>
          <Text style={{ color: '#FFD700', textAlign: 'center' }}>
            * If photo or video is not loaded press the blank space below to see
            in the web browser.
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(this.state.apod.url).catch((err) =>
                console.error("Couldn't load page", err)
              )
            }>
            <View style={styles.iconImage}>
              <Image
                source={{ uri: this.state.apod.url }}
                style={{
                  width: '100%',
                  height: 400,
                  marginTop: 15,
                  marginBottom: 0,
                  marginRight: 10,
                  justifyContent: 'center',
                }}></Image>
            </View>
          </TouchableOpacity>

          <View style={styles.iconImage}></View>
          <Text style={styles.explanationText}>
            {this.state.apod.explanation}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0023',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a0023',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  routeText: {
    fontSize: 50,
    fontWeight: 'normal',
    marginTop: 25,
    paddingLeft: 10,
    textAlign: 'center',
    color: '#e7469a',
  },
  iconImage: {},
  explanationText: {
    color: '#e7469a',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#1a0023',
  },
  dateText: {
    fontSize: 25,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  subText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: -10,
    marginTop: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
});
