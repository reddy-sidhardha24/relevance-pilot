import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon,
  className = ""
}: StatsCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-success" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-destructive" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`animate-smooth hover:shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;