import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users,
  FileText,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  postedDate: string;
  applicationsCount: number;
  status: "Active" | "Paused" | "Closed";
  priority: "High" | "Medium" | "Low";
  description: string;
}

const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Hyderabad",
    postedDate: "2024-01-15",
    applicationsCount: 234,
    status: "Active",
    priority: "High",
    description: "Looking for experienced full stack developer with React, Node.js, and cloud experience."
  },
  {
    id: "2",
    title: "Data Scientist",
    department: "Analytics",
    location: "Bangalore",
    postedDate: "2024-01-12",
    applicationsCount: 189,
    status: "Active",
    priority: "High",
    description: "Data scientist role focusing on machine learning and statistical analysis."
  },
  {
    id: "3",
    title: "UI/UX Designer",
    department: "Design",
    location: "Pune",
    postedDate: "2024-01-10",
    applicationsCount: 156,
    status: "Active",
    priority: "Medium",
    description: "Creative UI/UX designer for web and mobile applications."
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Delhi NCR",
    postedDate: "2024-01-08",
    applicationsCount: 98,
    status: "Paused",
    priority: "Medium",
    description: "DevOps engineer with expertise in AWS, Docker, and Kubernetes."
  }
];

const JobManagement = () => {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Paused":
        return "bg-warning text-warning-foreground";
      case "Closed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Management</h1>
            <p className="text-muted-foreground">
              Manage job postings and track applications across all locations
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Job Posting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Full Stack Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="delhi-ncr">Delhi NCR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter detailed job description, requirements, and qualifications..."
                    rows={6}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="bg-gradient-primary">
                    Publish Job
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md animate-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(job.priority)}>
                        {job.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{job.department}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{job.applicationsCount} applications</span>
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Applications
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                No job postings match your current filters.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
                setStatusFilter("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default JobManagement;