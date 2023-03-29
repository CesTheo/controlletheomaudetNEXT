import { useRouter } from "next/router";
import { NextPage } from "next";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { ChakraProvider, Button, Text, Flex } from '@chakra-ui/react'

const DeployPage: NextPage = () => {
  const router = useRouter();
  const { date } = router.query;
  const url = router.asPath;
  const Formateddate = url.substring(url.lastIndexOf('/') + 1);
  const selectedDate = date ? dayjs(date as string) : dayjs();
  
//   console.log(Formateddate)

  const [deployStatus, setDeployStatus] = useState<string | null>(null);
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchDeployStatus() {
      const response = await fetch(`/api/icandeploy?date=${Formateddate}`);
      const data = await response.json();
      console.log(data)
      if (data.validated) {
        setDeployStatus("Vous pouvez déployer aujourd'hui");
        setColor("green");
      } else {
        setDeployStatus("Vous ne pouvez pas déployer aujourd'hui");
        setColor("red");
      }
    }

    fetchDeployStatus();
  }, []);

  const handleHomeButtonClick = () => {
    router.push("/");
  };


  return (
    <ChakraProvider>
        <Flex 
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
            <Text fontSize="4xl" m="3">
                {selectedDate.format("DD/MM/YYYY")}
            </Text>
            <Text fontSize="4xl" m="3" color={color}>
                {deployStatus}
            </Text>
            <Button onClick={handleHomeButtonClick} colorScheme='blue' m="5" size='lg' >
                Retour à l'accueil
            </Button>
        </Flex>
    </ChakraProvider>
  );
};

export default DeployPage;
