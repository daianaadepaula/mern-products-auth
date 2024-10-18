import { Box, Button, Container, Heading, Input, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";

export const LoginPage = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const toast = useToast();
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const handleLogin = async () => {
		const { success, message } = await login(credentials);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});

			setCredentials({ email: "", password: "" });
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});

			navigate("/dashboard");
		}
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Welcome Back
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "purple.900")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder="Email"
							name="email"
							type="email"
							value={credentials.email}
							onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
						/>
						<Input
							placeholder="Password"
							name="password"
							type="password"
							value={credentials.password}
							onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
						/>
						<Button colorScheme="pink" onClick={handleLogin} w="full">
							Login
						</Button>
					</VStack>

					<Text fontSize='md' mt={4} textAlign={"center"} fontWeight='bold' color='gray.500'>
						Don't have an account? {" "}
						<Link to={"/signup"}>
							<Text as='span' color='pink.500' _hover={{ textDecoration: "underline" }}>
								Sign up
							</Text>
						</Link>
					</Text>

				</Box>
			</VStack>
		</Container>
	);
};
