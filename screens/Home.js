import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // Simulating a loading delay
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  render() {
    const { loading } = this.state;

    // If loading is true, show the loading screen
    if (loading) {
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
          <View style={styles.loadingContainer}>
            {/* Loading image */}
            <Image
              source={require('../assets/main-icon.png')}
              style={styles.loadingImage}
            />
          </View>
        </View>
      );
    }

    // If loading is false, show the home screen
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        {Platform.OS === 'android' && (
          <View
            style={{ height: StatusBar.currentHeight, backgroundColor: '#000' }}
          />
        )}

        {/* Title bar */}
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>CELESTIAL</Text>
          <Image
            source={require('../assets/main-icon.png')}
            style={styles.headImage}
          />
        </View>

        {/* Space Craft Facts button */}
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('Space Craft')}>
          <Text style={styles.routeText}>Space Craft Facts</Text>
          <Image
            source={require('../assets/space_crafts.png')}
            style={styles.iconImage3}
          />
        </TouchableOpacity>

        {/* Star Map button */}
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('Star Map')}>
          <Text style={styles.routeText}>Star Map</Text>
          <Image
            source={require('../assets/star_map.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        {/* Daily Pictures button */}
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('Daily Picture')}>
          <Text style={styles.routeText}>Daily Pictures</Text>
          <Image
            source={require('../assets/daily_pictures.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        {/* ISS Location button */}
        <TouchableOpacity
          style={styles.routeCard}
          onPress={() => this.props.navigation.navigate('IssLocation')}>
          <Text style={styles.routeText}>ISS Location</Text>
          <Image
            source={require('../assets/iss_icon.png')}
            style={styles.iconImage2}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#1a0023', // Background color of the container
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a0023', // Background color of the loading container
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  routeCard: {
    flex: 0.1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 70,
    borderRadius: 10,
    backgroundColor: '#1a0023',
    borderColor: '#e7469a', // Outline color of the route card
    borderWidth: 2, // Border width of the route card
    top: 110,
  },
  titleBar: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e7469a', // Color of the title text
    marginRight: -10,
    marginTop: 45,
  },
  routeText: {
    fontSize: 20,
    fontWeight: 'normal',
    marginTop: 18,
    paddingLeft: 10,
    textAlign: 'center',
    color: '#e7469a', // Color of the route text
  },
  iconImage: {
    position: 'absolute',
    height: 75,
    width: 75,
    resizeMode: 'contain',
    right: -20,
    top: -30,
  },
  headImage: {
    position: 'absolute',
    height: 150,
    width: 200,
    justifyContent: 'center',
    top: 110,
  },
  iconImage2: {
    position: 'absolute',
    height: 100,
    width: 100,
    resizeMode: 'contain',
    right: -30,
    top: -30,
  },
  iconImage3: {
    position: 'absolute',
    height: 200,
    width: 200,
    resizeMode: 'contain',
    right: -75,
    top: -75,
  },
});
