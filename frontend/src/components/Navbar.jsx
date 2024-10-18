import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { LuLogOut, LuSun, LuUser2 } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import { LockIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../store/authStore.js";

export const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isAuthenticated, checkAuth, logout } = useAuthStore();

	const navigate = useNavigate();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const handleLogout = () => {
		logout();
		navigate('/');  // Redireciona para a página inicial após o logout
	};

	return (
		<Container maxW='container.xl' px={4} bg={useColorModeValue("purple.200", "purple.900")}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-l, #7928CA, #FF0080)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛍️</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					{isAuthenticated && (
						<Link to={"/create"}>
							<Button>
								<PlusSquareIcon fontSize={20} />
							</Button>
						</Link>
					)}

					{isAuthenticated && (
						<Link to={"/dashboard"}>
							<Button>
								<LockIcon fontSize={20} />
							</Button>
						</Link>
					)}

					{isAuthenticated && (
						<Button onClick={handleLogout}>
							<LuLogOut fontSize={20} />
						</Button>
					)}

					{!isAuthenticated && (
						<Link to={"/signup"}>
							<Button>
								<LuUser2 fontSize={20} />
							</Button>
						</Link>
					)}

					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>

			</Flex>
		</Container>
	)
}
