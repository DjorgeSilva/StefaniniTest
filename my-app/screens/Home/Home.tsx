import { HOST, PORT } from "@env";

import { StatusBar } from "expo-status-bar";
import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../components/Search";
import { COLORS } from "../../constants";
import fetchUsers from "../../controllers/fetchUsers";
import { BottomTabNavigationProp, UserType } from "../../types";

const Home = ({ navigation, route }: BottomTabNavigationProp): ReactElement => {
  const [products, setProducts] = useState<UserType[]>([]);

  useEffect((): void => {
    const onLoadProducts = async (): Promise<void> => {
      fetchUsers<{
        msg: string;
        data: UserType[];
      }>(`${HOST}:${PORT}/users`)
        .then((result) => {
          setProducts(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onLoadProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Colaboradores</Text>
          <Search navigation={navigation} route={route} />
          <View style={styles.cardWrapper}>
            {products && products.length > 0 ? (
              products.map((user: UserType, index: number) => {
                return (
                  <View key={index} style={styles.userCard}>
                    <Text style={styles.cardLabel}>nome: {user.name}</Text>
                    <Text style={styles.cardLabel}>
                      age: {user.age ?? "não informado"}
                    </Text>
                    <Text style={styles.cardLabel}>
                      cargo: {user.job ?? "não informado"}
                    </Text>
                    <Text style={styles.cardLabel}>email: {user.email}</Text>
                  </View>
                );
              })
            ) : (
              <Text>Nenhum outro usuário cadastrado</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
  cardWrapper: {
    flex: 1,
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  userCard: {
    width: "45%",
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 8,

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardLabel: {
    textAlign: "center",
    fontSize: 12,
  },
});
