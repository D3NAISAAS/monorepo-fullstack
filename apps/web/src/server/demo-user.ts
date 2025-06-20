"use server";

import { auth } from "@/lib/auth";
import { faker } from "@faker-js/faker";

interface DemoUser {
	email: string;
	name: string;
	password: string;
}
function createRandomUser(): DemoUser {
	return {
		email: faker.internet.email({ provider: "example.com" }),
		name: faker.person.firstName(),
		password: "123456789",
	};
}
//const user = createRandomUser();

export const demoSignIn = async (email: string, password: string) => {
	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
		return {
			success: true,
			message: `Signed in successfully with email: ${email}`,
		};
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "An unknown error occurred.",
		};
	}
};

export const demoSignUp = async () => {
	// Utiliser un email aléatoire à chaque appel
	const userDemo = createRandomUser();
	// const randomEmail = faker.internet.email({ provider: 'example.com' })
	try {
		await auth.api.signUpEmail({
			body: userDemo,
			// body: {
			//   email: randomEmail,
			//   password,
			//   name: username
			// }
		});
		return {
			success: true,
			message: `Signed up successfully with email: ${userDemo.email}`,
		};
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "An unknown error occurred.",
		};
	}
};
