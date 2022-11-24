import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function AroundMeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          console.log(location);
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);

          setLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getPermission();
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.mapsContainer}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {data.map((marker) => {
          return (
            <Marker
              key={marker.latitude}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              title={marker.title}
              description={marker.description}
              onCalloutPress={() => {
                navigation.navigate("Room", { id: marker._id });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  mapsContainer: { height: "100%", width: "100%" },
});
