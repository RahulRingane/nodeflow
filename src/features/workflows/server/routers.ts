import { generateSlug } from "random-word-slugs"
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constant";
import { Search } from "lucide-react";

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
                    //userId: ctx.auth.user.id
                },
                data: {
                    name: input.name
                }
            })
        }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return prisma.workFlow.findUniqueOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                }
            })
        }),

    getMany: protectedProcedure
        .input(
            z.object({
                page: z.number().default(PAGINATION.DEFAULT_PAGE_SIZE),
                pageSize: z
                    .number()
                    .min(PAGINATION.MIN_PAGE_SIZE)
                    .max(PAGINATION.MAX_PAGE_SIZE)
                    .default(PAGINATION.DEFAULT_PAGE),
                search: z.string().default(" "),
            })
        )
        .query(async ({ ctx, input }) => {
            const { page, pageSize, search } = input

            const [items, totalCount] = await Promise.all([
                prisma.workFlow.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    where: {
                        userId: ctx.auth.user.id,
                        name: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                    orderBy: {
                        updatedAt: "desc"
                    }
                }),
                prisma.workFlow.count({
                    where: {
                        userId: ctx.auth.user.id,
                        name: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                })
            ])

            const totalPages = Math.ceil(totalCount / pageSize);
            const hasNextPage = page < totalPages;
            const hasPreviousPage = page > 1;

            return {
                items,
                page,
                pageSize,
                totalCount,
                totalPages,
                hasNextPage,
                hasPreviousPage,
            }

        })

})