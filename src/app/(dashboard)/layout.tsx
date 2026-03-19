import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">

                <AppSidebar />
                <SidebarInset className="flex flex-col w-full">
                    <AppHeader />

                    <main className="flex-1">
                        {children}
                    </main>
                </SidebarInset>

            </div>
        </SidebarProvider>
    );
};

export default Layout;