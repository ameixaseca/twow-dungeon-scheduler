import { NavLink, Outlet } from "react-router";
import { useAppContext } from "../infra/app.context";

export const MainLayout = () => {
  const { pocketbase, messages } = useAppContext();

  return (
    <>
      <nav className="flex space-x-4 p-4 bg-gray-800 text-white">
        <div className="font-extrabold">
          <NavbarLink to="/">Turtle Wow Dungeon Scheduler</NavbarLink></div>
        <div className="flex space-x-4">
          <NavbarLink to="/characters">Characters</NavbarLink>
          <NavbarLink to="/dungeons">Dungeons</NavbarLink>
        </div>
        <div className="ml-auto">
          <div className="flex space-x-4">
            {pocketbase.authStore.isValid && (
              <a
                className="hover:text-orange-300"
                href="/"
                onClick={() => {
                  pocketbase.authStore.clear();
                }}
              >
                Logout
              </a>
            )}

            {!pocketbase.authStore.isValid && (
              <NavbarLink to="/login">Login</NavbarLink>
            )}
          </div>
        </div>
      </nav>

      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 ${
            message.type === "error" ? "bg-red-200" : "bg-green-200"
          }`}
        >
          {message.text}
        </div>
      ))}

      <div className="container mx-auto p-4">
       <Outlet />
      </div>
    </>
  );
};

export const NavbarLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink className="hover:text-orange-300" to={to} end>
      {children}
    </NavLink>
  );
};
