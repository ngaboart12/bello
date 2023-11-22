import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const AsscategoryScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.iconStyle}>
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
            </Text>
          </TouchableOpacity>
          <View style={styles.titleHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("about")}>
              <Text style={styles.title}>Available collections</Text>
            </TouchableOpacity>
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
          {/* category list */}

          <View style={styles.collectionBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("assproducts")}
            >
              <View style={styles.collectionTitle}>
                <Text style={styles.collectionName}>ROMAN </Text>
                <Text style={styles.collectionName}> COLLECTION</Text>
              </View>

              <View style={styles.collectionList}>
                <Text style={styles.collectionContent}>
                  2Shorts, 2Shorts, 2Shorts ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* </View> */}

          <View style={styles.collectionBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("assproducts")}
            >
              <View style={styles.collectionTitle}>
                <Text style={styles.collectionName}>ROMAN </Text>
                <Text style={styles.collectionName}> COLLECTION</Text>
              </View>
              <View style={styles.collectionList}>
                <Text style={styles.collectionContent}>
                  2Shorts, 2Shorts, 2Shorts ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.collectionBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("assproducts")}
            >
              <View style={styles.collectionTitle}>
                <Text style={styles.collectionName}>ROMAN </Text>
                <Text style={styles.collectionName}> COLLECTION</Text>
              </View>

              <View style={styles.collectionList}>
                <Text style={styles.collectionContent}>
                  2Shorts, 2Shorts, 2Shorts, ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.collectionBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("assproducts")}
            >
              <View style={styles.collectionTitle}>
                <Text style={styles.collectionName}>ROMAN </Text>
                <Text style={styles.collectionName}> COLLECTION</Text>
              </View>
              <View style={styles.collectionList}>
                <Text style={styles.collectionContent}>
                  2Shorts, 2Shorts, 2Shorts, 2Shorts,
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AsscategoryScreen;

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
    color: "#000",
    paddingTop: 0,
    marginLeft: 25,
    paddingLeft: 30,
    paddingRight: 45,
    paddingBottom: 45,
    position: "absolute",
  },
  titleHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
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
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  categoryList: {
    marginTop: 34,
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  collectionBox: {
    marginTop: 4,
    backgroundColor: "#000",
    alignItems: "center",
    width: "46%",
    margin: 6,
  },

  collectionTitle: {
    alignItems: "center",
    paddingHorizontal: 1,
    paddingTop: 44,
    paddingBottom: 8,
  },
  collectionName: {
    paddingBottom: 2,
    fontSize: 17,
    color: "#ffb547",
  },
  collectionList: {
    alignItems: "center",
    paddingHorizontal: 11,
    paddingBottom: 44,
  },
  collectionContent: {
    fontSize: 16,
    textAlign: "center",
    color: "#e9e9e9",
  },
});
