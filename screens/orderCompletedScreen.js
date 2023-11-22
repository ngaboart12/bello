import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import Svg, { Path, Rect } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";
import IconFont from "react-native-vector-icons/Ionicons";

const OrderRecievedScreen = ({ navigation }) => {
  useEffect(() => {
    const handleBackButton = () => {
      navigation.goBack();

      console.log("Back button pressed");

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <View
            style={{
              height: 125,
              width: 125,
              borderRadius: "100%",
              backgroundColor: "#ffe6c1",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "#ffb648",
                height: 96,
                width: 96,
                borderRadius: "50%",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style>
                <Svg
                  width="47"
                  height="47"
                  viewBox="0 0 47 47"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M23.4999 0.583313C10.8728 0.583313 0.583252 10.8729 0.583252 23.5C0.583252 36.1271 10.8728 46.4166 23.4999 46.4166C36.127 46.4166 46.4166 36.1271 46.4166 23.5C46.4166 10.8729 36.127 0.583313 23.4999 0.583313ZM34.4541 18.2291L21.4603 31.2229C21.1381 31.5448 20.7012 31.7255 20.2458 31.7255C19.7903 31.7255 19.3534 31.5448 19.0312 31.2229L12.5458 24.7375C12.2261 24.414 12.0469 23.9776 12.0469 23.5229C12.0469 23.0682 12.2261 22.6318 12.5458 22.3083C13.2103 21.6437 14.3103 21.6437 14.9749 22.3083L20.2458 27.5791L32.0249 15.8C32.6895 15.1354 33.7895 15.1354 34.4541 15.8C35.1187 16.4646 35.1187 17.5416 34.4541 18.2291Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 41,
            alignItems: "center",
            marginHorizontal: 19,
            gap: 15,
            position: "relative",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 800, color: "#ffb547" }}>
            Payment confirmed
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#000",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              lineHeight: 34,
              marginHorizontal: 19,
            }}
          >
            Your product will be delivered in 1 hour, Thank you for shopping
            with us
          </Text>
          <View style={{ width: "100%", height: 55, gap: 0 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("order")}
              style={{
                backgroundColor: "#FFB648",
                height: 55,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                }}
              >
                Check order
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 55 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("homeTab")}
              style={{
                backgroundColor: "#FFf",
                height: 55,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFB648",
                  fontSize: 16,
                }}
              >
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderRecievedScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 112,

    width: "100%",
    height: "100%",
  },
  header: {
    paddingVertical: 31,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffb648",
    flexDirection: "row",
    width: "100%",
    height: 131,
    marginBottom: 31,
    gap: 15,
  },

  iconStyleClose: {
    height: 42,
    width: 42,

    justifyContent: "center",
    alignItems: "center",
  },
});
