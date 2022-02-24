import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useState } from "react";

export default function NameSelectScreen({
  setUserName,
}: {
  setUserName: (newName: string) => void;
}) {
  const [name, setName] = useState<string | undefined>(undefined);
  return (
    <View style={styles.container}>
      <Text>Please enter a username!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setName(name)}
        value={name}
        placeholder="enter a name"
        placeholderTextColor="grey"
      />
      <TouchableOpacity
        onPress={() => (name !== undefined ? setUserName(name) : null)}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    width: "40%",
    borderRadius: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
  },
  button: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: "#FC6939",
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
});
