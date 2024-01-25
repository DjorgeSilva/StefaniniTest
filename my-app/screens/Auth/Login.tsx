import { Link } from "@react-navigation/native";
import { Field, Formik, FormikProps } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { COLORS, INITIAL_LOGIN_FORM_VALUES } from "../../constants";
import { userLoginValidationSchema } from "../../schemas/formValidationSchema";
import { LoginFormType, StackNavigationProp } from "../../types";
import { styles } from "./styles";

const Login = ({ navigation }: StackNavigationProp): ReactElement => {
  const ref = useRef<FormikProps<LoginFormType>>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // reset fields
    navigation.addListener("focus", () => {
      if (ref?.current) {
        ref.current.values = INITIAL_LOGIN_FORM_VALUES;
        ref.current.setErrors({});
        ref.current.handleReset();
      }
    });
  }, [navigation]);

  const onSubmit = async (values: LoginFormType) => {
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Text style={styles.title}>Login</Text>
        </View>
        <Formik
          innerRef={ref}
          validationSchema={userLoginValidationSchema}
          initialValues={INITIAL_LOGIN_FORM_VALUES}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid }) => (
            <View
              style={{
                ...styles.formWrapper,
                height: Dimensions.get("window").height - 120,
              }}
            >
              <Field component={Input} name={"email"} />
              <Field component={Input} name={"password"} secureTextEntry />
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button
                  style={{ backgroundColor: COLORS.green, color: COLORS.white }}
                  onPress={() => handleSubmit()}
                  title="Login"
                  disabled={!isValid}
                  isLoading={isLoading}
                />
              </View>
              <Link to={{ screen: "Register" }} style={styles.link}>
                Não é cadastrado? Cadastra-se
              </Link>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
