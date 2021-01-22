import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Platform } from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import createFormData from "../../formDataUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../baseUrl";

export const _onValueChange = async (item, selectedValue) => {
  // try {
  //   await AsyncStorage.setItem(item, selectedValue);
  // } catch (error) {
  //   console.log("AsyncStorage error: " + error.message);
  // }
};

const _editProfile = async (data) => {
  var TOKEN = await AsyncStorage.getItem("@STORAGE_KEY");
  if (data) {
    fetch(`${baseUrl}profile/`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((response) => {
        _onValueChange();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

function EditScreen(props) {
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    //   make api request to fetch profile data
    const _getProfileData = async () => {
      var TOKEN = await AsyncStorage.getItem("@STORAGE_KEY");
      fetch(`${baseUrl}profile/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    _getProfileData();

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
      <Text>Edit Profile</Text>
      <Formik>
        <Formik
          initialValues={{
            name: (data && data.name) || "",
            email: (data && data.email) || "",
            phone: (data && data.phone) || "",
            role: (data && data.role) || "",
            profile: (data && data.profile) || "",
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            values.role = role;
            const data = createFormData(image, values);
            _editProfile(data);
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

              <Button onPress={handleSubmit} title="Register" />
            </View>
          )}
        </Formik>
      </Formik>
    </View>
  );
}

export default EditScreen;
