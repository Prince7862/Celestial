import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getIssLocation();
  }

  getIssLocation = () => {
    // Fetches the ISS location data from the API
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({ location: response.data });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    // Check if the location data has been fetched
    if (Object.keys(this.state.location).length === 0) {
      // Render a loading screen if the data is still being fetched
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    } else {
      // Data has been fetched, render the main content
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar hidden />}
          {Platform.OS === 'android' && (
            <View
              style={{
                height: StatusBar.currentHeight,
                backgroundColor: '#000',
              }}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>ISS Location</Text>
            <Text style={styles.subText}> → → Swipe Right To Go Home → → </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}>
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}>
                <Image
                  source={require('../assets/iss_icon.png')}
                  style={{ height: 60, width: 60 }}
                />
              </Marker>
            </MapView>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Latitude: {this.state.location.latitude}
            </Text>
            <Text style={styles.infoText}>
              Longitude: {this.state.location.longitude}
            </Text>
            <Text style={styles.infoText}>
              Altitude: {this.state.location.altitude} KM
            </Text>
            <Text style={styles.infoText}>
              Velocity: {this.state.location.velocity} KM/H
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0023',
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mapContainer: {
    flex: 0.7,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: '#1a0023',
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 20,
    color: '#e7469a',
    fontWeight: 'bold',
    margintop: 50,
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
  subText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
});
