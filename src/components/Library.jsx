/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useColorMode, Button, Text } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import JSONFile from "./JSON/data.file.books.json";

import { CiSquareQuestion } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import image from "../assets/library1.jpg";
import { CiMenuFries } from "react-icons/ci";
function Library() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFull,
    onOpen: onFull,
    onClose: closeFull,
  } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const [size, setSize] = useState("");
  const [books, setBooks] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [bookId, setBookId] = useState(null);
  const navigate = useNavigate();

  const handleClick = (id) => {
    const item = books.find((item) => item.id === id);
    setBookId(item);
    onFull();
  };
  const sizes = ["full"];
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error to sign out", error);
    } finally {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const bookdata = JSONFile.filter((item) => item.isBook === true);
    setBooks(bookdata);
  }, []);
  return (
    <div className="max-w-full max-h-full  ">
      <figure className="w-full h-screen  bg-white rounded-3xl border-y-4">
        <article className="text-left mx-5 mt-5 pb-5">
          <Button colorScheme="white" onClick={onOpen}>
            <CiMenuFries className="text-3xl text-black" />
          </Button>
          <label className="text-black text-lg pl-3 font-bebos">
            All Books |||
          </label>
        </article>

        <div className="rounded-b-2xl  pt-10 bg-gradient-to-br from-[#2481b8] via-[#2fbb9d] to-[#80D0C7] border justify-items-center grid grid-cols-2 gap-1 md:grid-cols-4 ">
          {JSONFile.map((item) => (
            <div
              key={item.id}
              className="text-center h-max font-quicksand w-max mb-7 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#f3c78e] to-[#e9c977] border border-[#11283b] "
            >
              <p className="text-left mx-2 text-gray-900 font-bebos ssm:text-xs md:text-sm ">
                {item.title}
              </p>

              <button onClick={() => handleClick(item.id)}>
                <img
                  src={item.coverImage}
                  className="bg-cover rounded-lg m-1 ssm:w-40 ssm:h-60 ssm: ssm:mx-0 ssm:p-1 md:p-0 md:mx-2 md:h-80 md:w-56"
                />
              </button>
            </div>
          ))}
        </div>
      </figure>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <img src={image} className="max-w-full max-h-full" />

            <Button onClick={logOut} className="mt-4 ml-4 float-right">
              <TbLogout2 className="text-3xl" />
            </Button>
            <Button onClick={toggleColorMode} className="mt-4 float-right">
              {colorMode === "light" ? (
                <CiLight className="text-3xl" />
              ) : (
                <MdDarkMode className="text-3xl" />
              )}
            </Button>
            <Button className="mt-4 mr-4 float-right">
              <CiSquareQuestion className="text-3xl" />
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>

            <button onClick={logOut}>Log out</button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Books Drawer */}
      <Drawer onClose={closeFull} placement="left" isOpen={isFull} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            {bookId ? (
              <>
                <p className=" font-semibold font-montserrat m-3">
                  {bookId.title}
                </p>
                <p className="mx-5 m-4 text-center font-montserrat">
                  {bookId.titleDisc}
                </p>
                <Text
                  textAlign={"center"}
                  className=" font-semibold font-montserrat"
                  mt="2"
                  whiteSpace="pre-wrap"
                >
                  {bookId.information}
                </Text>
                <Text
                  className="mx-5 p-5 font-montserrat"
                  mt="2"
                  whiteSpace="pre-wrap"
                >
                  {bookId.information2}
                </Text>
              </>
            ) : (
              <>
                <p>Loading</p>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Library;
