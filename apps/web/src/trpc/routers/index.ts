import { homeRouter } from '@/features/home/server/procedure';
import { userRouter } from '@/features/user/server/procedure';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  home: homeRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;