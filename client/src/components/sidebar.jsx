import SideBarButton from "../common/sidebarButton";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaPlugCircleExclamation } from "react-icons/fa6";
import { MdDevices } from "react-icons/md";
import { LuActivity } from "react-icons/lu";

function SideBar() {
    return (

        <div className="fixed z-10 flex flex-col gap-8 min-h-screen pt-[300px] items-center w-50 border border-blue-500 rounded-md z-50">


        <aside>
            <SideBarButton label="Overview" icon= <LuLayoutDashboard /> />
            <SideBarButton label="Issues" icon=<FaPlugCircleExclamation /> />
            <SideBarButton label="Applications" icon=<MdDevices /> />
            <SideBarButton label="Activity" icon=<LuActivity /> />
        </aside>
        
        <div className="flex mt-auto mb-8 items-center gap-3 p-3 rounded-lg text-xl text-gray-400 hover:text-gray-200 hover:border hover:border-blue-400 transition-all duration-200 ease-in-out">
            <div className="border rounded-full w-8 h-8 text-gray-400"></div>
            <h3 className="text-gray-400">Username</h3>
        </div>

        </div>

    );
}

export default SideBar;