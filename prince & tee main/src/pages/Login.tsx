import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Mail, Lock, Chrome } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center text-primary-foreground">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center shadow-glow">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">CampusConnect</h1>
          <p className="text-primary-foreground/80">Smart Campus App</p>
        </div>

        {/* Login Form */}
        <Card className="bg-card/95 backdrop-blur-sm shadow-elevated border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in with your campus email to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Campus Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@campusconnect.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-border hover:bg-muted"
              onClick={onLogin}
            >
              <Chrome className="mr-2 w-4 h-4" />
              Google SSO
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Forgot your password?{" "}
                <button className="text-primary hover:underline font-medium">
                  Reset here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-primary-foreground/60 text-xs">
          © 2024 CampusConnect University. All rights reserved.
        </p>
      </div>
    </div>
  );
};