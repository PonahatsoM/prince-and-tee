import { useState } from "react";
import { BookOpen, TrendingUp, Calendar, Award, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Academic = () => {
  const [selectedSemester, setSelectedSemester] = useState("current");

  const currentGrades = [
    {
      subject: "Advanced Mathematics",
      code: "MATH 301",
      grade: "A-",
      points: 3.7,
      credits: 4,
      progress: 92,
      assignments: [
        { name: "Midterm Exam", grade: "A", weight: 30, submitted: true },
        { name: "Problem Set 5", grade: "A-", weight: 15, submitted: true },
        { name: "Final Project", grade: "Pending", weight: 40, submitted: false },
        { name: "Participation", grade: "A", weight: 15, submitted: true }
      ]
    },
    {
      subject: "Physics II",
      code: "PHYS 202",
      grade: "B+",
      points: 3.3,
      credits: 4,
      progress: 87,
      assignments: [
        { name: "Lab Reports", grade: "A-", weight: 25, submitted: true },
        { name: "Midterm", grade: "B+", weight: 35, submitted: true },
        { name: "Final Exam", grade: "Pending", weight: 40, submitted: false }
      ]
    },
    {
      subject: "Computer Science",
      code: "CS 205",
      grade: "A",
      points: 4.0,
      credits: 3,
      progress: 95,
      assignments: [
        { name: "Programming Assignments", grade: "A", weight: 40, submitted: true },
        { name: "Midterm Project", grade: "A", weight: 30, submitted: true },
        { name: "Final Project", grade: "A-", weight: 30, submitted: true }
      ]
    },
    {
      subject: "Chemistry",
      code: "CHEM 101",
      grade: "B",
      points: 3.0,
      credits: 4,
      progress: 82,
      assignments: [
        { name: "Lab Work", grade: "B+", weight: 30, submitted: true },
        { name: "Quizzes", grade: "B", weight: 20, submitted: true },
        { name: "Midterm", grade: "B-", weight: 25, submitted: true },
        { name: "Final Exam", grade: "Pending", weight: 25, submitted: false }
      ]
    }
  ];

  const upcomingAssignments = [
    {
      title: "Physics Final Exam",
      subject: "PHYS 202",
      dueDate: "2024-01-20",
      type: "exam",
      priority: "high"
    },
    {
      title: "Math Final Project",
      subject: "MATH 301",
      dueDate: "2024-01-18",
      type: "project",
      priority: "high"
    },
    {
      title: "Chemistry Lab Report",
      subject: "CHEM 101",
      dueDate: "2024-01-16",
      type: "assignment",
      priority: "medium"
    },
    {
      title: "CS Code Review",
      subject: "CS 205",
      dueDate: "2024-01-22",
      type: "review",
      priority: "low"
    }
  ];

  const academicStats = {
    currentGPA: 3.5,
    totalCredits: 15,
    completedCredits: 45,
    targetGPA: 3.7,
    semesterRank: "Top 15%",
    attendanceRate: 94
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-info';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-info bg-info/5';
      default: return 'border-l-primary bg-primary/5';
    }
  };

  const getAssignmentIcon = (type: string) => {
    switch (type) {
      case 'exam': return '📝';
      case 'project': return '🚀';
      case 'assignment': return '📋';
      case 'review': return '👀';
      default: return '📄';
    }
  };

  const calculateCurrentGPA = () => {
    const totalPoints = currentGrades.reduce((sum, grade) => sum + (grade.points * grade.credits), 0);
    const totalCredits = currentGrades.reduce((sum, grade) => sum + grade.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Academic Dashboard
          </CardTitle>
          <CardDescription className="text-base">
            Track your academic progress and manage assignments
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Academic Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{calculateCurrentGPA()}</div>
            <p className="text-sm text-muted-foreground">Current GPA</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{academicStats.totalCredits}</div>
            <p className="text-sm text-muted-foreground">Credits This Sem</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">{academicStats.completedCredits}</div>
            <p className="text-sm text-muted-foreground">Total Credits</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-campus-blue">{academicStats.attendanceRate}%</div>
            <p className="text-sm text-muted-foreground">Attendance</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card col-span-2 md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-lg font-bold text-warning">{academicStats.semesterRank}</div>
            <p className="text-sm text-muted-foreground">Class Rank</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-card col-span-2 md:col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{academicStats.targetGPA}</div>
            <p className="text-sm text-muted-foreground">Target GPA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grades">Current Grades</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          {currentGrades.map((course) => (
            <Card key={course.code} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.subject}</CardTitle>
                    <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.points} GPA Points
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Assignment Breakdown</h4>
                  {course.assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{assignment.name}</p>
                        <p className="text-xs text-muted-foreground">Weight: {assignment.weight}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={assignment.submitted ? "default" : "outline"}>
                          {assignment.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>Stay on top of your deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(assignment.priority)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getAssignmentIcon(assignment.type)}</span>
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                      <Badge variant={
                        assignment.priority === 'high' ? 'destructive' :
                        assignment.priority === 'medium' ? 'secondary' : 'outline'
                      }>
                        {assignment.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Submit Work</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Assignment Calendar</CardTitle>
              <CardDescription>Visual overview of upcoming deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {/* Simple calendar visualization */}
                <div className="font-semibold p-2">Sun</div>
                <div className="font-semibold p-2">Mon</div>
                <div className="font-semibold p-2">Tue</div>
                <div className="font-semibold p-2">Wed</div>
                <div className="font-semibold p-2">Thu</div>
                <div className="font-semibold p-2">Fri</div>
                <div className="font-semibold p-2">Sat</div>
                
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Adjust for month start
                  const hasAssignment = [16, 18, 20, 22].includes(day);
                  
                  return (
                    <div key={i} className={`p-2 rounded ${
                      day < 1 || day > 31 ? 'text-muted-foreground' :
                      hasAssignment ? 'bg-primary text-primary-foreground font-semibold' :
                      'hover:bg-muted'
                    }`}>
                      {day > 0 && day <= 31 ? day : ''}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Academic Progress Analytics
              </CardTitle>
              <CardDescription>Your performance trends and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GPA Trend */}
              <div>
                <h4 className="font-medium mb-3">GPA Progression</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target GPA ({academicStats.targetGPA})</span>
                    <span className="text-sm text-muted-foreground">85% Progress</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-info">3.2</div>
                    <div className="text-xs text-muted-foreground">Freshman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-info">3.4</div>
                    <div className="text-xs text-muted-foreground">Sophomore</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">3.6</div>
                    <div className="text-xs text-muted-foreground">Junior</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{calculateCurrentGPA()}</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div>
                <h4 className="font-medium mb-3">Subject Performance</h4>
                <div className="space-y-3">
                  {currentGrades.map((course) => (
                    <div key={course.code} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{course.subject}</p>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20">
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className={`font-bold ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-medium mb-3">Recent Achievements</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <Award className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium">Dean's List</p>
                      <p className="text-sm text-muted-foreground">Spring 2023 semester</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
                    <TrendingUp className="w-5 h-5 text-info" />
                    <div>
                      <p className="font-medium">GPA Improvement</p>
                      <p className="text-sm text-muted-foreground">+0.3 points this semester</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};