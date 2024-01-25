import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
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
