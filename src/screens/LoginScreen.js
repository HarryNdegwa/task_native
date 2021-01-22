import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";

import { baseUrl } from "../baseUrl";
import { _onValueChange } from "./RegisterScreen";

const _userLogin = (data, navigator) => {
  if (data) {
    fetch(`${baseUrl}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        _onValueChange("@STORAGE_KEY", responseData.token);
        navigator.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

function LoginScreen(props) {
  return (
    <View>
      <Text>Login</Text>
      <Formik
        initialValues={{ primary: "", password: "" }}
        onSubmit={(values) => {
          _userLogin(values, props.navigation);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Email/Phone</Text>
            <TextInput
              onChangeText={handleChange("primary")}
              onBlur={handleBlur("primary")}
              value={values.primary}
            />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Login" />
            <Text onPress={() => props.navigation.navigate("Register")}>
              Register
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;
