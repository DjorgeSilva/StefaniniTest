import { Ionicons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import { BottomTabNavigationProp } from "../types";

const Search = ({
  navigation,
  route,
}: BottomTabNavigationProp): ReactElement => {
  return (
    <View style={styles.inputWrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.searchIcon}
      >
        <Ionicons name="search" size={SIZES.SMALL} color={COLORS.dark_gray} />
      </TouchableOpacity>
      <TextInput
        showSoftInputOnFocus={false}
        placeholder="Pesquise por um colaborador"
        onFocus={() => navigation.navigate("Search")}
        style={styles.input}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  inputWrapper: {
    width: "95%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    marginVertical: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  searchIcon: {
    width: 60,
    height: 45,
    backgroundColor: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    flex: 5,
    paddingLeft: 10,
  },
});

export default Search;
