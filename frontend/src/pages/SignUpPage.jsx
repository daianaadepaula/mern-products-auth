import { Box, Button, Container, Heading, Input, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";

export const SignUpPage = () => {
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const toast = useToast();
	const { signup } = useAuthStore();
	const navigate = useNavigate();

	const handleSignup = async () => {
		const { success, message } = await signup(newUser);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});

			setNewUser({ name: "", email: "", password: "" });
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
					Create Account
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "purple.900")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder="Name"
							name="name"
							value={newUser.name}
							onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
						/>
						<Input
							placeholder="Email"
							name="email"
							type="email"
							value={newUser.email}
							onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
						/>
						<Input
							placeholder="Password"
							name="password"
							type="password"
							value={newUser.password}
							onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
						/>
						<Button colorScheme="pink" onClick={handleSignup} w="full">
							Signup
						</Button>
					</VStack>

					<Text fontSize='md' mt={4} textAlign={"center"} fontWeight='bold' color='gray.500'>
						Already have an account? {" "}
						<Link to={"/login"}>
							<Text as='span' color='pink.500' _hover={{ textDecoration: "underline" }}>
								Login
							</Text>
						</Link>
					</Text>

				</Box>
			</VStack>
		</Container>
	);
};
