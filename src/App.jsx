import { useEffect, useState } from 'react'
import Coins from "./Coins";
import AddCoins from "./AddCoins";
import { Box , Text , useToast} from "@chakra-ui/react";


const App = () => {
  const [availableCoins, setAvailableCoins] = useState(0)
  const [isUpdated, setIsUpdated] = useState(false)
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const toast = useToast();

// function to get available coins
  const getAvailableCoins = async () => {
     try {
       const response = await fetch(`${apiUrl}/admin/getAvailableCoins`);
       const result = await response.json();
       setAvailableCoins(result.availableCoinsToDistribute)
       if (response.status === 200) {
        toast({
          title: "Coins fetched successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
     } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
     }
  }


  useEffect(()=>{
      console.log("fetching available coins");
      getAvailableCoins();
  },[setAvailableCoins, isUpdated])
 
  return (
   <>
   <Box  bg={"lightblue"}  >
    <Text as ="h1" fontWeight="bold" fontSize="30" textAlign="center" pt="5%" color="pink.700" fontFamily="Algerian">Mahalakshmi Gaming</Text>
    <Coins availableCoins = {availableCoins}/>
    <AddCoins setIsUpdated={setIsUpdated}/>
   </Box>
   </>
  );
};

export default App;
