import { useState } from "react";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentEvaluations from "@/components/dashboard/RecentEvaluations";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  Target, 
  Clock, 
  Plus,
  ArrowUpRight,
  MapPin,
  Calendar,
  BarChart3,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const locationStats = [
    { name: "Hyderabad", applications: 342, rate: "68%" },
    { name: "Bangalore", applications: 289, rate: "72%" },
    { name: "Pune", applications: 156, rate: "64%" },
    { name: "Delhi NCR", applications: 203, rate: "71%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Monitor resume evaluations and hiring progress across all locations
              </p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-primary shadow-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Job Posting
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Applications"
              value="1,247"
              subtitle="This week"
              trend="up"
              trendValue="+12%"
              icon={<Users className="h-4 w-4 text-primary" />}
            />
            <StatsCard
              title="Active Job Postings"
              value="18"
              subtitle="Across all locations"
              trend="up"
              trendValue="+2"
              icon={<FileText className="h-4 w-4 text-primary" />}
            />
            <StatsCard
              title="Average Score"
              value="74.2%"
              subtitle="Relevance match"
              trend="up"
              trendValue="+3.2%"
              icon={<Target className="h-4 w-4 text-primary" />}
            />
            <StatsCard
              title="Processing Time"
              value="2.3s"
              subtitle="Average per resume"
              trend="down"
              trendValue="-0.5s"
              icon={<Clock className="h-4 w-4 text-primary" />}
            />
          </div>
        </section>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Evaluations */}
              <div className="lg:col-span-2">
                <RecentEvaluations />
              </div>

              {/* Location Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Location Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {locationStats.map((location) => (
                        <div key={location.name} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{location.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {location.applications} applications
                            </p>
                          </div>
                          <Badge variant="secondary" className="font-semibold">
                            {location.rate}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Weekly Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Suitability</span>
                        <span className="font-semibold text-success">312 candidates</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Suitability</span>
                        <span className="font-semibold text-warning">567 candidates</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low Suitability</span>
                        <span className="font-semibold text-muted-foreground">368 candidates</span>
                      </div>
                      <div className="pt-2 border-t">
                        <Button variant="outline" size="sm" className="w-full">
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          View Detailed Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsCharts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;