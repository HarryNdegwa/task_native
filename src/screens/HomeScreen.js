import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { baseUrl } from "../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen(props) {
  const [data, setData] = useState(null);

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

  useEffect(() => {
    _getProfileData();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      {data && data.name ? (
        <View>
          <Text>Name:{data.name}</Text>
          <Text>Email:{data.email}</Text>
          <Text>Phone:{data.phone}</Text>
          <Text>Role:{data.role}</Text>
          <Text>Profile Image:{data.image}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default HomeScreen;
