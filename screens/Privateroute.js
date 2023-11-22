import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user) {
    // User is authenticated, render the private content
    return <View>{children}</View>;
  } else {
    // User is not authenticated, redirect to the login screen

    return (
      <View>
        <Text>Please sign in to access this page.</Text>
      </View>
    );
  }
};

export default PrivateRoute;
