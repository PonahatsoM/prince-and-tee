import { Home, MapPin, Calendar, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "map", label: "Map", icon: MapPin },
  { id: "bookings", label: "Book", icon: Calendar },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "academic", label: "Academic", icon: User },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-all duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className="font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};