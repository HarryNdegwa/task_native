import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

function RegisterScreen(props) {
  const [role, setRole] = useState("USER");
  return (
    <View>
      <Text>Register</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          role: "",
          profile: "",
          password: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Name</Text>
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Text>Phone</Text>
            <TextInput
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            <Text>Role</Text>
            <Picker
              selectedValue={role}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
            >
              <Picker.Item label="user" value="USER" />
              <Picker.Item label="admin" value="ADMIN" />
            </Picker>
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Register" />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default RegisterScreen;
