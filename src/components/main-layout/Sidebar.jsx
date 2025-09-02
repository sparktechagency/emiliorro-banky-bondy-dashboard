import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
    LayoutGrid, Users, Settings, LogOut, ChevronDown,
    ListOrdered,
    CircleDollarSign,
    UserRoundPen,
    BadgeInfo,
    ReceiptText,
    GlobeLock
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/redux/feature/auth/authSlice";


const navItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/" },
    { name: "User", icon: Users, href: "/users" },
    { name: "Order", icon: ListOrdered, href: "/orders" },
    { name: "Payment", icon: CircleDollarSign, href: "/payments" },
];

const settingsSubItems = [
    { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
    { name: "About Us", icon: BadgeInfo, href: "/settings/about" },
    { name: "Terms & Condition", icon: ReceiptText, href: "/settings/terms" },
    { name: "Privacy Policy", icon: GlobeLock, href: "/settings/privacy" },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const location = useLocation();
    const isSettingsPath = location.pathname.startsWith('/settings');
    const prevLocation = useRef(location);

    useEffect(() => {
        if (prevLocation.current !== location && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
        prevLocation.current = location;
    }, [location, isSidebarOpen, setIsSidebarOpen]);

    const handleLogout = () => {
        dispatch(setUser(null));
        dispatch(setAccessToken(null));
        window.location.href = "/auth/login";
    };

    return (
        <div className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 border-r border-border transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
            <div className="border-b p-[21.5px]">
                <h1 className="text-3xl font-bold tracking-wider text-foreground">DASHBOARD</h1>
            </div>
            <ScrollArea className="h-[calc(100vh-149px)]">
                <nav className="flex-grow space-y-3 p-4">
                    {navItems.map((item) => (
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
