import { inngest } from "./client";

type HelloEvent = {
  data: {
    email: string;
  };
};

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  {event: "test/hello.world"},
  async ({ event, step }: { event: HelloEvent; step: any }) => {
    await step.sleep("wait-a-moment", "10s");

    return {
      message: `Hello ${event.data.email}`,
    };
  }
);