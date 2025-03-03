import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessageCircle,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/budget-buddy",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transaction",
    icon: Wallet,
  },
  {
    title: "ChatBot",
    url: "/chatbot",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Budget Buddy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-red-500 mb-12"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
