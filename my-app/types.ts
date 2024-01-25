import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type CustomButtonType = {
  onPress: () => void;
  title: string;
  disabled: boolean;
  isLoading?: boolean;
  style: {
    backgroundColor?: string;
    color?: string;
  };
};

export type BottomTabNavigationType = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};

export type BottomTabNavigationProp =
  BottomTabScreenProps<BottomTabNavigationType>;

export type StackNavigationType = {
  BottomNavigationTab: undefined;
  Register: undefined;
  Search: undefined;
  Login: undefined;
};

export type StackNavigationProp = NativeStackScreenProps<StackNavigationType>;

export type RegisterFormType = {
  name: string;
  age: string;
  job: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ApiResponseType = {
  code: Number;
  msg: string;
  data?: {
    name: string;
    age: string;
    job: string;
    email: string;
  };
};
