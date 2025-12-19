import { Outlet } from "react-router-dom";
import { DoHeader } from "../homePage/header";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-center bg-cover bg-[url('/images/bg.avif')] bg-gray-50 dark:bg-gray-900 dark:bg-none] ">
      <DoHeader isLanding={true} />

      <main className="w-full min-h-[calc(100vh-80px)]">
        <div className="transition-visibility duration-300 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
