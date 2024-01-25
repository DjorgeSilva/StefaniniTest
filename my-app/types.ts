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
