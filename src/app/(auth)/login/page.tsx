"use client"
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page =  async () => {

    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default Page;