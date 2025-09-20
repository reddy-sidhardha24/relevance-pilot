import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

// Sample data for charts
const weeklyData = [
  { day: "Mon", applications: 45, highScore: 12, mediumScore: 23, lowScore: 10 },
  { day: "Tue", applications: 52, highScore: 18, mediumScore: 22, lowScore: 12 },
  { day: "Wed", applications: 38, highScore: 15, mediumScore: 18, lowScore: 5 },
  { day: "Thu", applications: 67, highScore: 25, mediumScore: 28, lowScore: 14 },
  { day: "Fri", applications: 58, highScore: 22, mediumScore: 24, lowScore: 12 },
  { day: "Sat", applications: 31, highScore: 8, mediumScore: 16, lowScore: 7 },
  { day: "Sun", applications: 24, highScore: 6, mediumScore: 12, lowScore: 6 }
];

const scoreDistribution = [
  { range: "90-100", count: 45, percentage: 15 },
  { range: "80-89", count: 78, percentage: 26 },
  { range: "70-79", count: 92, percentage: 31 },
  { range: "60-69", count: 58, percentage: 19 },
  { range: "50-59", count: 21, percentage: 7 },
  { range: "0-49", count: 6, percentage: 2 }
];

const locationPerformance = [
  { name: "Hyderabad", value: 342, color: "hsl(240, 100%, 58%)" },
  { name: "Bangalore", value: 289, color: "hsl(260, 100%, 65%)" },
  { name: "Pune", value: 156, color: "hsl(142, 76%, 36%)" },
  { name: "Delhi NCR", value: 203, color: "hsl(38, 92%, 50%)" }
];

const monthlyTrend = [
  { month: "Jul", avgScore: 68, totalApplications: 890 },
  { month: "Aug", avgScore: 71, totalApplications: 1240 },
  { month: "Sep", avgScore: 73, totalApplications: 1450 },
  { month: "Oct", avgScore: 75, totalApplications: 1680 },
  { month: "Nov", avgScore: 74, totalApplications: 1520 },
  { month: "Dec", avgScore: 76, totalApplications: 1720 },
  { month: "Jan", avgScore: 74, totalApplications: 1890 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{color: entry.color}} className="text-sm">
            {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Applications Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Weekly Application Trends</span>
            <Badge variant="secondary">Last 7 days</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(240, 100%, 58%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(240, 100%, 58%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="applications" 
                stroke="hsl(240, 100%, 58%)" 
                fillOpacity={1}
                fill="url(#applicationsGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="hsl(240, 100%, 58%)" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Location Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Applications by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationPerformance}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              >
                {locationPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any) => [value, 'Applications']}
                labelFormatter={(name: any) => `Location: ${name}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {locationPerformance.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{backgroundColor: entry.color}}
                />
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-sm text-muted-foreground">({entry.value})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Verdict Breakdown */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Daily Verdict Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="highScore" stackId="a" fill="hsl(142, 76%, 36%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="mediumScore" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="lowScore" stackId="a" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm">High Suitability</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm">Medium Suitability</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm">Low Suitability</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Performance Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Performance Trends</span>
            <Badge variant="secondary">7 months</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="avgScore" 
                stroke="hsl(240, 100%, 58%)" 
                strokeWidth={3}
                dot={{ fill: "hsl(240, 100%, 58%)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(240, 100%, 58%)", strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="totalApplications" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(142, 76%, 36%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-primary" />
              <span className="text-sm">Average Score (%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-success border-dashed border-t-2 border-success" />
              <span className="text-sm">Total Applications</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;