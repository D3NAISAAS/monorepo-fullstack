import { db } from '@/lib/prisma';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { randomUUID } from 'crypto';
import { z } from 'zod';
export const userRouter = createTRPCRouter({
  createOrGetUser: baseProcedure
    .input(
      z.object({
        email: z.string().email().optional(),
        name: z.string().optional(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      try {
        // Vérifier si l'utilisateur est déjà authentifié via la session
        const sessionUser = await ctx.session?.user;

        if (sessionUser) {
          // L'utilisateur existe déjà dans la session, on le retourne
          return sessionUser;
        }

        // Si l'utilisateur n'est pas authentifié mais qu'on a des données d'entrée
        if (input?.email) {
          // Rechercher l'utilisateur par email
          const existingUser = await db.user.findUnique({
            where: { email: input.email },
          });

          if (existingUser) {
            // L'utilisateur existe déjà dans la base de données
            return existingUser;
          } else {
            // Créer un nouvel utilisateur directement dans la base de données
            // Selon le schéma Better Auth, nous devons fournir tous les champs requis
            const now = new Date();
            const newUser = await db.user.create({
              data: {
                id: randomUUID(), // Générer un UUID pour l'ID
                email: input.email,
                name: input.name || input.email.split('@')[0], // Utiliser une partie de l'email comme nom par défaut si non fourni
                emailVerified: false, // Par défaut, l'email n'est pas vérifié
                createdAt: now,
                updatedAt: now,
              },
            });

            return newUser;
          }
        }

        // Si aucune information n'est disponible, on renvoie une erreur
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No user found and no information provided to create one',
        });
      } catch (error) {
        console.error('Error in createOrGetUser:', error);
        throw error;
      }
    }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.session?.user;
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No user found',
        });
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
});