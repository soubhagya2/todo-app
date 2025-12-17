import { Outlet } from "react-router-dom";
import { DoHeader } from "../homePage/header";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-center bg-cover  bg-[url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-gray-50 dark:bg-gray-900 dark:bg-none] ">
      <DoHeader isLanding={true} />

      <main className="w-full min-h-[calc(100vh-80px)]">
        <div className="transition-visibility duration-300 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
