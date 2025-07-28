import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const Header = ({ title, showMenu = false, onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elevated">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showMenu && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMenuClick}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-primary-foreground/80 text-sm">CampusConnect University</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs text-accent-foreground font-bold">3</span>
              </span>
            </Button>
            
            <Avatar className="w-8 h-8 border-2 border-primary-foreground/20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
              <AvatarFallback className="bg-primary-foreground text-primary text-sm font-semibold">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};