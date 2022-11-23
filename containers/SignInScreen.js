import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useState } from "react";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.inputs}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.inputs}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Pressable
          style={styles.signin}
          title="Sign in"
          onPress={async () => {
            try {
              const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/log_in",
                {
                  email: email,
                  password: password,
                }
              );
              console.log(response.data);
              setToken(response.data.token);
            } catch (error) {
              console.log(error.response.data.error);
            }
          }}
        >
          <Text> Sign in</Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.register}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  form: { alignItems: "center", justifyContent: "space-between" },
  title: { marginBottom: 100, fontSize: 22, color: "grey" },
  logo: { width: 90, height: 90, marginTop: 30, marginBottom: 20 },
  inputs: {
    width: 310,
    borderBottomWidth: 2,
    borderBottomColor: "#ffcacf",
    padding: 7,
    marginBottom: 20,
  },
  signin: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#eb5a62",
    padding: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  register: { textAlign: "center", color: "grey", marginTop: 10 },
});
