import { db } from '@/lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init-procedure';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// Définir l'interface pour le type d'utilisateur
interface User {
  id: string;
  name: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const homeRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Nous savons que user existe grâce au protectedProcedure
        // Mais nous devons typer correctement l'utilisateur
        const user = ctx.session.user as User;
        if (!user.id) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No user found',
          });
        }

        // Vérifier qu'au moins un champ est fourni pour la mise à jour
        if (Object.keys(input).length === 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'No data provided for update',
          });
        }

        // Préparer les données à mettre à jour
        const updateData: {
          name?: string;
          image?: string;
          updatedAt: Date;
        } = {
          updatedAt: new Date(), // Mettre à jour le timestamp
        };

        if (input.name) updateData.name = input.name;
        if (input.image) updateData.image = input.image;

        // Mettre à jour l'utilisateur dans la base de données
        const updatedUser = await db.user.update({
          where: { id: user.id },
          data: updateData,
        });

        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }),
});