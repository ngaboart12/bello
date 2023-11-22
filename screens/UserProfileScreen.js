// import React, { useEffect, useState } from "react";
// import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   onSnapshot,
//   updateDoc,
//   deleteDoc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = getAuth();
//     const firestore = getFirestore();

//     const fetchUserData = async () => {
//       try {
//         const currentUser = auth.currentUser;
//         setUser(currentUser);

//         const documentSnapshot = await getDoc(
//           doc(firestore, "users", currentUser.uid)
//         );

//         if (documentSnapshot.exists()) {
//           setUser(documentSnapshot.data());
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setLoading(false);
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         fetchUserData();
//       }
//     });

//     const unsubscribeFirestore = onSnapshot(
//       doc(firestore, "users", auth.currentUser?.uid),
//       (documentSnapshot) => {
//         if (documentSnapshot.exists()) {
//           setUser(documentSnapshot.data());
//         }
//       }
//     );

//     return () => {
//       unsubscribeAuth();
//       unsubscribeFirestore();
//     };
//   }, []);

//   const updateUserProfile = async () => {
//     try {
//       const firestore = getFirestore();
//       await updateDoc(doc(firestore, "users", user.uid), {
//         displayName: "Ngabo art 123",
//       });
//     } catch (error) {
//       console.error("Error updating user profile:", error.message);
//     }
//   };

//   const deleteUserProfile = () => {
//     Alert.alert(
//       "Delete Profile",
//       "Are you sure you want to delete your profile?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Delete", onPress: confirmDeleteProfile, style: "destructive" },
//       ],
//       { cancelable: true }
//     );
//   };

//   const confirmDeleteProfile = async () => {
//     try {
//       const auth = getAuth();
//       const firestore = getFirestore();
//       await deleteDoc(doc(db, "users", user.uid));
//       // You can also sign out the user after deleting the profile if needed
//       await signOut(auth);
//     } catch (error) {
//       console.error("Error deleting user profile:", error.message);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }
//   console.log(user);

//   return (
//     <View>
//       {user && (
//         <View>
//           <Text>User ID: {user.uid}</Text>
//           <Text>Email: {user.email}</Text>
//           <Text>Display Name: {user.displayName}</Text>
//         </View>
//       )}

//       <Button title="Update Profile" onPress={updateUserProfile} />
//       <Button title="Delete Profile" onPress={deleteUserProfile} />
//     </View>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, db } from "../firebaseConfig";

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);

        // Fetch additional user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("User data:", userData);
        }
      }
    };

    fetchUserData();
  }, []);

  async function getUserData() {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const querySnapshot = await getDoc(userRef);

    if (querySnapshot.exists()) {
      console.log("Document data:", querySnapshot.data());
    } else {
      console.log("No such document");
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={{ padding: 30 }}>
      {user && (
        <Text>
          Welcome, {user.displayName || "User"}!{" "}
          {/* Display the user's name if available */}
        </Text>
      )}
    </View>
  );
};

export default UserProfile;
