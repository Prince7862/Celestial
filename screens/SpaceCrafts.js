import React, { Component } from "react";
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
  Linking
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class SpaceCraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircrafts: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getSpaceCrafts();
  }

  getSpaceCrafts = () => {
    axios
      .get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
      .then((response) => {
        this.setState({
          aircrafts: response.data.results,
          loading: false
        });
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image_url }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAgency}>{item.agency.name}</Text>
        <Text style={styles.itemDescription}>DESCRIPTION: {item.agency.description}</Text>
      </View>
    );
  };

  render() {
    const { aircrafts, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar hidden />}
          {Platform.OS === "android" && (
            <View style={{ height: StatusBar.currentHeight, backgroundColor: "#000" }} />
          )}
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar hidden />}
        {Platform.OS === "android" && (
          <View style={{ height: StatusBar.currentHeight, backgroundColor: "#000" }} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Space Craft Facts</Text>
          <Text style={styles.subText}>→ → Swipe Right To Go Home → →</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={aircrafts}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a0023",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a0023"
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
      },
  subText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
  },
  listContainer: {
    flex: 0.75,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 10,
    backgroundColor: "#1a0023",
  },
  itemImage: {
    width: "95%",
    height: 500,
    marginTop: 25,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: RFValue(11),
    color: "#e7469a",
  },
  itemAgency: {
    color: "#696969",
    fontWeight: "bold",
    fontSize: RFValue(11),
  },
  itemDescription: {
    color: "#A9A9A9",
    fontWeight: "bold",
    marginBottom: 110,
    fontSize: RFValue(11),
  },
});

