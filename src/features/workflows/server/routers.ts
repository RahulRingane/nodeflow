import { generateSlug } from "random-word-slugs"
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const workFlowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(({ ctx }) => {
        return prisma.workFlow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id
            },
        })
    }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return prisma.workFlow.delete({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                }
            })
        }),

    updatName: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string().min(1) }))
        .mutation(({ ctx, input }) => {
            return prisma.workFlow.update({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                },
                data: {
                    name: input.name
                }
            })
        }),

        getOne: protectedProcedure
        .input(z.object({id: z.string()}))
        .query(({ ctx, input }) => {
            return prisma.workFlow.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                }
            })
        }),

        getMany: protectedProcedure
        .query(({ ctx}) => {
            return prisma.workFlow.findMany({
                where: {
                    userId: ctx.auth.user.id
                }
            })
        })

})