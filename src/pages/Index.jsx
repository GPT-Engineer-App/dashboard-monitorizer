import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, SimpleGrid, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaServer } from "react-icons/fa";

import { useEffect } from "react";

const Index = () => {
  const [hosts, setHosts] = useState([]);
  const [hostsFileContent, setHostsFileContent] = useState(() => {
    // Simulating reading from a JSON file
    const savedHosts = "[]"; // This would be replaced with the actual content of the JSON file
    return JSON.parse(savedHosts);
  });

  useEffect(() => {
    // Simulating setting the initial state from the JSON file content
    setHosts(hostsFileContent);
  }, [hostsFileContent]);
  const [newHost, setNewHost] = useState("");
  const toast = useToast();

  const handleAddHost = () => {
    if (newHost) {
      const newHostEntry = {
        name: newHost,
        url: newHost,
        ping: "N/A", // In a real-world app, you'd calculate this
        latency: "N/A", // In a real-world app, you'd calculate this
        lastDown: "Never", // In a real-world app, you'd track this
        timeUp: "100%", // In a real-world app, you'd calculate this
        bgColor: "gray.200", // Placeholder, would be replaced with a brand logo or snapshot
      };
      const updatedHosts = [...hosts, newHostEntry];
      setHosts(updatedHosts);
      // Simulating writing to a JSON file
      setHostsFileContent(updatedHosts);
      setNewHost("");
      toast({
        title: "Host added",
        description: `${newHost} has been added to monitoring.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={4}>
        <FormControl id="hostname" isRequired>
          <FormLabel>Add a new host to monitor</FormLabel>
          <Input placeholder="Enter URL or hostname" value={newHost} onChange={(e) => setNewHost(e.target.value)} />
        </FormControl>
        <Button mt={2} leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddHost}>
          Add Host
        </Button>
        <SimpleGrid columns={[1, null, 3]} spacing={4}>
          {hosts.map((host, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={host.bgColor}>
              <VStack>
                <Box as={FaServer} size="50px" color="teal.500" />
                <Text fontWeight="bold">{host.name}</Text>
                <Text>URL: {host.url}</Text>
                <Text>Ping: {host.ping}</Text>
                <Text>Latency: {host.latency}</Text>
                <Text>Last Down: {host.lastDown}</Text>
                <Text>Time Up: {host.timeUp}</Text>
                <Image src={`https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHwlMjQlN0Job3N0Lm5hbWUlN0QlMjBsb2dvfGVufDB8fHx8MTcwOTIwNTUzNXww&ixlib=rb-4.0.3&q=80&w=1080`} fallbackSrc="https://via.placeholder.com/150" />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
