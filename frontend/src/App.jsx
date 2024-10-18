import { Box, useColorModeValue } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { CreatePage } from "./pages/CreatePage";
import { Dashboard } from "./pages/Dashboard";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuthStore } from "./store/authStore.js";

function App() {
	const { isAuthenticated } = useAuthStore();

	return (
		<Box minH={"100vh"} bg={useColorModeValue("purple.100", "purple.800")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/dashboard' element={
					isAuthenticated ? (
						<Dashboard />
					) : (
						<Navigate to="/login" replace />
					)
				}
				/>
				<Route path='/create' element={
					isAuthenticated ? (
						<CreatePage />
					) : (
						<Navigate to="/login" replace />
					)
				}
				/>
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</Box>
	)
}

export default App
