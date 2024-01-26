import { Link } from "@react-navigation/native";
import { Field, Formik, FormikProps } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { COLORS, INITIAL_REGISTER_FORM_VALUES } from "../../constants";
import registerUserPost from "../../controllers/registerController";
import { userRegisterValidationSchema } from "../../schemas/formValidationSchema";
import { RegisterFormType, StackNavigationProp } from "../../types";
import { styles } from "./styles";

const Register = ({ navigation }: StackNavigationProp): ReactElement => {
  const ref = useRef<FormikProps<RegisterFormType>>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // reset fields
    navigation.addListener("focus", () => {
      if (ref?.current) {
        ref.current.setValues(INITIAL_REGISTER_FORM_VALUES);
        ref.current.setErrors({});
        ref.current.handleReset();
      }
    });
  }, [navigation]);

  const onSubmit = async (values: RegisterFormType) => {
    setIsLoading(true);
    const resp = await registerUserPost(values);
    if (resp.code !== 200) {
      setIsLoading(false);
      return Toast.show(resp.msg, {
        duration: Toast.durations.SHORT,
        backgroundColor: COLORS.red,
        position: -145,
      });
    }
    setIsLoading(false);
    Toast.show(resp.msg, {
      duration: Toast.durations.SHORT,
      backgroundColor: COLORS.success_color,
      position: -145,
    });
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Text style={styles.title}>Cadastrar</Text>
        </View>
        <Formik
          innerRef={ref}
          validationSchema={userRegisterValidationSchema}
          initialValues={INITIAL_REGISTER_FORM_VALUES}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid }) => (
            <View
              style={{
                ...styles.formWrapper,
                height: Dimensions.get("window").height - 100,
              }}
            >
              <Field component={Input} name={"name"} />
              <Field component={Input} name={"age"} />
              <Field component={Input} name={"job"} />
              <Field component={Input} name={"email"} />
              <Field component={Input} name={"password"} secureTextEntry />
              <Field
                component={Input}
                name={"confirmPassword"}
                secureTextEntry
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ backgroundColor: COLORS.green, color: COLORS.white }}
                  onPress={() => handleSubmit()}
                  title="Cadastrar"
                  disabled={!isValid}
                  isLoading={isLoading}
                />
                <Link to={{ screen: "Login" }} style={styles.link}>
                  já está cadastrado? Login
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
