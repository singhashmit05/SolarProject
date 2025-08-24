"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sun, Battery, Home, TrendingUp, TrendingDown, Activity, Gauge } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Mock data for demonstration
const energyData = [
  { time: "00:00", production: 0, consumption: 2.1 },
  { time: "06:00", production: 1.2, consumption: 2.8 },
  { time: "09:00", production: 4.5, consumption: 3.2 },
  { time: "12:00", production: 8.7, consumption: 4.1 },
  { time: "15:00", production: 6.3, consumption: 3.8 },
  { time: "18:00", production: 2.1, consumption: 5.2 },
  { time: "21:00", production: 0, consumption: 3.9 },
]

const weeklyData = [
  { day: "Mon", production: 45.2, consumption: 38.1 },
  { day: "Tue", production: 52.8, consumption: 41.3 },
  { day: "Wed", production: 48.9, consumption: 39.7 },
  { day: "Thu", production: 61.4, consumption: 42.8 },
  { day: "Fri", production: 58.7, consumption: 40.2 },
  { day: "Sat", production: 55.3, consumption: 35.9 },
  { day: "Sun", production: 49.8, consumption: 33.4 },
]

export default function MonitoringPage() {
  const currentProduction = 6.8 // kW
  const currentConsumption = 4.2 // kW
  const batteryLevel = 78 // %
  const todayGenerated = 42.5 // kWh
  const todayConsumed = 35.8 // kWh
  const efficiency = 94 // %

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Solar Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of your solar energy system</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Production</CardTitle>
              <Sun className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">{currentProduction} kW</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Consumption</CardTitle>
              <Home className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{currentConsumption} kW</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
              <Battery className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{batteryLevel}%</div>
              <Progress value={batteryLevel} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
              <Gauge className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{efficiency}%</div>
              <Badge variant="secondary" className="mt-2">
                Excellent
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Today's Energy Flow
              </CardTitle>
              <CardDescription>Real-time production vs consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="production"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    name="Production (kW)"
                  />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Consumption (kW)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Overview
              </CardTitle>
              <CardDescription>7-day energy production and consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="production"
                    stackId="1"
                    stroke="hsl(var(--chart-4))"
                    fill="hsl(var(--chart-4))"
                    fillOpacity={0.6}
                    name="Production (kWh)"
                  />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                    name="Consumption (kWh)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-4 mb-2">{todayGenerated} kWh</div>
              <p className="text-sm text-muted-foreground">Enough to power your home for 1.2 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2 mb-2">{todayConsumed} kWh</div>
              <p className="text-sm text-muted-foreground">
                {(((todayGenerated - todayConsumed) / todayGenerated) * 100).toFixed(1)}% surplus energy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3 mb-2">18.7 kg</div>
              <p className="text-sm text-muted-foreground">CO₂ emissions avoided today</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
