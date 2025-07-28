import { useState } from "react";
import { MapPin, Navigation, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const campusLocations = [
    { 
      id: "library", 
      name: "Central Library", 
      type: "study", 
      coordinates: { x: 30, y: 40 },
      description: "Main library with study rooms and resources",
      amenities: ["WiFi", "Study Rooms", "Computer Lab"]
    },
    { 
      id: "gym", 
      name: "Sports Complex", 
      type: "sports", 
      coordinates: { x: 70, y: 60 },
      description: "Fitness center and sports facilities",
      amenities: ["Gym", "Pool", "Courts"]
    },
    { 
      id: "cafeteria", 
      name: "Student Cafeteria", 
      type: "dining", 
      coordinates: { x: 50, y: 30 },
      description: "Main dining hall and food court",
      amenities: ["Food Court", "Seating", "WiFi"]
    },
    { 
      id: "admin", 
      name: "Administration Building", 
      type: "admin", 
      coordinates: { x: 40, y: 70 },
      description: "Student services and administrative offices",
      amenities: ["Student Services", "Registrar", "Financial Aid"]
    },
    { 
      id: "science", 
      name: "Science Building", 
      type: "academic", 
      coordinates: { x: 60, y: 45 },
      description: "Laboratories and science classrooms",
      amenities: ["Labs", "Classrooms", "Equipment"]
    },
    { 
      id: "parking", 
      name: "Main Parking", 
      type: "parking", 
      coordinates: { x: 20, y: 20 },
      description: "Student and visitor parking area",
      amenities: ["Parking", "Security", "EV Charging"]
    }
  ];

  const getLocationColor = (type: string) => {
    switch (type) {
      case "study": return "bg-info";
      case "sports": return "bg-success";
      case "dining": return "bg-warning";
      case "admin": return "bg-primary";
      case "academic": return "bg-campus-blue";
      case "parking": return "bg-muted-foreground";
      default: return "bg-primary";
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "study": return "📚";
      case "sports": return "🏃‍♂️";
      case "dining": return "🍽️";
      case "admin": return "🏢";
      case "academic": return "🔬";
      case "parking": return "🚗";
      default: return "📍";
    }
  };

  const filteredLocations = campusLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Campus Navigation
          </CardTitle>
          <CardDescription>Find your way around CampusConnect University</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {["study", "sports", "dining", "academic", "admin", "parking"].map((type) => (
              <Badge key={type} variant="outline" className="capitalize">
                {getLocationIcon(type)} {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="relative bg-campus-blue-light rounded-lg h-80 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-campus-blue-light to-campus-blue-light/70">
              {/* Campus Paths */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <path d="M50 0 L50 320" stroke="currentColor" strokeWidth="2" />
                <path d="M0 160 L400 160" stroke="currentColor" strokeWidth="2" />
                <path d="M100 50 L300 270" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Location Markers */}
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`absolute w-8 h-8 rounded-full ${getLocationColor(location.type)} 
                  shadow-elevated flex items-center justify-center text-white text-sm font-bold
                  transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200
                  ${selectedLocation === location.id ? 'ring-4 ring-primary/50 scale-110' : ''}`}
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`
                }}
              >
                <MapPin className="w-4 h-4" />
              </button>
            ))}

            {/* Campus Buildings */}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-card">
              <h4 className="font-semibold text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-info rounded-full"></div>
                  <span>Study Areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>Sports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span>Dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Services</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      {selectedLocation && (
        <Card className="shadow-card border-l-4 border-l-primary">
          <CardContent className="pt-6">
            {(() => {
              const location = campusLocations.find(l => l.id === selectedLocation);
              if (!location) return null;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-xl">{getLocationIcon(location.type)}</span>
                        {location.name}
                      </h3>
                      <p className="text-muted-foreground">{location.description}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {location.type}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Available Amenities</h4>
                    <div className="flex gap-2 flex-wrap">
                      {location.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Get Directions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      More Info
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Popular Locations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Popular Locations</CardTitle>
          <CardDescription>Frequently visited campus spots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campusLocations.slice(0, 4).map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${getLocationColor(location.type)} 
                    flex items-center justify-center text-white`}>
                    <span className="text-lg">{getLocationIcon(location.type)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">{location.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};