import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_APP_API_URL;
const App = () => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();
  const [coins, setCoins] = useState();
  const [mobileNumbers, setMobileNumbers] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");

  const coloum = [
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "UPI ID",
      selector: (row) => row.upiId,
    },
    {
      name: "Amount",
      selector: (row) => row.requestedAmount,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          bg="green"
          color="white"
          _hover={{ bg: "#004225" }}
          onClick={() => handleClick(row.mobileNumber, row.requestedAmount)}
        >
          Accept
        </Button>
      ),
    },
  ];

  const handleClick = async (mobileNumber, requestedAmount) => {
    console.log(mobileNumber, coins, "Valkkue");
    try {
      const payload = {
        mobileNumber: mobileNumber,
        requestedAmount: requestedAmount,
      };

      const config = {
        method: "POST",
        url: `${apiUrl}/admin/acceptRequestAndTransferAmount`,
        data: payload,
      };

      const response = await axios(config);
      setMobileNumbers(response?.data);
      setRequestedAmount(response?.data);
      if (response === 200) {
        toast({
          title: "Recharge Successful!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      console.log(response, "handleClick");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    // fetch Another Aip
    console.log("reach suucefully");
    try {
      const payload = {
        mobileNumber: mobileNumber,
        coins: coins,
      };
      const config = {
        method: "POST",
        url: `${apiUrl}/userMaster/recharge`,
        data: payload,
      };
      console.log(payload, "payload");
      const response = await axios(config);
      // setMobileNumber(response.data.mobileNumber);
      // setCoins(response.data.coins);
      if (response.status === 200) {
        toast({
          title: "Recharge Successful!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Enter valid Number",
          status: "denger",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }

      // console.log(response, "response");
    } catch (err) {
      console.log(err);
    }
    setMobileNumber("");
    setCoins("");
    setOpen(false);
  };
  return (
    <Box
      bg={"lightblue"}
      align={"center"}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        // width={{ base: "100%", md: "79%" }}
        // marginLeft={{ base: "0", md: "16rem" }}
        px={4}
        py={2}
        // bg="white"
        align={"center"}
      >
        <Flex
          width={{ base: "100%", md: "100%" }}
          direction={{ base: "row", md: "row" }}
          justify={{ base: "space-between", md: "space-between" }}
          align="center"
          height="4rem"
          gap="3rem"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent={{ base: "end", md: "start" }}
            width={{ base: "100%", md: "100%" }}
            ml={{ base: "6rem", md: "0rem" }}
            mt={{ base: "3.5rem", md: "0rem" }}
            gap={{ base: "0" }}
          >
            <Button
              onClick={handleOpen}
              bg="green"
              color="white"
              _hover={{ bg: "darkgreen" }}
            >
              Add Coin
            </Button>

            {open && (
              <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ModalOverlay />
                <ModalContent bg="#527853">
                  <ModalHeader
                    textAlign="center"
                    fontSize="1.9rem"
                    fontFamily="600"
                  >
                    Add Coin
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody bg="#65B741" borderRadius="md">
                    <FormControl>
                      <FormLabel color="black" fontSize="1.3rem">
                        Mobile Number
                      </FormLabel>
                      <Input
                        placeholder="Add Number"
                        border="1px solid black"
                        color="white"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />

                      <FormLabel color="black" fontSize="1.3rem">
                        Add Coin
                      </FormLabel>
                      <Input
                        placeholder="Add Coin"
                        border="1px solid black"
                        color="white"
                        value={coins}
                        onChange={(e) => setCoins(e.target.value)}
                      />
                    </FormControl>
                    <Flex justifyContent="center">
                      <Button
                        colorScheme="white"
                        mt="4"
                        bg="#001524"
                        width="50%"
                        onClick={handleClose}
                      >
                        Recharge
                      </Button>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default App;
