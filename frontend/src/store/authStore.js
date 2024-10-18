import { create } from "zustand";
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	token: null,

	signup: async ({ name, email, password }) => {
		if (!name || !email || !password) {
			return { success: false, message: "Please fill in all fields." };
		}

		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});

		const data = await res.json();

		if (!data.success) {
			return { success: false, message: data.message };
		}

		set({ user: data.user });
		return { success: true, message: "User created successfully." };
	},

	login: async ({ email, password }) => {
		if (!email || !password) {
			return { success: false, message: "Please fill in all fields." };
		}

		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!data.success) {
			return { success: false, message: data.message };
		}

		// Agora que o login foi bem-sucedido, armazenamos o token
		const token = data.token; // Supondo que o token esteja aqui
		Cookies.set('authToken', token); // Armazena o token no cookie
		set({ token, user: data.user, isAuthenticated: true }); // Atualiza o estado

		return { success: true, message: "Logged in successfully." };
	},


	logout: async () => {
		Cookies.remove('authToken'); // Remove o token do cookie ao fazer logout
		set({ token: null, isAuthenticated: false });

		const res = await fetch("/api/auth/logout", {
			method: "POST",
		});

		const data = await res.json();

		if (data.success) {
			set({ user: null });
		}

		return { success: data.success, message: data.message };
	},
	checkAuth: () => {
		const token = Cookies.get('authToken');
		if (token) {
			set({ token, isAuthenticated: true });
		}
	},
}));
