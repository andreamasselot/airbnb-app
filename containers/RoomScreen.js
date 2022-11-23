import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Button,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import Card from "../components/Card";

export default function RoomScreen() {
  const route = useRoute();
  console.log(route);
  const navigation = useNavigation();
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
        <View>
          <Text style={styles.title}>{data.title}</Text>
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

      <Text>{data.description}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imgRoom: { width: "100%", height: 300, position: "relative" },
  avatar: { width: 80, height: 80, borderRadius: "50%" },
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
    padding: 20,
    alignItems: "center",
  },
  reviews: { flexDirection: "row", alignItems: "center", padding: 10 },
  title: { fontSize: 22 },
});
