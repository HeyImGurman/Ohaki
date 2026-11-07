import Logo from "../assets/OhakiLogo.png";
import SideBarButton from "../common/sidebarButton";
import { IoSettings } from "react-icons/io5";

function TopBar() {
    return (
        <div className="fixed top-0 left-0 z-50 flex items-center w-full min-h-[100px] border border-blue-400 rounded-lg">
            <img
                src={Logo}
                alt="Ohaki"
                className="w-32 h-auto object-contain ml-6"
            />

            <span className="ml-auto mr-8 text-xl">
            <SideBarButton label="Settings" icon= <IoSettings /> />
            </span>
        </div>
    );
}

export default TopBar;