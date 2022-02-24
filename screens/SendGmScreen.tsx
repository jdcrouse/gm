import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import * as LambdaClient from "../utils/LambdaClient";

export default function SendGmScreen({
  userName,
  expoPushToken,
}: {
  userName: string;
  expoPushToken: string | undefined;
}) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "#000" }}>{userName}</Text>
      <Text style={{ fontSize: 20, color: "#000" }}>{expoPushToken}</Text>
      <TouchableOpacity
        onPress={() => sendGmToAllUsers(userName, expoPushToken)}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Send gm</Text>
      </TouchableOpacity>
    </View>
  );
}

const sendGmToAllUsers = (userName: string, userToken: string | undefined) => {
  if (userToken !== undefined) {
    LambdaClient.sendGmToAllUsers(userName, userToken);
  }
};

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
  button: {
    padding: 24,
    borderRadius: 50,
    backgroundColor: "#FC6939",
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
});
