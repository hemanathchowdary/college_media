import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  MessageSquare, 
  Users, 
  Briefcase, 
  BookOpen, 
  Bookmark, 
  User, 
  Settings,
  Newspaper,
  Mail
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Message", url: "/messages", icon: MessageSquare, badge: 5 },
  { title: "Jobs/Internship", url: "/jobs", icon: Briefcase },
  { title: "Study Materials", url: "/study", icon: BookOpen },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark },
];

const contentItems = [
  { title: "Communities", url: "/communities", icon: Users },
  { title: "Tech News", url: "/news", icon: Newspaper },
  { title: "Mails", url: "/mails", icon: Mail },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const { open } = useSidebar();
  const collapsed = !open;
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavClassName = (path: string) => {
    const baseClasses = "transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
    return isActive(path) 
      ? `${baseClasses} bg-sidebar-primary text-sidebar-primary-foreground shadow-medium` 
      : baseClasses;
  };

  const sidebarVariants = {
    expanded: { width: 280, opacity: 1 },
    collapsed: { width: 80, opacity: 1 }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen"
    >
      <Sidebar className="border-r border-sidebar-border bg-sidebar h-full">
        <SidebarContent className="px-2 py-4 h-full">


          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className={getNavClassName(item.url)}>
                        <NavLink to={item.url} className="flex items-center">
                          <item.icon className="h-5 w-5" />
                          {!collapsed && (
                            <>
                              <span className="ml-3">{item.title}</span>
                              {item.badge && (
                                <Badge className="ml-auto bg-gradient-accent text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Content Section */}
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Content
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {contentItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + mainItems.length) * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className={getNavClassName(item.url)}>
                        <NavLink to={item.url} className="flex items-center">
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span className="ml-3">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + mainItems.length + contentItems.length) * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className={getNavClassName(item.url)}>
                        <NavLink to={item.url} className="flex items-center">
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span className="ml-3">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </motion.div>
  );
};