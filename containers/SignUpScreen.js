import axios from "axios";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [samePassword, setSamePassword] = useState("");

  const [error, setError] = useState("");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{ height: "100%", backgroundColor: "white" }}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.title}>Sign Up</Text>
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
          placeholder="username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          style={styles.inputDescription}
          multiline={true}
          placeholder="Describe yourself in a few words ..."
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
        />

        <TextInput
          style={styles.inputs}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TextInput
          style={styles.inputs}
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setSamePassword(text);
          }}
          value={samePassword}
        />
        <TouchableOpacity
          style={styles.signUp}
          onPress={async () => {
            try {
              if (password === samePassword) {
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/sign_up",
                  {
                    email: email,
                    username: username,
                    description: description,
                    password: password,
                  }
                );
                setToken(response.data.token);
                alert("Sucessful");
              } else {
                setError("Passwords must be the same");
                return;
              }
            } catch (error) {
              console.log(error.response.data.error);
            }
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { marginBottom: 15, fontSize: 22, color: "grey" },
  logo: { width: 90, height: 90, marginTop: 30, marginBottom: 20 },
  inputs: {
    width: 310,
    borderBottomWidth: 2,
    borderBottomColor: "#ffcacf",
    padding: 7,
    marginBottom: 20,
  },
  signUp: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#eb5a62",
    padding: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  register: { textAlign: "center", color: "grey", marginTop: 10 },
  inputDescription: {
    borderWidth: 2,
    borderColor: "#ffcacf",
    height: 80,
    marginBottom: 20,
    marginTop: 20,
    width: 310,
    padding: 5,
  },
  form: {
    alignItems: "center",
  },
});
