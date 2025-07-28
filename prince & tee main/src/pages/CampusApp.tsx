import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { TabNavigation } from "@/components/Layout/TabNavigation";
import { Dashboard } from "./Dashboard";
import { Map } from "./Map";
import { Bookings } from "./Bookings";
import { Alerts } from "./Alerts";
import { Academic } from "./Academic";

export const CampusApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case "dashboard": return "Dashboard";
      case "map": return "Campus Map";
      case "bookings": return "Bookings";
      case "alerts": return "Alerts";
      case "academic": return "Academic";
      default: return "Campus App";
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "map":
        return <Map />;
      case "bookings":
        return <Bookings />;
      case "alerts":
        return <Alerts />;
      case "academic":
        return <Academic />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={getPageTitle(activeTab)} />
      
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block fixed left-0 top-[73px] w-64 h-[calc(100vh-73px)] bg-card border-r border-border">
        <nav className="p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: "🏠" },
            { id: "map", label: "Campus Map", icon: "🗺️" },
            { id: "bookings", label: "Bookings", icon: "📅" },
            { id: "alerts", label: "Alerts", icon: "🔔" },
            { id: "academic", label: "Academic", icon: "📚" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 pt-4">
        <div className="container mx-auto px-4">
          {renderActiveTab()}
        </div>
      </main>

      {/* Mobile Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};