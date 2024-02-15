import React from 'react'
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

const AddCoins = (props) => {
    const toast = useToast();
    const [open, setOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState();
    const [coins, setCoins] = useState();
    const [mobileNumbers, setMobileNumbers] = useState("");
    const [requestedAmount, setRequestedAmount] = useState("");
    const apiUrl = import.meta.env.VITE_APP_API_URL;
  
   
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = async () => {
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
          const response = await axios(config);
          if (response.status === 200) {
            toast({
              title: "Recharge Successful!",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            props.setIsUpdated(prevState => !prevState);; // Trigger update after successful recharge
          } else {
            toast({
              title: "Enter valid Number",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        } catch (err) {
          console.log(err);
          toast({
            title: "An error occurred.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
        setMobileNumber("");
        setCoins("");
        setOpen(false);
      };
      
  return (
    <Box
      align={"center"}
      width={"100vw"}
      height={"50vh"}
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
            // direction={{ base: "column", lg: "row" }}
            justifyContent={{ base: "end", md: "start" }}
            width={{ base: "100%", md: "100%" }}
          
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
  )
}

export default AddCoins