import { Card, CardBody, Text, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Coins({availableCoins}) {

  return (
    <Box  display="flex" justifyContent="center" pt="10%">
        <Card w="50%">
        <CardBody>
            <Text color="green.800" fontWeight="bold">
                Available Coins    :      { `${availableCoins}`}
            </Text>
        </CardBody>
        </Card>
    </Box>
  );
}

export default Coins