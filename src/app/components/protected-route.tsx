import { ReactNode } from "react";
import { useAuth } from "@/app/contexts/auth";
import { NavBar } from "./navbar";
import { Navigate, useLocation } from "react-router-dom";
import { Bio, BioMode } from "./bio";

type ProtectedRouteProps = {
  children?: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { signed } = useAuth();
  const location = useLocation();

  if (signed === false) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <div className="flex-col md:flex h-screen">
      <NavBar />
      <div className="grid gap-2 xl:gap-4 grid-cols-9 h-screen">
        <div className="col-span-9 md:col-span-6 lg:col-span-6 xl:col-span-7 mt-6">{children}</div>
        <div className="col-span-3 lg:col-span-3 xl:col-span-2 items-center h-full hidden md:flex">
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[650px] w-[310px]">
            <div className="rounded-[2rem] overflow-hidden w-[284px] h-[620px] bg-white dark:bg-gray-900 relative">
              <Bio mode={BioMode.Mobile}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
