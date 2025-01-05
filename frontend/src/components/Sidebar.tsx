import { memo, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import clsx from "clsx";

const Sidebar = memo(({ open = false }: { open: boolean }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className={clsx(
          "surface fixed bottom-0 top-14 z-10 m-0 flex w-64 flex-col border-r p-4 transition-transform",
          open ? "translate-x-0" : "-translate-x-64 xl:translate-x-0"
        )}
      >
        <SidebarButton icon={"home"} active={true}>
          Home
        </SidebarButton>
        <SidebarButton icon={"whatshot"}>Hot</SidebarButton>
        <SidebarButton icon={"notifications"}>Notifications</SidebarButton>
      </div>
      {/* Bottom App Navigation Bar */}
      <BottomNavbar />
    </>
  );
});

const SidebarButton = ({
  icon = "",
  activeIcon = undefined,
  active = false,
  children = undefined
}: {
  icon?: string;
  activeIcon?: string;
  active?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "mb-2 flex items-center rounded-lg bg-transparent p-1",
        active
          ? "cursor-default bg-gray-300 dark:bg-gray-800"
          : "cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900"
      )}
    >
      <span
        className={clsx(
          "mx-2 text-2xl",
          active ? "material-symbols-filled" : "material-symbols-outlined"
        )}
      >
        {icon}
      </span>
      {children}
    </div>
  );
};

export default Sidebar;
