import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
    LayoutGrid, Users, Settings, LogOut, ChevronDown,
    ListOrdered,
    CircleDollarSign,
    UserRoundPen,
    BadgeInfo,
    ReceiptText,
    GlobeLock,
    Handshake,
    ContactRound
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";


const navItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/" },
    { name: "Skills Management", icon: ListOrdered, href: "/skills" },
    { name: "Audio Topics Management", icon: CircleDollarSign, href: "/audio-topic" },
    { name: "Report Management", icon: CircleDollarSign, href: "/report" },
    { name: "Make Admin", icon: CircleDollarSign, href: "/make-admin" },
];

const userManagementSubItems = [
    { name: "All Users", icon: Users, href: "/users" },
    { name: "All Donors", icon: Handshake, href: "/donors" },
];

const settingsSubItems = [
    { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
    { name: "About Us", icon: BadgeInfo, href: "/settings/about" },
    { name: "Terms & Condition", icon: ReceiptText, href: "/settings/terms" },
    { name: "Privacy Policy", icon: GlobeLock, href: "/settings/privacy" },
    { name: "Contact Us", icon: ContactRound, href: "settings/contact-us" },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
    const location = useLocation();
    const isSettingsPath = location.pathname.startsWith('/settings');
    const isUserManagementPath = location.pathname.startsWith('/users') || location.pathname.startsWith('/donors');
    const prevLocation = useRef(location);

    useEffect(() => {
        if (prevLocation.current !== location && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
        prevLocation.current = location;
    }, [location, isSidebarOpen, setIsSidebarOpen]);

    const handleLogout = () => {
        dispatch(setAdmin(null));
        dispatch(setAccessToken(null));
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
    };

    return (
        <div className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
            <div className=" p-[21.5px] flex items-center justify-center">
                <div className="h-10 w-32 border-2 dark:border-white border-primary flex justify-center items-center gap-2 rounded-[100%]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22B14C]"></div>
                    <div className="w-12 h-2 rounded-full border dark:border-white border-primary bg-[#FFF200]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ED1C24]"></div>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-149px)]">
                <nav className="flex-grow space-y-3 p-4">
                    {/* Dashboard NavLink */}
                    <NavLink key={navItems[0].name} to={navItems[0].href} end className={({ isActive }) =>
                        `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200 border 
                    ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"
                        }`
                    } onClick={() => setIsSidebarOpen(false)}>
                        {navItems[0].name}
                    </NavLink>

                    {/* User Management Collapsible */}
                    <Collapsible defaultOpen={isUserManagementPath}>
                        <CollapsibleTrigger onClick={() => setIsUserManagementOpen(!isUserManagementOpen)} className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 border 
                    ${isUserManagementPath ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"
                        }`}>
                            <div className="flex items-center text-sm ">
                                <Users className="mr-2 h-4 w-4" />
                                User Management
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isUserManagementOpen ? "-rotate-180" : ""}`} />

                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 space-y-2">
                            {userManagementSubItems.map((item, index) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                    className={({ isActive }) =>
                                        `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200 border 
                                ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"}`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className="mr-2 w-4 h-4" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Remaining NavItems (Order, Payment) */}
                    {navItems.slice(1).map((item) => (
                        <NavLink key={item.name} to={item.href} end className={({ isActive }) =>
                            `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200 border 
                    ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"
                            }`
                        } onClick={() => setIsSidebarOpen(false)}>
                            <item.icon className="mr-2 w-4 h-4" />
                            {item.name}
                        </NavLink>
                    ))}

                    <Collapsible defaultOpen={isSettingsPath}>
                        <CollapsibleTrigger onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 border 
                    ${isSettingsPath ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"
                            }`}>
                            <div className="flex items-center text-sm ">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSettingsOpen ? "-rotate-180" : ""}`} />

                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 space-y-2">
                            {settingsSubItems.map((item, index) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                    className={({ isActive }) =>
                                        `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200 border 
                                ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-black/5 dark:bg-white/5"}`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className="mr-2 w-4 h-4" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </nav>
            </ScrollArea>
            <div className="border-t p-4">
                <Button onClick={handleLogout} variant="outline" className="justify-start w-full">
                    <LogOut />
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
