import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Deploy = () => {
    const [deployStatus, setDeployStatus] = useState<string | null>(null);
    const [color, setColor] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchDeployStatus() {
          const response = await fetch("/api/icandeploy");
          const data = await response.json();
          if(data.validated){
              setDeployStatus("Vous pouvez déployer aujourd'hui");
              setColor("green")
          }else{
              setDeployStatus("Vous ne pouvez pas déployer aujourd'hui");
              setColor("red")
          }
        }
    
        fetchDeployStatus();
      }, []);

    return (
        <div>
            <Text fontSize="4xl" m="5" color={color} >
                {deployStatus}
            </Text>
        </div>
    );
};

export default Deploy;