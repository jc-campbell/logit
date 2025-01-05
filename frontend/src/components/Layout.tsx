import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Appbar from "./Appbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Filter out login, register, and other pages that don't need the sidebar or appbar using regex
  const showAppUI = !/\/(login|register)/.test(location.pathname);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebarOpen = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {showAppUI && (
        <>
          <Appbar handleMenuButtonClick={toggleSidebarOpen} />
          <Sidebar open={sidebarOpen} />
        </>
      )}
      {/* <div className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-md">
        <div className="mx-4 rounded-lg bg-blue-500 p-2">
          {JSON.stringify(location, null, 2)}
          <br />
          {JSON.stringify(location.pathname.split("/").slice(1), null, 2)}
        </div>
      </div> */}
      <div className="fixed bottom-0 left-0 right-0 top-14 overflow-y-auto xl:left-64">
        {children}
      </div>
    </>
  );
};

export default Layout;
