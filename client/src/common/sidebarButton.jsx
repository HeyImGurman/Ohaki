function SideBarButton({ label, icon }) {
    return (
        <button className="flex items-center gap-4 w-36 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white hover:border hover:border-blue-500">
            {icon}
            {label}
        </button>
    );
}

export default SideBarButton;