import db from "@workspace/database/db";
import { users } from "@workspace/database/schemas/users";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
export const authRouter = createTRPCRouter({
	getUsers: baseProcedure
		// .input(
		//   z.object({
		//     text: z.string(),
		//   }),
		// )
		.query(async () => {
			return await db.select().from(users);
		}),
});
