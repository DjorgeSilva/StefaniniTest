import { StatusBar } from "expo-status-bar";
import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import SearchComponent from "../../components/Search";
import { COLORS, EMPTY_STRING } from "../../constants";
import { SearchProps, UserType } from "../../types";

const Search = ({ navigation, route, onChange }: SearchProps): ReactElement => {
  const users = useSelector(
    (store: any) => store.userStore.userList as unknown as UserType[]
  );
  const [filteredUser, setFilteredUser] = useState<UserType[]>([]);
  const [value, setValue] = useState<string>(EMPTY_STRING);

  useEffect((): void => {
    const onLoadProducts = async (): Promise<void> => {
      if (value !== EMPTY_STRING) {
        const userList = users.filter((user: UserType) =>
          user.name.includes(value)
        );
        if (userList) {
          setFilteredUser(userList);
        }
      } else {
        setFilteredUser([]);
      }
    };
    onLoadProducts();
  }, [value]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Colaboradores</Text>
          <SearchComponent
            navigation={navigation}
            route={route}
            onChange={setValue}
          />
          <View style={styles.cardWrapper}>
            {filteredUser && filteredUser.length > 0 ? (
              filteredUser.map((user: UserType, index: number) => {
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
              <View></View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

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
