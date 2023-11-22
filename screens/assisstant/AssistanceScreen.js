import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const AssistanceScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconStyle}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M16.0303 4.46967C16.2966 4.73594 16.3208 5.1526 16.1029 5.44621L16.0303 5.53033L9.561 12L16.0303 18.4697C16.2966 18.7359 16.3208 19.1526 16.1029 19.4462L16.0303 19.5303C15.7641 19.7966 15.3474 19.8208 15.0538 19.6029L14.9697 19.5303L7.96967 12.5303C7.7034 12.2641 7.6792 11.8474 7.89705 11.5538L7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z"
                  fill="black"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <View style={styles.titleHeader}>
            <Text style={styles.title}>Shop Assistant</Text>
          </View>
        </View>

        <View style={styles.titleContent}>
          <Text style={styles.titleContentHeader}>Select Age</Text>
          <Text style={styles.titleContentText}>
            Lorem ipsum dolor sit amet consectetur. Sit vulputate nunc faucibus
            elit sed tempor. Ultrices porttitor odio dolor duis
          </Text>
        </View>
        <View style={styles.categoryList}>
          <TouchableOpacity onPress={() => navigation.navigate("asscategory")}>
            <View style={styles.categoryContent}>
              <Text style={styles.AgeCategory}>0-5</Text>
              <Text style={styles.TextContent}>Months</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("asscategory")}>
            <View style={styles.categoryContent}>
              <Text style={styles.AgeCategory}>5-12</Text>
              <Text style={styles.TextContent}>Months</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("asscategory")}>
            <View style={styles.categoryContent}>
              <Text style={styles.AgeCategory}>1-2</Text>
              <Text style={styles.TextContent}>years</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("asscategory")}>
            <View style={styles.categoryContent}>
              <Text style={styles.AgeCategory}>2+</Text>
              <Text style={styles.TextContent}>years</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AssistanceScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffb648",
    // alignItems: 'center',

    width: "100%",
    height: "100%",
    color: "#000",
  },
  header: {
    paddingTop: 34,
    paddingBottom: 25,
    borderBottomColor: "#ffc266",
    borderBottomWidth: 2,
  },
  iconStyle: {
    // flexDirection: 'flex-start',
    color: "#000",
    paddingTop: 0,
    marginHorizontal: 2,
    paddingLeft: 30,
    paddingRight: 45,
    paddingBottom: 45,
    position: "absolute",
  },
  titleHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
  },
  title: {
    color: "#000",
    fontSize: 18,
  },
  titleContent: {
    alignItems: "center",
    marginTop: 25,
  },
  titleContentHeader: {
    color: "#000",
    fontSize: 20,
    fontWeight: 700,
  },
  titleContentText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  categoryContent: {
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: "#000",
    alignItems: "center",
  },
  categoryList: {
    marginTop: 34,
  },
  AgeCategory: {
    paddingHorizontal: 126,
    paddingTop: 16,
    fontSize: 20,

    color: "#ffb547",
    alignItems: "center",
  },
  TextContent: {
    paddingHorizontal: 126,
    paddingBottom: 16,
    fontSize: 20,

    color: "#fff",
    alignItems: "center",
  },
});
