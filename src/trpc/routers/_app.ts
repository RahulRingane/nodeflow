import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from "@ai-sdk/google"
import { LanguageModelV3 } from '@ai-sdk/provider';
import { generateText as aiGenerateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
   await inngest.send({
    name: "execute/ai",
   })
   
   return { success: true, message: "Job Queued"}
  }),

  getWorkflows: protectedProcedure
    .query(({ ctx }) => {
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

async function generateText(arg0: { model: LanguageModelV3; prompt: string; }): Promise<{ text: string }> {
  const result = await aiGenerateText({
    model: arg0.model,
    prompt: arg0.prompt,
  });
  return { text: result.text };
}
