import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SiHappycow } from 'react-icons/si';
import { LuMilk } from 'react-icons/lu';
import { FaHeart, FaBaby, FaStethoscope } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';

export default function Sidebar() {
  const sidebarItems = [
    { to: "/", label: "Home", icon: <AiOutlineHome size={20} /> },
    { to: "/cows", label: "Cows", icon: <SiHappycow size={20} /> },
    { to: "/examinations", label: "Examinations", icon: <FaStethoscope size={20} /> },
    { to: "/births", label: "Births", icon: <FaBaby size={20} /> },
    { to: "/milk", label: "Milk", icon: <LuMilk size={20} /> },
  ];

  return (
    <List color="white" fontSize="1.2em" spacing={2} minW="full">
      {sidebarItems.map((item) => (
        <ListItem
          key={item.to}
          _hover={{
            bg: "#1976D2",
            borderRadius: "md",
            transition: "background-color 0.3s ease",
          }}
          px={6}
          py={2}
          minW="full"
        >
          <NavLink to={item.to}>
            <Flex alignItems="center">
              <Box as="span" mr={2}>{item.icon}</Box>
              <Text>{item.label}</Text>
            </Flex>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
}





