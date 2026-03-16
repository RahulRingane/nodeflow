import { RegisterForm } from "@/features/auth/components/register-form";
import { requireAuth, requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireUnAuth();

    return <RegisterForm/>
};

export default Page;