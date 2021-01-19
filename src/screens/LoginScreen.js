import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";

function LoginScreen(props) {
  return (
    <View>
      <Text>Login</Text>
      <Formik
        initialValues={{ primary: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
          </View>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;
