import { Link } from "@react-navigation/native";
import { Field, Formik, FormikProps } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { COLORS, INITIAL_LOGIN_FORM_VALUES } from "../../constants";
import loginUser from "../../controllers/loginController";
import { userLoginValidationSchema } from "../../schemas/formValidationSchema";
import { setCurrentUser } from "../../store/user/actions/setUsersAction";
import { LoginFormType, StackNavigationProp, UserType } from "../../types";
import { styles } from "./styles";

const Login = ({ navigation }: StackNavigationProp): ReactElement => {
  const dispatch = useDispatch();
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
    const resp = await loginUser(values);
    if (resp.code !== 200) {
      setIsLoading(false);
      return Toast.show(resp.msg, {
        duration: Toast.durations.SHORT,
        backgroundColor: COLORS.red,
        position: -145,
      });
    }
    if(resp && resp.data){
      dispatch(
        setCurrentUser({
          currentUser: resp.data as unknown as UserType,
        })
      );
    }
    setIsLoading(false);
    navigation.navigate("BottomNavigationTab");
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
