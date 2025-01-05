import { memo } from "react";
import { useBottomPadding } from "../utils/useBottomPadding";
import clsx from "clsx";

const BottomNavbar = memo(() => {
  const bottomPadding = useBottomPadding();

  return (
    <div
      className={clsx(
        `surface bpx-border fixed bottom-0 z-10 flex h-14 w-full justify-around border-t py-2 sm:hidden`
      )}
      style={{ paddingBottom: bottomPadding + 8 }}
    >
      <BottomNavbarButton icon="home" active={true} />
      <BottomNavbarButton icon="search" />
      <BottomNavbarButton icon="notifications" />
      <BottomNavbarButton icon="people" />
      <BottomNavbarButton icon="forum" />
    </div>
  );
});

const BottomNavbarButton = ({
  icon = "",
  activeIcon = undefined,
  active = false
}: {
  icon?: string;
  activeIcon?: string;
  active?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className={clsx("relative flex items-center")}>
      <span
        className={clsx(
          `text-2xl`,
          active ? "material-symbols-filled" : "material-symbols-outlined"
        )}
      >
        {icon}
      </span>
      {/* indicator */}
      {active && (
        <div className="bg-brand absolute bottom-0 left-0 h-1 w-full rounded-full"></div>
      )}
    </div>
  );
};

export default BottomNavbar;
