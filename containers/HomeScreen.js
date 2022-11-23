import { useNavigation } from "@react-navigation/core";
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
  TouchableOpacity,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import Card from "../components/Card";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms`
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
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < item.ratingValue) {
            const newStar = <Foundation name="star" size={24} color="black" />;
            stars.push(newStar);
          } else {
            const newStar = <Foundation name="star" size={24} color="grey" />;
            stars.push(newStar);
          }
        }
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <Image
                source={{ uri: item.photos[0].url }}
                style={styles.img}
                resizeMode={"cover"}
              />
            </TouchableOpacity>

            <Text>{item.title}</Text>
            <Text>{item.price} €</Text>
            <Text>{stars} </Text>
            <Text>{item.reviews} reviews</Text>
            <Image
              source={{ uri: item.user.account.photo.url }}
              style={styles.avatar}
            />
          </View>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  img: { width: "100%", height: 300 },
  avatar: { width: 80, height: 80, borderRadius: "50%" },
});
