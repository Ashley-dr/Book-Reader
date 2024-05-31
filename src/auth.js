/* eslint-disable no-unused-vars */
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'



export const signUp = async (email, password) => {
    try {
       await createUserWithEmailAndPassword(auth, email, password);
    
      
        // console.log("Signed up Successfully");
    } catch (error) {
        //   <Alert status='error'>
        //     <AlertIcon />
        //         Sign up Error!
        // </Alert>
        alert(error)
        console.log("Sign up Error", error);
    }
};

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        //   <Alert status='success'>
        //         <AlertIcon />
        //         Account Signed in `${auth.email}`
        //     </Alert>
            console.log("Signed in");
    } catch (error) {
        console.log("Error to sign in.", error);
        //   <Alert status='error'>
        //     <AlertIcon />
        //     Error! try input again.
        // </Alert>
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        //   <Alert status='success'>
        //     <AlertIcon />
        //         Signed out.
        //   </Alert>
    } catch (error) {
        console.log("Error to sign out", error);
//           <Alert status='error'>
//     <AlertIcon />
//     There was an error processing to sign out
//   </Alert>
    }
};