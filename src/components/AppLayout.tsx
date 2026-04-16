import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  Target,
  Repeat,
  StickyNote,
  Settings,
} from "lucide-react";

const mobileNav = [
  { icon: LayoutDashboard, to: "/", label: "Home" },
  { icon: MessageSquare, to: "/chat", label: "Chat" },
  { icon: CalendarDays, to: "/planner", label: "Plan" },
  { icon: Target, to: "/goals", label: "Goals" },
  { icon: Repeat, to: "/habits", label: "Habits" },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/chat": "Chat",
  "/planner": "Planner",
  "/goals": "Goals",
  "/habits": "Habits",
  "/notes": "Notes",
  "/settings": "Settings",
};

export function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "LifeAI";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          {/* Desktop header */}
          <header className="hidden md:flex h-14 items-center border-b px-4">
            <SidebarTrigger className="mr-4" />
            <span className="font-heading font-semibold text-sm">{title}</span>
          </header>

          {/* Mobile header */}
          <header className="flex md:hidden h-14 items-center justify-between border-b px-4">
            <SidebarTrigger className="mr-3" />
            <span className="font-heading font-semibold text-sm">{title}</span>
            <Link to="/settings" className="p-2 text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
            </Link>
          </header>

          <main className="flex-1 overflow-auto pb-16 md:pb-0">
            <Outlet />
          </main>

          {/* Mobile bottom tab bar */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-16 items-center justify-around border-t bg-card/95 backdrop-blur-md">
            {mobileNav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors ${
                    active ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </SidebarProvider>
  );
}
