import { useState } from "react";
import { Bell, Calendar, AlertTriangle, Info, Clock, CheckCircle2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "class",
      priority: "high",
      title: "Class Schedule Change",
      message: "Advanced Mathematics class moved from Room A-204 to Room B-105",
      time: "2 hours ago",
      read: false,
      actionable: true
    },
    {
      id: "2",
      type: "announcement",
      priority: "medium",
      title: "Campus WiFi Maintenance",
      message: "WiFi will be temporarily unavailable on Saturday 2-4 PM for scheduled maintenance",
      time: "5 hours ago",
      read: false,
      actionable: false
    },
    {
      id: "3",
      type: "grade",
      priority: "low",
      title: "New Grade Posted",
      message: "Your Physics midterm grade is now available in the academic portal",
      time: "1 day ago",
      read: true,
      actionable: true
    },
    {
      id: "4",
      type: "event",
      priority: "medium",
      title: "Campus Sports Tournament",
      message: "Registration now open for the annual inter-department sports tournament",
      time: "2 days ago",
      read: false,
      actionable: true
    },
    {
      id: "5",
      type: "emergency",
      priority: "high",
      title: "Weather Alert",
      message: "Heavy rain expected. Indoor activities recommended for this evening",
      time: "3 hours ago",
      read: true,
      actionable: false
    }
  ]);

  const upcomingEvents = [
    {
      id: "e1",
      title: "Advanced Mathematics",
      type: "class",
      time: "Tomorrow 9:00 AM",
      location: "Room B-105",
      reminder: true
    },
    {
      id: "e2",
      title: "Study Group - Physics",
      type: "study",
      time: "Tomorrow 2:00 PM",
      location: "Library Room 3",
      reminder: true
    },
    {
      id: "e3",
      title: "Campus Career Fair",
      type: "event",
      time: "Friday 10:00 AM",
      location: "Main Auditorium",
      reminder: false
    },
    {
      id: "e4",
      title: "Sports Tournament Registration Deadline",
      type: "deadline",
      time: "Next Monday",
      location: "Online",
      reminder: true
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "class": return Calendar;
      case "announcement": return Info;
      case "grade": return CheckCircle2;
      case "event": return Bell;
      case "emergency": return AlertTriangle;
      default: return Bell;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-info bg-info/5";
      default: return "border-l-primary bg-primary/5";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case "low": return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "class": return "📚";
      case "study": return "👥";
      case "event": return "🎉";
      case "deadline": return "⏰";
      default: return "📅";
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="relative">
              <Bell className="w-6 h-6 text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            Alerts & Notifications
          </CardTitle>
          <CardDescription className="text-base">
            Stay updated with important campus announcements and reminders
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 min-w-[20px] h-5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              
              return (
                <Card 
                  key={alert.id} 
                  className={`shadow-card border-l-4 transition-all duration-200 ${
                    getAlertColor(alert.priority)
                  } ${!alert.read ? 'shadow-elevated' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          alert.priority === 'high' ? 'bg-destructive' :
                          alert.priority === 'medium' ? 'bg-warning' : 'bg-info'
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${!alert.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {alert.title}
                            </h3>
                            {getPriorityBadge(alert.priority)}
                            {!alert.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          
                          <p className="text-muted-foreground mb-2">{alert.message}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{alert.time}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              {alert.actionable && (
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              )}
                              {!alert.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => markAsRead(alert.id)}
                                >
                                  Mark Read
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => dismissAlert(alert.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="shadow-card">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No new alerts at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your scheduled classes, events, and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="text-2xl">{getEventIcon(event.type)}</div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {event.reminder && (
                      <Badge variant="outline" className="text-xs">
                        Reminder Set
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Push Notifications
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Email Reminders
                </Button>
                <Button variant="outline" className="justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Class Reminders
                </Button>
                <Button variant="outline" className="justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};