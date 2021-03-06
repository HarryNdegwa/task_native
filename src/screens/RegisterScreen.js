import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Platform } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import createFormData from "../../formDataUtility";
import { baseUrl } from "../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const _onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log("AsyncStorage error: " + error.message);
  }
};

const _userSignup = (data, navigator) => {
  if (data) {
    fetch(`${baseUrl}register/`, {
      method: "POST",
      body: data,
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

function RegisterScreen(props) {
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need media permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
        onSubmit={(values) => {
          values.role = role;
          const data = createFormData(image, values);
          _userSignup(data, props.navigation);
        }}
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
              style={{ height: 25, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
            >
              <Picker.Item label="user" value="USER" />
              <Picker.Item label="admin" value="ADMIN" />
            </Picker>
            <Text>Profile Image</Text>
            <Button title="Upload Image" onPress={pickImage} />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Register" />
            <Text onPress={() => props.navigation.navigate("Login")}>
              Login
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default RegisterScreen;
