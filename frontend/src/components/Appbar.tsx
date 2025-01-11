import { memo } from "react";

const Appbar = memo(
  ({ handleMenuButtonClick }: { handleMenuButtonClick: () => void }) => {
    return (
      <>
        <div className="surface fixed top-0 z-10 flex h-14 w-screen items-center border-b">
          {/* Drawer Toggle */}
          <button
            className="mx-2 p-0 xl:hidden"
            onClick={handleMenuButtonClick}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <div className="mx-2 font-bold xl:ml-7">
            <span className="text-brand">Logit</span>
          </div>
        </div>
      </>
    );
  }
);

export default Appbar;
