import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { Path, Svg } from "react-native-svg";

import ProductFromcategory from "../component/ProductFromCategor";

const ProductCategory = ({ route, navigation }) => {
  const { cate } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryToQuery = cate; // Change this to your desired category
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", categoryToQuery)
        );
        const querySnapshot = await getDocs(q);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Query products with the specified category

  return (
    <View style={styles.constain}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 25 }}
        >
          <Svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>{cate}</Text>
        <Text></Text>
      </View>
      {products.length == 0 ? (
        <View style={{ position: "absolute", bottom: "50%", left: "45%" }}>
          <Text style={{ fontSize: 40 }}>Empty</Text>
        </View>
      ) : (
        ""
      )}

      <View style={styles.productList}>
        {!products ? (
          <Text>Loading....</Text>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 25,
                marginBottom: 26,
              }}
            >
              <View style={{ flexDirection: "row", gap: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  New arrival
                </Text>
                <Svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.72481 7.1414C3.9467 6.91951 4.29391 6.89934 4.53859 7.08089L4.60869 7.1414L10.0001 12.5325L15.3915 7.1414C15.6134 6.91951 15.9606 6.89934 16.2053 7.08089L16.2754 7.1414C16.4972 7.36329 16.5174 7.71051 16.3359 7.95519L16.2754 8.02529L10.442 13.8586C10.2201 14.0805 9.87291 14.1007 9.62824 13.9191L9.55814 13.8586L3.72481 8.02529C3.48073 7.78121 3.48073 7.38548 3.72481 7.1414Z"
                    fill="black"
                  />
                </Svg>
              </View>
              <View style={{ flexDirection: "row", gap: 3 }}>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.4899 11.4233C15.9199 11.4233 17.0833 12.5808 17.0833 14.0033C17.0833 15.4258 15.9199 16.5833 14.4899 16.5833C13.0591 16.5833 11.8949 15.4258 11.8949 14.0033C11.8949 12.5808 13.0591 11.4233 14.4899 11.4233ZM14.4899 12.6733C13.7483 12.6733 13.1449 13.27 13.1449 14.0033C13.1449 14.7375 13.7483 15.3333 14.4899 15.3333C15.2308 15.3333 15.8333 14.7375 15.8333 14.0033C15.8333 13.27 15.2308 12.6733 14.4899 12.6733ZM8.40025 13.4107C8.74525 13.4107 9.02525 13.6907 9.02525 14.0357C9.02525 14.3807 8.74525 14.6607 8.40025 14.6607H3.14942C2.80442 14.6607 2.52442 14.3807 2.52442 14.0357C2.52442 13.6907 2.80442 13.4107 3.14942 13.4107H8.40025ZM5.09417 3.33334C6.525 3.33334 7.68833 4.49168 7.68833 5.91418C7.68833 7.33668 6.525 8.49334 5.09417 8.49334C3.66417 8.49334 2.5 7.33668 2.5 5.91418C2.5 4.49168 3.66417 3.33334 5.09417 3.33334ZM5.09417 4.58334C4.35333 4.58334 3.75 5.18001 3.75 5.91418C3.75 6.64751 4.35333 7.24334 5.09417 7.24334C5.83583 7.24334 6.43833 6.64751 6.43833 5.91418C6.43833 5.18001 5.83583 4.58334 5.09417 4.58334ZM15.9926 5.33368C16.3376 5.33368 16.6176 5.61368 16.6176 5.95868C16.6176 6.30368 16.3376 6.58368 15.9926 6.58368H10.7426C10.3976 6.58368 10.1176 6.30368 10.1176 5.95868C10.1176 5.61368 10.3976 5.33368 10.7426 5.33368H15.9926Z"
                    fill="#FFB648"
                  />
                </Svg>

                <Text
                  style={{ fontSize: 16, color: "#ffb547", fontWeight: 600 }}
                >
                  Filter
                </Text>
              </View>
            </View>

            <FlatList
              data={products}
              renderItem={({ item, index }) => {
                return <ProductFromcategory data={item} key={index} />;
              }}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
      {products.length == 0 ? (
        <View style={{ position: "absolute", bottom: "50%", left: "45%" }}>
          <Text style={{ fontSize: 32 }}>Empty</Text>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  constain: {
    flex: 1,
    paddingVertical: 38,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productList: {
    paddingTop: 20,
  },
});

export default ProductCategory;
