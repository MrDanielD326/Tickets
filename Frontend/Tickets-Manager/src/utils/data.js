import { LuLayoutDashboard, LuClipboardCheck, LuSquarePlus, LuUsers, LuLogOut } from "react-icons/lu";


export const SIDE_MENU_DATA = [
    { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/admin/dashboard" },
    { id: "02", label: "Manage Task", icon: LuClipboardCheck, path: "/admin/tasks" },
    { id: "03", label: "Create Task", icon: LuSquarePlus, path: "/admin/create-task" },
    { id: "04", label: "Team", icon: LuUsers, path: "/admin/users" }
];

export const SIDE_MENU_USER_DATA = [
    { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/user/dashboard" },
    { id: "02", label: "My Task", icon: LuClipboardCheck, path: "/user/tasks" }
];

export const PRIORITY_DATA = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" }
];

export const STATUS_DATA = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" }
];
