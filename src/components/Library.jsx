/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useColorMode, Button, Text } from "@chakra-ui/react";
import { signIn } from "../auth";
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
import JSONsdg from "./JSON/data.file.sdg.json";

import { CiSquareQuestion } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import image from "../assets/library1.jpg";
import { CiMenuFries } from "react-icons/ci";
function Library() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  const {
    isOpen: isFull,
    onOpen: onFull,
    onClose: closeFull,
  } = useDisclosure();
  const [userEmail, setUserEmail] = useState("");
  const [placement, setPlacement] = useState("left");
  const [size, setSize] = useState("");
  const [books, setBooks] = useState([]);
  const [sdgData, setSdgData] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const [bookId, setBookId] = useState(null);
  const navigate = useNavigate();

  const handleClick = (id) => {
    const item = books.find((item) => item.id === id);
    setBookId(item);
    onFull();
  };
  const handleClickSdg = (id) => {
    const item = JSONsdg.find((item) => item.id === id);
    setSdgData(item);
    modalOnOpen();
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the user's email
      } else {
        setUserEmail("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const bookdata = JSONFile.filter((item) => item.isBook === true);
    setBooks(bookdata);
  }, []);
  return (
    <div className="max-w-full max-h-full  ">
      <figure className="w-full h-screen  bg-white rounded-3xl border-y-4">
        <article className="text-left mx-5 mt-5 pb-5 flex justify-between items-center">
          <Button colorScheme="white" onClick={onOpen}>
            <CiMenuFries className=" text-black ssm:text-4xl md:text-3xl" />
            <label className="text-black border-b-2 pr-2 border-emerald-700  text-lg pl-3 font-light font-bebos ssm:hidden ssm:mx-8 md:block md:mx-1">
              All Books ||
            </label>
          </Button>
          <p className=" text-green-900 text-center font-montserrat ssm:pr-11 ssm:text-sm ssm:mx-3 md:mx-4 md:pr-4">
            17 Sustainable Development Goals in CTU-DANAO CAMPUS
          </p>
        </article>

        <div className="bg-gradient-to-br from-[#2481b8] via-[#2fbb9d] to-[#80D0C7]">
          <div className="rounded-b-2xl  pt-10  justify-items-center grid grid-cols-2 gap-1 ssm:grid-cols-1 md:grid-cols-2">
            <div className="rounded-b-2xl  pt-10  justify-items-center grid ssm:grid-cols-6 gap-1 md:grid-cols-6 mx-10">
              {JSONsdg.map((item) => (
                <div key={item.id}>
                  <button
                    className="transition ease-in-out  bg-blue-500 hover:-translate-y-1 hover:scale-110  "
                    onClick={() => handleClickSdg(item.id)}
                  >
                    <img src={item.image} alt="" className="rounded-md " />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-md   p-5 mt-6 ssm:mx-2 ssm:mr-2 md:mx-0 md:mr-10">
              <p className="text-justify text-white ssm:text-base md:text-lg">
                The 17 Sustainable Development Goals (SDGs): were adopted by all
                United Nations Member States in 2015 as a universal call to
                action to end poverty, protect the planet, and ensure prosperity
                for all. These goals address a wide range of issues such as
                poverty, hunger, health, education, gender equality, clean
                water, and energy to name a few.
                <br /> Implementing these goals requires collective action from
                governments, businesses, civil society, and individuals.
                CTU-Danao Campus is committed to contributing to the achievement
                of the SDGs through various practices and initiatives. From
                promoting sustainable practices on campus to engaging students
                in community service projects, CTU-Danao is working towards a
                more sustainable future for all.
              </p>
            </div>
          </div>
          <div className="rounded-b-2xl  pt-20  justify-items-center grid grid-cols-2 gap-1 md:grid-cols-4 ">
            {JSONFile.map((item) => (
              <div
                key={item.id}
                className="text-center h-max font-quicksand w-max mb-7 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#f3c78e] to-[#e9c977] border border-[#11283b] "
              >
                <p className="text-left mx-2 text-gray-900 font-bebos ssm:text-xs md:text-sm ">
                  {item.title}
                </p>

                <button
                  className="transition ease-in-out   hover:-translate-y-1 hover:scale-110  "
                  onClick={() => handleClick(item.id)}
                >
                  <img
                    src={item.coverImage}
                    className="bg-cover rounded-lg m-1 ssm:w-40 ssm:h-60 ssm: ssm:mx-0 ssm:p-1 md:p-0 md:mx-2 md:h-80 md:w-56"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </figure>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <img src={image} className="max-w-full max-h-full" />

            <Button onClick={logOut} className="mt-4 mr-3 ml-8 float-right">
              <TbLogout2 className="text-3xl" />
            </Button>
            <Button onClick={toggleColorMode} className="mt-4 float-right">
              {colorMode === "light" ? (
                <CiLight className="text-3xl" />
              ) : (
                <MdDarkMode className="text-3xl" />
              )}
            </Button>
            <Button className="mt-4 mr-8 float-right">
              <CiSquareQuestion className="text-3xl" />
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <br />
            {userEmail ? (
              <p>Logged in as: {userEmail}</p>
            ) : (
              <p>No user is logged in</p>
            )}
            <br />
            <p className="text-md font-roboto">Link Pages</p>
            <a
              className="underline"
              href="https://www.facebook.com/profile.php?id=61557090292458&paipv=0&eav=AfbPbKrVVHAVreluoCCEvAPOF39fslDpa7EIZc48wSqgR74zGMQvRnNxx61nD9SXIiQ"
              target="_blank"
            >
              CTU-DC Implementation/Practices:
            </a>
            <br />
            <br />
            <hr />
            <br />
            <p className="text-center text-xl mb-3 font-poppins">SDG Topics</p>
            <div className=" border-l-2 border-teal-300 mx-2 p-2 mb-10 font-montserrat">
              <p className="p-1">
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 1))}
                >
                  1. No Poverty
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 2))}
                >
                  2. Zero Hunger
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 3))}
                >
                  3. Good Health
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 4))}
                >
                  4. Quality Education
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 5))}
                >
                  5. Gender Equality
                </button>
              </p>
              <p className="p-1">
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 6))}
                >
                  6. Clean Water and Sanitaion
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 7))}
                >
                  7. Affordable and Clean Energy
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 8))}
                >
                  8. Decent Work and Economic Growth
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 9))}
                >
                  9. Industry, Innovation and Infastructure
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 10))}
                >
                  10. Reduced Inequalities
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 11))}
                >
                  11. Sustainable Cities and Communities
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 12))}
                >
                  12. Responsible Consumption and Production
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 13))}
                >
                  13. Climate Action
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 14))}
                >
                  14. Life Below Water
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 15))}
                >
                  15. Life on Land
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 16))}
                >
                  16. Peace, Justice and Strong Institutions
                </button>
              </p>
              <p className="p-1">
                {" "}
                <button
                  className="text-left"
                  onClick={() => handleClick((JSONFile.id = 17))}
                >
                  17. Partnership For Goals
                </button>
              </p>
            </div>
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
                  className="mx-1 p-2 font-montserrat"
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

      {/* Modal for SDG links */}

      <Modal isOpen={modalOpen} onClose={modalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{sdgData && <>{sdgData.title}</>}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {sdgData ? (
              <div className=" font-bebos">
                <p className="pb-2">{sdgData.name1}</p>

                <a
                  className="text-white border-dashed border-b-2 bg-gray-800"
                  href={sdgData.link1}
                  target="_blank"
                >
                  {sdgData.link1}
                </a>

                <p className="pt-6">{sdgData.name2}</p>
                <a
                  className="text-white border-dashed border-b-2 bg-gray-800"
                  href={sdgData.link2}
                  target="_blank"
                >
                  {sdgData.link2}
                </a>
              </div>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Library;
