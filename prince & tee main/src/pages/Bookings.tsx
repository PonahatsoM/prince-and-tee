import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Plus, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Bookings = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");

  const venues = [
    {
      id: "study-1",
      name: "Study Room A1",
      type: "Study Room",
      capacity: 4,
      amenities: ["Whiteboard", "Projector", "WiFi"],
      available: true,
      location: "Library Floor 2"
    },
    {
      id: "study-2",
      name: "Study Room A2",
      type: "Study Room",
      capacity: 6,
      amenities: ["Whiteboard", "WiFi"],
      available: true,
      location: "Library Floor 2"
    },
    {
      id: "lecture-1",
      name: "Lecture Hall 101",
      type: "Lecture Hall",
      capacity: 100,
      amenities: ["Projector", "Audio System", "WiFi"],
      available: false,
      location: "Academic Building"
    },
    {
      id: "lab-1",
      name: "Computer Lab 1",
      type: "Computer Lab",
      capacity: 30,
      amenities: ["Computers", "Projector", "WiFi"],
      available: true,
      location: "Science Building"
    },
    {
      id: "sports-1",
      name: "Basketball Court",
      type: "Sports Facility",
      capacity: 20,
      amenities: ["Equipment", "Changing Rooms"],
      available: true,
      location: "Sports Complex"
    },
    {
      id: "meeting-1",
      name: "Conference Room",
      type: "Meeting Room",
      capacity: 12,
      amenities: ["Video Conference", "Whiteboard", "WiFi"],
      available: true,
      location: "Administration Building"
    }
  ];

  const myBookings = [
    {
      id: "b1",
      venue: "Study Room A1",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      purpose: "Group Study Session",
      status: "confirmed"
    },
    {
      id: "b2",
      venue: "Computer Lab 1",
      date: "2024-01-16",
      time: "10:00 AM - 12:00 PM",
      purpose: "Programming Project",
      status: "pending"
    },
    {
      id: "b3",
      venue: "Basketball Court",
      date: "2024-01-17",
      time: "6:00 PM - 8:00 PM",
      purpose: "Basketball Practice",
      status: "confirmed"
    }
  ];

  const getVenueIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "study room": return BookOpen;
      case "lecture hall": return Users;
      case "computer lab": return "💻";
      case "sports facility": return "🏀";
      case "meeting room": return "👥";
      default: return MapPin;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success";
      case "pending": return "bg-warning";
      case "cancelled": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const handleBooking = () => {
    // In a real app, this would submit to backend
    setShowBookingForm(false);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedVenue("");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Venue Bookings
              </CardTitle>
              <CardDescription className="text-base">
                Reserve study rooms, labs, and sports facilities
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="bg-gradient-primary hover:shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Booking Form */}
      {showBookingForm && (
        <Card className="shadow-elevated border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>Create New Booking</CardTitle>
            <CardDescription>Select a venue, date, and time for your reservation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.filter(v => v.available).map((venue) => (
                      <SelectItem key={venue.id} value={venue.id}>
                        {venue.name} - {venue.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time Slot</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                    <SelectItem value="11-13">11:00 AM - 1:00 PM</SelectItem>
                    <SelectItem value="13-15">1:00 PM - 3:00 PM</SelectItem>
                    <SelectItem value="15-17">3:00 PM - 5:00 PM</SelectItem>
                    <SelectItem value="17-19">5:00 PM - 7:00 PM</SelectItem>
                    <SelectItem value="19-21">7:00 PM - 9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  placeholder="e.g., Group Study, Meeting, Practice"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleBooking} className="bg-gradient-primary">
                Confirm Booking
              </Button>
              <Button variant="outline" onClick={() => setShowBookingForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* My Bookings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            My Bookings
          </CardTitle>
          <CardDescription>Your current and upcoming reservations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {myBookings.map((booking) => (
            <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`} />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">{booking.venue}</p>
                  <Badge variant="outline" className="capitalize">
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.time}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="destructive">Cancel</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Venues */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Available Venues</CardTitle>
          <CardDescription>Browse and book campus facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => {
              const IconComponent = getVenueIcon(venue.type);
              
              return (
                <div key={venue.id} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-card ${
                  venue.available ? 'hover:scale-105' : 'opacity-60'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {typeof IconComponent === 'string' ? (
                        <span className="text-xl">{IconComponent}</span>
                      ) : (
                        <IconComponent className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <p className="font-semibold">{venue.name}</p>
                        <p className="text-sm text-muted-foreground">{venue.type}</p>
                      </div>
                    </div>
                    <Badge variant={venue.available ? "default" : "secondary"}>
                      {venue.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>Capacity: {venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full" 
                    disabled={!venue.available}
                    onClick={() => {
                      setSelectedVenue(venue.id);
                      setShowBookingForm(true);
                    }}
                  >
                    {venue.available ? "Book Now" : "Unavailable"}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};