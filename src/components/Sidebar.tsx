import { SquarePen, BookMarked, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Constants } from "@/lib/constants";
import { useProfile } from "@/lib/contexts/profileContext";

export default function Sidebar() {
  const { profileData } = useProfile();
  const location = useLocation();

  const navigationRoutes = [
    {
      name: "Create Letter",
      icon: <SquarePen size={18} />,
      path: Constants.Routes.CREATE_LETTER(),
    },
    {
      name: "Saved Letters",
      icon: <BookMarked size={18} />,
      path: Constants.Routes.HISTORY(),
    },
  ];

  return (
    <div className="w-64 h-full bg-gray-200 px-4 py-8 justify-between flex flex-col">
      <nav className="space-y-2">
        <div className="space-y-2">
          {navigationRoutes.map((route) => (
            <Link to={route.path} key={route.name}>
              <div
                className={`w-full inline-flex justify-start items-center gap-4 px-4 py-3 rounded-full hover:bg-gray-300 text-gray-900 text-sm cursor-pointer mb-2 ${
                  location.pathname === route.path ? "bg-gray-300" : ""
                }`}
              >
                {route.icon}
                <span>{route.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <div>
        <Link
          to={Constants.Routes.PROFILE()}
          className={`w-full inline-flex justify-start items-center gap-4 p-2 rounded-full hover:bg-gray-300 text-gray-900 text-sm cursor-pointer ${
            location.pathname === Constants.Routes.PROFILE()
              ? "bg-gray-300"
              : ""
          }`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-700">
            {profileData?.profilePicture ? (
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <User size={24} />
              </div>
            )}
          </div>

          <div className="text-start flex flex-col">
            <span className="font-medium">
              {profileData?.name || "Your Profile"}
            </span>
            <span className="text-xs text-gray-600">
              {profileData?.username || "Update your profile"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
