"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  Sun,
  CloudRain,
  TrendingUp,
  Battery,
  Thermometer,
  Wind,
  Eye,
  MapPin,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts"

// Mock weather and forecast data
const currentWeather = {
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
  cloudCover: 25,
  uvIndex: 7,
  visibility: 15,
  condition: "Partly Cloudy",
  icon: "partly-cloudy",
}

const hourlyForecast = [
  { time: "09:00", temp: 22, clouds: 20, predicted: 6.8, actual: 6.5, efficiency: 95 },
  { time: "10:00", temp: 24, clouds: 15, predicted: 8.2, actual: 8.1, efficiency: 98 },
  { time: "11:00", temp: 26, clouds: 10, predicted: 9.5, actual: 9.3, efficiency: 97 },
  { time: "12:00", temp: 28, clouds: 5, predicted: 10.2, actual: 10.4, efficiency: 102 },
  { time: "13:00", temp: 29, clouds: 8, predicted: 9.8, actual: null, efficiency: null },
  { time: "14:00", temp: 28, clouds: 12, predicted: 9.2, actual: null, efficiency: null },
  { time: "15:00", temp: 27, clouds: 18, predicted: 8.1, actual: null, efficiency: null },
  { time: "16:00", temp: 25, clouds: 25, predicted: 6.9, actual: null, efficiency: null },
  { time: "17:00", temp: 23, clouds: 30, predicted: 4.2, actual: null, efficiency: null },
  { time: "18:00", temp: 21, clouds: 35, predicted: 1.8, actual: null, efficiency: null },
]

const weeklyForecast = [
  {
    day: "Today",
    date: "Dec 15",
    condition: "Partly Cloudy",
    high: 29,
    low: 18,
    predicted: 68.5,
    confidence: 95,
    icon: "partly-cloudy",
  },
  {
    day: "Tomorrow",
    date: "Dec 16",
    condition: "Sunny",
    high: 31,
    low: 19,
    predicted: 78.2,
    confidence: 92,
    icon: "sunny",
  },
  {
    day: "Wednesday",
    date: "Dec 17",
    condition: "Mostly Sunny",
    high: 30,
    low: 20,
    predicted: 74.8,
    confidence: 88,
    icon: "mostly-sunny",
  },
  {
    day: "Thursday",
    date: "Dec 18",
    condition: "Cloudy",
    high: 26,
    low: 17,
    predicted: 45.3,
    confidence: 85,
    icon: "cloudy",
  },
  {
    day: "Friday",
    date: "Dec 19",
    condition: "Rain",
    high: 23,
    low: 15,
    predicted: 22.1,
    confidence: 90,
    icon: "rainy",
  },
  {
    day: "Saturday",
    date: "Dec 20",
    condition: "Partly Cloudy",
    high: 27,
    low: 18,
    predicted: 58.7,
    confidence: 82,
    icon: "partly-cloudy",
  },
  {
    day: "Sunday",
    date: "Dec 21",
    condition: "Sunny",
    high: 32,
    low: 21,
    predicted: 82.4,
    confidence: 94,
    icon: "sunny",
  },
]

const optimizationTips = [
  {
    type: "high-priority",
    title: "Peak Generation Expected",
    description: "Tomorrow 12:00-14:00 will have optimal conditions. Consider running energy-intensive appliances.",
    action: "Schedule Tasks",
    icon: Sun,
  },
  {
    type: "medium-priority",
    title: "Battery Charging Opportunity",
    description: "Excess generation predicted this afternoon. Ensure battery storage is ready.",
    action: "Check Battery",
    icon: Battery,
  },
  {
    type: "low-priority",
    title: "Reduced Output Thursday",
    description: "Cloudy conditions expected. Consider reducing non-essential energy usage.",
    action: "Plan Ahead",
    icon: Cloud,
  },
]

const modelAccuracy = [
  { period: "Last 7 days", accuracy: 94.2, predictions: 168, correct: 158 },
  { period: "Last 30 days", accuracy: 91.8, predictions: 720, correct: 661 },
  { period: "Last 90 days", accuracy: 89.5, predictions: 2160, correct: 1933 },
]

function WeatherIcon({ condition, className }: { condition: string; className?: string }) {
  const iconMap = {
    sunny: Sun,
    "mostly-sunny": Sun,
    "partly-cloudy": Cloud,
    cloudy: Cloud,
    rainy: CloudRain,
  }
  const Icon = iconMap[condition as keyof typeof iconMap] || Sun
  return <Icon className={className} />
}

export default function ForecastingPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Solar Energy Forecasting</h1>
              <p className="text-muted-foreground">AI-powered predictions for optimal energy management</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue="current">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">San Francisco, CA</SelectItem>
                  <SelectItem value="la">Los Angeles, CA</SelectItem>
                  <SelectItem value="phoenix">Phoenix, AZ</SelectItem>
                  <SelectItem value="denver">Denver, CO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Current Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Generation</CardTitle>
              <Sun className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">8.4 kW</div>
              <p className="text-xs text-muted-foreground">82% of capacity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Forecast</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">68.5 kWh</div>
              <p className="text-xs text-muted-foreground">95% confidence</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weather Conditions</CardTitle>
              <WeatherIcon condition="partly-cloudy" className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
              <p className="text-xs text-muted-foreground">{currentWeather.condition}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">94.2%</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hourly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="accuracy">Model Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Hourly Generation Forecast</CardTitle>
                    <CardDescription>Predicted vs actual solar power generation today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={hourlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Area
                          yAxisId="right"
                          type="monotone"
                          dataKey="clouds"
                          stroke="hsl(var(--muted-foreground))"
                          fill="hsl(var(--muted))"
                          fillOpacity={0.3}
                          name="Cloud Cover (%)"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="predicted"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Predicted (kW)"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="actual"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={2}
                          name="Actual (kW)"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-chart-5" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-semibold">{currentWeather.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Cloud className="h-4 w-4 mr-2 text-chart-2" />
                        <span className="text-sm">Cloud Cover</span>
                      </div>
                      <span className="font-semibold">{currentWeather.cloudCover}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-chart-1" />
                        <span className="text-sm">Wind Speed</span>
                      </div>
                      <span className="font-semibold">{currentWeather.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-chart-3" />
                        <span className="text-sm">Visibility</span>
                      </div>
                      <span className="font-semibold">{currentWeather.visibility} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-chart-4" />
                        <span className="text-sm">UV Index</span>
                      </div>
                      <span className="font-semibold">{currentWeather.uvIndex}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generation Efficiency</CardTitle>
                    <CardDescription>Current vs predicted performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Morning Performance</span>
                          <span>97%</span>
                        </div>
                        <Progress value={97} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Peak Performance</span>
                          <span>102%</span>
                        </div>
                        <Progress value={100} />
                      </div>
                      <div className="text-center pt-4">
                        <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Exceeding Expectations
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
                <CardDescription>Weather conditions and predicted solar generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyForecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center min-w-[80px]">
                          <div className="font-semibold">{day.day}</div>
                          <div className="text-sm text-muted-foreground">{day.date}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <WeatherIcon condition={day.icon} className="h-8 w-8 text-chart-2" />
                          <div>
                            <div className="font-medium">{day.condition}</div>
                            <div className="text-sm text-muted-foreground">
                              {day.high}°/{day.low}°C
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-chart-4">{day.predicted} kWh</div>
                        <div className="text-sm text-muted-foreground">{day.confidence}% confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Generation Trend</CardTitle>
                <CardDescription>Predicted energy output for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="hsl(var(--chart-4))" name="Predicted Generation (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Smart Recommendations</CardTitle>
                    <CardDescription>AI-powered suggestions to optimize your energy usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {optimizationTips.map((tip, index) => {
                      const Icon = tip.icon
                      return (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <div
                            className={`p-2 rounded-lg ${
                              tip.type === "high-priority"
                                ? "bg-chart-3/10"
                                : tip.type === "medium-priority"
                                  ? "bg-chart-4/10"
                                  : "bg-chart-2/10"
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 ${
                                tip.type === "high-priority"
                                  ? "text-chart-3"
                                  : tip.type === "medium-priority"
                                    ? "text-chart-4"
                                    : "text-chart-2"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                            <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                              {tip.action}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Storage Optimization</CardTitle>
                    <CardDescription>Battery charging and usage recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Battery Level</span>
                      <span className="text-2xl font-bold text-chart-3">78%</span>
                    </div>
                    <Progress value={78} />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Optimal charging window:</span>
                        <span className="font-medium">11:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected full charge:</span>
                        <span className="font-medium">14:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recommended discharge:</span>
                        <span className="font-medium">18:00 - 22:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Peak Usage Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-chart-5" />
                      <span>High demand expected 18:00-20:00</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                      <span>Excess generation 12:00-14:00</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-chart-2" />
                      <span>Optimal appliance runtime: 13:00</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>Forecasting accuracy over different time periods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modelAccuracy.map((period, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{period.period}</span>
                        <span className="text-lg font-bold text-chart-3">{period.accuracy}%</span>
                      </div>
                      <Progress value={period.accuracy} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{period.correct} correct predictions</span>
                        <span>{period.predictions} total predictions</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prediction Confidence</CardTitle>
                  <CardDescription>How confident our AI model is in its forecasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-chart-1 mb-2">95%</div>
                      <p className="text-sm text-muted-foreground">Average confidence score</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Short-term (1-6 hours)</span>
                        <span className="font-semibold text-chart-3">98%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medium-term (1-3 days)</span>
                        <span className="font-semibold text-chart-4">92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Long-term (4-7 days)</span>
                        <span className="font-semibold text-chart-2">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Model Improvements</CardTitle>
                <CardDescription>Recent updates and enhancements to our forecasting AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Enhanced Weather Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Added micro-climate data for improved local accuracy
                      </p>
                      <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Machine Learning Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Improved neural network architecture for better predictions
                      </p>
                      <span className="text-xs text-muted-foreground">Updated 1 week ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Historical Data Expansion</h4>
                      <p className="text-sm text-muted-foreground">
                        Added 5 years of historical weather patterns for training
                      </p>
                      <span className="text-xs text-muted-foreground">Updated 2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
