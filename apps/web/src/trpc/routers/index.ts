import { homeRouter } from "@/features/home/server/procedure";
import { todoRouter } from "@/features/todos/server/procedure";
import { userRouter } from "@/features/user/server/procedure";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../init-procedure";
export const appRouter = createTRPCRouter({
	hello: publicProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query((opts) => {
			return {
				greeting: `Hello ${opts.input.text}`,
			};
		}),
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	todos: todoRouter,
	home: homeRouter,
	users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
