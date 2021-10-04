import { Flex } from "@chakra-ui/react";
import React from "react";
import MainContent from "./sections/MainContent";

function Home() {
  return (
    <Flex
      height="100v%"
      width="100%"
      backgroundColor="orange.50"
      align="center"
      justify="center"
      padding={{ base: 0, lg: 6 }}
    >
      <MainContent />
    </Flex>
  );
}

export default Home;
