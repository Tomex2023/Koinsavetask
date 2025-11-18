import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import useResponsive from "../hooks/useResponsive";
import {loginUser} from "../api/Authe"

export default function LoginScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      Alert.alert("Success", "Login successful!");
      navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };
  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>

      <View style={[styles.card, isDesktop && styles.desktopCard]}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.containSign}>
       <Text>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link} > Sign up </Text>
      </TouchableOpacity>
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
  },
  desktopContainer: {
    backgroundColor: "#f4f4f4",
  },

  card: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  desktopCard: {
    maxWidth: 500,
    padding: 40,
  },
  btnText: { color: "#fff", fontSize: 16, textAlign: "center",fontWeight:'bold' },
  link: { color: "green", fontWeight:'bold' },
  containSign:{flexDirection:'row',marginTop:20,alignSelf:'center',}
});
