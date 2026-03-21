import { WorkflowList, WorkflowsContainer } from "@/features/workflows/components/workflow";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    await requireAuth();

    prefetchWorkflows();

    return (
        <HydrateClient>
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading...</p>}>
                  <WorkflowsContainer>
                     <WorkflowList/>
                  </WorkflowsContainer>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    )
};

export default Page;