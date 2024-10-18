import { Box, Container, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { ProductTable } from "../components/ProductTable"
import { useAuthStore } from "../store/authStore"
import { formatDate } from "../utils/date";

export const Dashboard = () => {
	const { user } = useAuthStore();

	return (
		<Container
			maxW='container.xl' py={6}
		>

			<Box w={"full"} bg={useColorModeValue("white", "purple.900")} p={4} rounded={"lg"} shadow={"md"}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDir={{
						base: "column",
						sm: "row",
					}}
				>
					<Flex flexDir={{
						base: "column",
					}}>
						<Text fontSize='md' color='gray.400' fontWeight='bold'>Profile Information</Text>
						<Text as='span'>Name: {user.name}</Text>
						<Text as='span'>Email: {user.email}</Text>
					</Flex>

					<Flex flexDir={{
						base: "column",
					}}>
						<Text fontSize='md' textAlign={"center"} color='gray.400' fontWeight='bold'>Joined</Text>
						{new Date(user.createdAt).toLocaleDateString("pt-BR", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Flex>

					<Flex flexDir={{
						base: "column",
					}}>
						<Text fontSize='md' textAlign={"center"} color='gray.400' fontWeight='bold'>Last Login</Text>
						{formatDate(user.lastLogin)}
					</Flex>
				</Flex>
			</Box>

			<ProductTable />
		</Container>
	)
}
