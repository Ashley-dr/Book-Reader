/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { signIn } from "../auth";
import { signUp } from "../auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Input,
  Text,
  InputRightElement,
  InputGroup,
  Checkbox,
  CheckboxGroup,
  useColorMode,
  useDisclosure,
  Alert,
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
import image from "../assets/library1.jpg";
function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [verify, setVerify] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [showconfirm, setconfirmShow] = React.useState(false);
  const confirmhandleClick = () => setconfirmShow(!showconfirm);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SigninHandle = async (e) => {
    e.preventDefault();

    setError(false);
    setLoading(true);
    try {
      await signIn(email, password);
      alert(`Signed in successfully: ${email}`);
    } catch (error) {
      console.log("Sign in failed");
    } finally {
      setLoading(false);
      navigate("/library");
    }
  };
  function checkVerify(e) {
    setVerify(e.target.value);
  }
  return (
    <div className="max-w-full max-h-full">
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button> */}

      <figure
        style={{ backgroundImage: `url(${image})` }}
        className="justify-center  bg-no-repeat bg-cover bg-center rounded-3xl mx-5  md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 ssm: mt-5 ssm: mb-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:mt-12 lg:mb-0 "
      >
        <figure className=" ssm:mt-10  lg:mt-20">
          <p className=" tracking-tighter font-montserrat text-white ssm:text-lg lg:text-3xl">
            Take a time to Read our Sustainable Development Goal
          </p>
        </figure>
        <figure className="ssm: m-1  lg:m-0  rounded-3xl bg-teal-50 pb-6">
          <article className="m-10">
            <p className="text-3xl text-left  font-bebas">Account Sign in</p>
          </article>

          <form
            className="ssm: px-8 sm:px-28 md:px-24 lg:px-20 grid gap-2 "
            onSubmit={SigninHandle}
          >
            <label className="text-left">Username</label>
            <Input
              borderColor={"teal"}
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <label className="text-left">Password</label>
            <InputGroup>
              <Input
                borderColor={"teal"}
                type={show ? "text" : "password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <div className="text-left">
              {" "}
              <Checkbox
                borderColor={"teal"}
                size="lg"
                colorScheme="green"
                value="test"
                onChange={checkVerify}
              />
              <label className="ml-2 font-quicksand">
                I have read and agree with{" "}
                <button onClick={onOpen} className="underline">
                  Terms of Service
                </button>
              </label>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {verify ? (
              <Button
                colorScheme={"teal"}
                type="submit"
                disabled={error || loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            ) : (
              <>
                {" "}
                <Button className=" bg-teal-700" disabled>
                  Sign in
                </Button>{" "}
              </>
            )}
            <p className="text-lg text-left pt-4 font-bebos">
              Create an Account?{" "}
              <Link to="/signup" className=" underline">
                Sign up
              </Link>
            </p>
          </form>
        </figure>
      </figure>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              These Terms of Service governs you to acccess to an system where a
              users attracts to view our following Sustainable Development Goal
              and the conditions are to carefully review, and by accessing to
              our book readings inside please create account.
            </Text>
            <ModalFooter></ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Signin;
