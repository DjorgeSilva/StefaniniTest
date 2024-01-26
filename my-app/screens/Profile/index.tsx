import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants";
import { getInputIcon } from "../../utils";

const Profile = () => {
  const currentUser = useSelector((store: any) => store.userStore.currentUser);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Perfil</Text>

          <View style={styles.infoWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.cardLabel}>Nome: {currentUser.name}</Text>
              <Ionicons name={getInputIcon("name")} size={20} />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.cardLabel}>
                Idade: {currentUser.age ?? "não informado"}
              </Text>
              <Ionicons name={getInputIcon("age")} size={20} />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.cardLabel}>
                Cargo: {currentUser.job ?? "não informado"}
              </Text>
              <Ionicons name={getInputIcon("job")} size={20} />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.cardLabel}>Email: {currentUser.email} </Text>
              <Ionicons name={getInputIcon("email")} size={20} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light_green,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "500",
  },
  infoWrapper: {
    width: "95%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
  },
  cardLabel: {
    textAlign: "center",
    fontSize: 12,
  },
  textWrapper: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
