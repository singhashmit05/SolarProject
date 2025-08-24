"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MapPin,
  Zap,
  Share2,
  TrendingUp,
  MessageCircle,
  Heart,
  Search,
  Plus,
  Battery,
  Sun,
  Phone,
  Home,
  Star,
  Wallet,
  ArrowUpDown,
  ShoppingCart,
  Info,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

const communityMembers = [
  {
    id: 1,
    name: "Ayushi Raj",
    avatar: "/diverse-woman-portrait.png",
    location: "2.3 km away",
    address: "1247 Oak Street, Apt 3B",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    solarCapacity: "8.5 kW",
    sharing: "Available",
    sharedToday: "12.4 kWh",
    reputation: 4.8,
    reviews: 47,
    joinedDate: "2023-01-15",
    pricePerKwh: "$0.12",
    availableCredits: 156,
  },
  {
    id: 2,
    name: "Ashmit Balajee",
    avatar: "/thoughtful-man.png",
    location: "1.8 km away",
    address: "892 Pine Avenue, House 15",
    phone: "+1 (555) 987-6543",
    email: "mike.chen@email.com",
    solarCapacity: "6.2 kW",
    sharing: "Requesting",
    neededToday: "8.7 kWh",
    reputation: 4.9,
    reviews: 62,
    joinedDate: "2023-03-22",
    pricePerKwh: "$0.11",
    availableCredits: 89,
  },
  {
    id: 3,
    name: "Anjali Singh",
    avatar: "/diverse-woman-portrait.png",
    location: "3.1 km away",
    address: "456 Maple Drive, Unit 7",
    phone: "+1 (555) 456-7890",
    email: "emma.davis@email.com",
    solarCapacity: "10.1 kW",
    sharing: "Available",
    sharedToday: "18.9 kWh",
    reputation: 4.7,
    reviews: 38,
    joinedDate: "2022-11-08",
    pricePerKwh: "$0.13",
    availableCredits: 234,
  },
  {
    id: 4,
    name: "Anoop Kumar",
    avatar: "/thoughtful-man.png",
    location: "0.9 km away",
    address: "789 Cedar Lane, House 22",
    phone: "+1 (555) 321-0987",
    email: "david.w@email.com",
    solarCapacity: "5.8 kW",
    sharing: "Offline",
    sharedToday: "0 kWh",
    reputation: 4.6,
    reviews: 29,
    joinedDate: "2023-05-10",
    pricePerKwh: "$0.10",
    availableCredits: 45,
  },
]

// Mock data for community sharing
const communityProjects = [
  {
    id: 1,
    title: "School Solar Initiative",
    description: "Installing solar panels at Lincoln Elementary School",
    progress: 78,
    participants: 24,
    energyGoal: "50 kW",
    status: "Active",
  },
  {
    id: 2,
    title: "Community Battery Storage",
    description: "Shared battery system for the neighborhood",
    progress: 45,
    participants: 18,
    energyGoal: "100 kWh",
    status: "Funding",
  },
  {
    id: 3,
    title: "Senior Center Power",
    description: "Providing clean energy to the local senior center",
    progress: 92,
    participants: 31,
    energyGoal: "25 kW",
    status: "Completing",
  },
]

const sharingData = [
  { name: "Shared", value: 45, color: "hsl(var(--chart-3))" },
  { name: "Used", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Stored", value: 20, color: "hsl(var(--chart-4))" },
]

const weeklySharing = [
  { day: "Mon", shared: 28, received: 15 },
  { day: "Tue", shared: 35, received: 22 },
  { day: "Wed", shared: 42, received: 18 },
  { day: "Thu", shared: 38, received: 25 },
  { day: "Fri", shared: 45, received: 20 },
  { day: "Sat", shared: 52, received: 12 },
  { day: "Sun", shared: 48, received: 16 },
]

const marketplaceListings = [
  { id: 1, seller: "Ayushi Raj", amount: 25, price: 0.12, rating: 4.8, timeLeft: "2h 15m" },
  { id: 2, seller: "Anjali Singh", amount: 40, price: 0.13, rating: 4.7, timeLeft: "4h 32m" },
  { id: 3, seller: "Ashmit Balajee", amount: 15, price: 0.11, rating: 4.9, timeLeft: "1h 45m" },
  { id: 4, seller: "Anoop Kumar", amount: 30, price: 0.1, rating: 4.6, timeLeft: "6h 12m" },
]

const priceHistory = [
  { time: "00:00", price: 0.1 },
  { time: "04:00", price: 0.11 },
  { time: "08:00", price: 0.13 },
  { time: "12:00", price: 0.15 },
  { time: "16:00", price: 0.14 },
  { time: "20:00", price: 0.12 },
  { time: "24:00", price: 0.11 },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Solar Network</h1>
          <p className="text-muted-foreground">Connect, share, and build a sustainable energy future together</p>
        </div>

        <Card className="mb-8 border-l-4 border-l-chart-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-lg">How Solar Sharing Works</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-chart-3">Sharing Process:</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-3 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    User A installs solar panels and registers their generation capacity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-3 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    User B subscribes to the community solar network as a consumer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-3 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    Solar power generated by User A is converted to solar credits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-3 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    User B consumes electricity and their solar credits get deducted
                  </li>
                </ol>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-chart-2">Trading & Billing:</h4>
                <ol className="space-y-2 text-sm" start={5}>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-2 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    User A sells excess credits on the marketplace
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-2 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      6
                    </span>
                    User B buys credits as needed from available sellers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-chart-2 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      7
                    </span>
                    Platform bills each user based on net usage and trades at current price
                  </li>
                </ol>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Pricing is decided by individual owners. Connect directly to negotiate rates
                    and terms.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Shared Today</CardTitle>
              <Share2 className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847 kWh</div>
              <p className="text-xs text-muted-foreground">Across 156 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254 kg</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Efficiency</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Optimal distribution</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="sharing">My Sharing</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search community members..." className="pl-10" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Invite Neighbors
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Members</CardTitle>
                    <CardDescription>Solar community members in your area</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {communityMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {member.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Sun className="h-3 w-3 mr-1" />
                              {member.solarCapacity} capacity
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                              {member.reputation} ({member.reviews} reviews)
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              member.sharing === "Available"
                                ? "default"
                                : member.sharing === "Requesting"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {member.sharing}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {member.sharedToday
                              ? `Shared: ${member.sharedToday}`
                              : member.neededToday
                                ? `Needs: ${member.neededToday}`
                                : "Offline"}
                          </p>
                          <p className="text-sm font-medium text-chart-3 mt-1">{member.pricePerKwh}/kWh</p>
                          <div className="flex items-center mt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  Connect
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Connect with this community member to start sharing solar energy
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Address</Label>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Home className="h-4 w-4" />
                                        {member.address}
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Phone</Label>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        {member.phone}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Solar Details</Label>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                      <p>Capacity: {member.solarCapacity}</p>
                                      <p>Rate: {member.pricePerKwh}/kWh</p>
                                      <p>Available Credits: {member.availableCredits} kWh</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Reputation</Label>
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < Math.floor(member.reputation)
                                                ? "text-yellow-500 fill-current"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-muted-foreground">
                                        {member.reputation} ({member.reviews} reviews)
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button className="flex-1">
                                      <Phone className="mr-2 h-4 w-4" />
                                      Call
                                    </Button>
                                    <Button variant="outline" className="flex-1 bg-transparent">
                                      <MessageCircle className="mr-2 h-4 w-4" />
                                      Message
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost" className="ml-2">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Distribution</CardTitle>
                    <CardDescription>How your energy is being used</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={sharingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sharingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-4">
                      {sharingData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                            {item.name}
                          </div>
                          <span>{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full justify-start">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Excess Energy
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Share Your Excess Energy</DialogTitle>
                          <DialogDescription>List your available solar energy for the community</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="amount">Amount (kWh)</Label>
                            <Input id="amount" placeholder="Enter amount to share" />
                          </div>
                          <div>
                            <Label htmlFor="price">Price per kWh ($)</Label>
                            <Input id="price" placeholder="0.12" />
                          </div>
                          <div>
                            <Label htmlFor="duration">Available Duration</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1h">1 hour</SelectItem>
                                <SelectItem value="4h">4 hours</SelectItem>
                                <SelectItem value="8h">8 hours</SelectItem>
                                <SelectItem value="24h">24 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">List Energy for Sharing</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Battery className="mr-2 h-4 w-4" />
                          Request Energy
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Energy from Community</DialogTitle>
                          <DialogDescription>Request solar energy from available community members</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="needed">Amount Needed (kWh)</Label>
                            <Input id="needed" placeholder="Enter amount needed" />
                          </div>
                          <div>
                            <Label htmlFor="maxPrice">Maximum Price per kWh ($)</Label>
                            <Input id="maxPrice" placeholder="0.15" />
                          </div>
                          <div>
                            <Label htmlFor="urgency">Urgency</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low - Within 24 hours</SelectItem>
                                <SelectItem value="medium">Medium - Within 4 hours</SelectItem>
                                <SelectItem value="high">High - Within 1 hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Submit Energy Request</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Users className="mr-2 h-4 w-4" />
                          Join Local Group
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join a Local Solar Group</DialogTitle>
                          <DialogDescription>Connect with neighbors to form solar sharing groups</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="groupName">Group Name</Label>
                            <Input id="groupName" placeholder="e.g., Oak Street Solar Circle" />
                          </div>
                          <div>
                            <Label htmlFor="description">Group Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Describe your group's goals and sharing preferences"
                            />
                          </div>
                          <div>
                            <Label htmlFor="radius">Coverage Radius</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select radius" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.5">0.5 km</SelectItem>
                                <SelectItem value="1">1 km</SelectItem>
                                <SelectItem value="2">2 km</SelectItem>
                                <SelectItem value="5">5 km</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Create/Join Group</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sharing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Sharing Activity</CardTitle>
                  <CardDescription>Energy shared vs received this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklySharing}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="shared" fill="hsl(var(--chart-3))" name="Shared (kWh)" />
                      <Bar dataKey="received" fill="hsl(var(--chart-2))" name="Received (kWh)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Sharing Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Shared This Month</span>
                      <span className="text-2xl font-bold text-chart-3">847 kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Received This Month</span>
                      <span className="text-2xl font-bold text-chart-2">234 kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Community Reputation</span>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-chart-4 mr-2">4.9</span>
                        <Heart className="h-4 w-4 text-chart-5 fill-current" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Carbon Offset</span>
                      <span className="text-2xl font-bold text-chart-1">423 kg CO₂</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Shared with Sarah J.</span>
                      <span className="text-chart-3">+12.4 kWh</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Received from Mike C.</span>
                      <span className="text-chart-2">-8.7 kWh</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Shared with Emma D.</span>
                      <span className="text-chart-3">+15.2 kWh</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      View All Transactions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Community Projects</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Propose Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge
                        variant={
                          project.status === "Active"
                            ? "default"
                            : project.status === "Funding"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Participants</span>
                      <span>{project.participants} members</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Energy Goal</span>
                      <span>{project.energyGoal}</span>
                    </div>
                    <Button className="w-full">
                      {project.status === "Funding" ? "Support Project" : "View Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Marketplace</CardTitle>
                    <CardDescription>Buy and sell excess solar energy with your community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketplaceListings.map((listing) => (
                        <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-semibold">{listing.seller}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                                {listing.rating}
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">{listing.amount} kWh</div>
                            <div className="text-sm text-muted-foreground">Available</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-chart-3">${listing.price}/kWh</div>
                            <div className="text-sm text-muted-foreground">Expires in {listing.timeLeft}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Buy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Price History</CardTitle>
                    <CardDescription>Energy credit prices over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Price per kWh"]} />
                        <Line type="monotone" dataKey="price" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Your Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-chart-3">$127.45</div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Solar Credits</span>
                        <span className="font-medium">234 kWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending Sales</span>
                        <span className="font-medium">$45.20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>This Month Earnings</span>
                        <span className="font-medium text-chart-3">$89.30</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Funds
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Withdraw
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trading Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Trades</span>
                      <span className="text-lg font-bold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-lg font-bold text-chart-3">96.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Avg. Price</span>
                      <span className="text-lg font-bold">$0.12/kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Your Rating</span>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-chart-4 mr-2">4.9</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Trade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Share2 className="mr-2 h-4 w-4" />
                      Sell Energy Credits
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Energy Credits
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      View My Orders
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
