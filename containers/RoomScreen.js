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

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <Image source={{ uri: data.photos[0].url }} style={styles.img} />
      <Text>{data.price} €</Text>
      <Text>{data.title}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  img: { width: "100%", height: 300 },
  avatar: { width: 80, height: 80, borderRadius: "50%" },
});
