import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
 
export const appRouter = createTRPCRouter({
    getWorkflows: protectedProcedure
    .query(({ctx}) => {
     return prisma.workFlow.findMany();
    }),

    createWorkflow: protectedProcedure.mutation(async () => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "r@gmail.com"
        }
      })
      return prisma.workFlow.create({
        data: {
          name: "test-workflow"
        },
      })
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;