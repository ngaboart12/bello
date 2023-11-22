import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const AssistProductsScreen = ({ navigation }) => {
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
            <Text style={styles.title}>Collection 0123</Text>
          </View>
        </View>
        <View style={{ height: "80%" }}>
          <ScrollView>
            <View style={styles.titleContent}>
              <Text style={styles.titleContentText}>
                Lorem ipsum dolor sit amet consectetur. Sit vulputate nunc s
              </Text>
            </View>
            <View style={styles.ProductList}>
              <TouchableOpacity
                onPress={() => navigation.navigate("assproductlist")}
              >
                <View style={styles.ProductContent}>
                  <Image
                    source={require("../../assets/image/shoe.jpg")}
                    style={styles.ProductImg}
                  />
                  <View style={styles.text}>
                    <Text style={styles.ProductType}>Shirts</Text>
                    <Text style={styles.quantity}>5 Pieces</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("assproductlist")}
              >
                <View style={styles.ProductContent}>
                  <Image
                    source={require("../../assets/image/shoe.jpg")}
                    style={styles.ProductImg}
                  />

                  <View style={styles.text}>
                    <Text style={styles.ProductType}>Trousers</Text>
                    <Text style={styles.quantity}>5 Pieces</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("assproductlist")}
              >
                <View style={styles.ProductContent}>
                  <Image
                    source={require("../../assets/image/shoe.jpg")}
                    style={styles.ProductImg}
                  />

                  <View style={styles.text}>
                    <Text style={styles.ProductType}>Pants</Text>
                    <Text style={styles.quantity}>5 Pieces</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("assproductlist")}
              >
                <View style={styles.ProductContent}>
                  <View></View>
                  <Image
                    source={require("../../assets/image/shoe.jpg")}
                    style={styles.ProductImg}
                  />
                  <View style={styles.text}>
                    <View>
                      <Text style={styles.ProductType}>T-shirts</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.quantity}>5 Pieces</Text>
                      </View>
                      <View>
                        <Text>5</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.CheckOut}>
              <View style={styles.TotalPrice}>
                <Text style={styles.CheckoutText}>Total</Text>

                <View style={styles.Price}>
                  <Text style={styles.PriceTextContent}>130 000</Text>
                  <Text style={styles.Currency}>Rwf</Text>
                </View>

                <View style={styles.Price}>
                  <Text style={styles.PriceTextContent}>130 000</Text>
                  <Text style={styles.Currency}>Rwf</Text>
                </View>
              </View>
              <Text style={styles.button}>Check it out</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default AssistProductsScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    // alignItems: 'center',

    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 34,
    paddingBottom: 13,
    color: "black",
  },
  iconStyle: {
    // flexDirection: 'flex-start',
    color: "#fff",
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
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: 700,
  },
  titleContent: {
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#ffb648",
    marginHorizontal: 24,
  },

  titleContentText: {
    color: "#fff",
    fontSize: 16,

    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  ProductList: {
    marginTop: 9,
  },
  ProductContent: {
    marginTop: 28,
    marginHorizontal: 24,
    backgroundColor: "#fff",

    height: 95,
    padding: 0,
    margin: 0,
    flexDirection: "row",
  },

  ProductType: {
    paddingHorizontal: 28,
    paddingTop: 16,
    fontSize: 18,

    color: "#696969",
  },
  quantity: {
    paddingHorizontal: 28,
    paddingBottom: 16,
    fontSize: 18,

    color: "#696969",
  },
  ProductImg: {
    width: 95,
    height: 95,
    marginVertical: 0,
    paddingVertical: 0,
  },
  CheckOut: {
    marginTop: 15,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TotalPrice: {
    padding: 6,
  },
  CheckoutText: {
    paddingHorizontal: 24,
    color: "#696969",
  },
  PriceTextContent: {
    paddingLeft: 24,
    paddingTop: 4,
    fontSize: 16,

    color: "#000",
  },
  button: {
    paddingHorizontal: 38,
    paddingVertical: 18,
    backgroundColor: "#ffb648",

    color: "#fff",
    width: "45%",
    marginRight: 28,
  },
  Price: {
    flexDirection: "row",
  },
  Currency: {
    paddingHorizontal: 4,
    paddingTop: 5.5,
    fontSize: 14,

    color: "#696969",
  },
});
