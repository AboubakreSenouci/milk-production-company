import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import Logo from "../../assest/logo.png";

export default function Home() {
  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Flex direction="column" alignItems="center" justify="center" h="100%">
        <Image src={Logo} alt="Milk Production Company Logo" maxW="300px" mx="auto" />

        <Box mt={8} textAlign="center">
          <Heading as="h1" size="xl" color="#334E68">
            Welcome to Milk Production Company Employee Portal
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="#334E68" mt={4}>
            Here, you can access various tools and information to enhance your productivity.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
