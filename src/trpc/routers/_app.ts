import { workFlowsRouter } from "@/features/workflows/server/routers";
import { createTRPCRouter } from "../init";



export const appRouter = createTRPCRouter({
  workflows: workFlowsRouter,
})

export type AppRouter = typeof appRouter;