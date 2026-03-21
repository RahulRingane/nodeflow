import { WorkflowList, WorkflowsContainer } from "@/features/workflows/components/workflow";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
    searchParams: Promise<SearchParams>
}

const Page = async ({searchParams}: Props) => {
    await requireAuth();
    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);

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