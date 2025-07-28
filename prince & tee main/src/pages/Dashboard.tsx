import { BookOpen, Calendar, MapPin, Users, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const quickActions = [
    { id: "map", label: "Campus Map", icon: MapPin, color: "bg-info" },
    { id: "bookings", label: "Book Room", icon: Calendar, color: "bg-primary" },
    { id: "alerts", label: "Alerts", icon: Clock, color: "bg-warning" },
    { id: "academic", label: "Grades", icon: BookOpen, color: "bg-success" },
  ];

  const upcomingEvents = [
    { time: "9:00 AM", title: "Advanced Mathematics", location: "Room A-204", type: "class" },
    { time: "2:00 PM", title: "Study Group - Physics", location: "Library Room 3", type: "study" },
    { time: "4:30 PM", title: "Campus Sports Event", location: "Main Stadium", type: "event" },
  ];

  const academicProgress = [
    { subject: "Mathematics", grade: "A-", progress: 92 },
    { subject: "Physics", grade: "B+", progress: 87 },
    { subject: "Computer Science", grade: "A", progress: 95 },
    { subject: "Chemistry", grade: "B", progress: 82 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Welcome back, Alex!</CardTitle>
              <CardDescription className="text-base">
                Ready to make today productive? Here's your campus overview.
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                onClick={() => onNavigate(action.id)}
                className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300 hover:scale-105"
              >
                <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your upcoming classes and events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-center">
                <p className="text-sm font-semibold text-primary">{event.time}</p>
                <div className={`w-2 h-2 rounded-full mt-1 mx-auto ${
                  event.type === 'class' ? 'bg-primary' : 
                  event.type === 'study' ? 'bg-info' : 'bg-warning'
                }`} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => onNavigate("alerts")}>
            View All Events
          </Button>
        </CardContent>
      </Card>

      {/* Academic Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Academic Progress
          </CardTitle>
          <CardDescription>Your current semester performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {academicProgress.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm font-semibold text-primary">{subject.grade}</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => onNavigate("academic")}>
            View Detailed Progress
          </Button>
        </CardContent>
      </Card>

      {/* Campus Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">Active Bookings</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">3.7</div>
            <p className="text-sm text-muted-foreground">Current GPA</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card col-span-2 md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">89%</div>
            <p className="text-sm text-muted-foreground">Attendance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};