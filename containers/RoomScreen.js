import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import {
  Button,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import Card from "../components/Card";

export default function RoomScreen() {
  const route = useRoute();
  console.log(route);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < data.ratingValue) {
      const newStar = <Foundation name="star" size={24} color="#ffb100" />;
      stars.push(newStar);
    } else {
      const newStar = <Foundation name="star" size={24} color="grey" />;
      stars.push(newStar);
    }
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View>
        <Image source={{ uri: data.photos[0].url }} style={styles.imgRoom} />
        <Text style={styles.prices}>{data.price} €</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.bottomPart}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.reviews}>
            <Text>{stars}</Text>
            <Text>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
        />
      </View>

      <Text numberOfLines={3} style={styles.description}>
        {data.description}
      </Text>

      <View style={styles.mapsContainer}>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
            title={data.title}
            description={data.description}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imgRoom: { width: "100%", height: 300, position: "relative" },
  avatar: { width: 80, height: 80, borderRadius: "50%", marginLeft: 10 },
  prices: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    width: 80,
    position: "absolute",
    bottom: 15,
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    marginTop: 10,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  title: { fontSize: 22 },
  bottomPart: { width: "75%" },
  description: { fontSize: 19, padding: 5 },
  mapsContainer: { marginTop: 10, height: 300 },
  map: {
    width: 500,
    height: "100%",
  },
});
