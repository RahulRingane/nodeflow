interface PageProps {
    params: Promise<{
        executionId: string
    }>
}


const Page = async ({params}: PageProps) => {
    const { executionId } = await params;

    return (
        <p> CredId: {executionId} </p>
    )
};
 
export default Page;