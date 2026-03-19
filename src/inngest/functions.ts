import { wrap } from "module";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

type HelloEvent = {
  data: {
    email: string;
  };
};

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  {event: "execute/ai"},
  async ({ event, step }: { event: HelloEvent; step: any }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text",
      generateText, 
      {
        model: google("gemini-2.5-flash"),
        system: "You are helpful asistant",
        prompt: "whats 2 + 2?"
      }
    );

    return steps;
    
  },
)  ;