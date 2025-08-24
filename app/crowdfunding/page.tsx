"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MapPin,
  Users,
  Target,
  Zap,
  School,
  Building2,
  Home,
  Search,
  Share2,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
  Leaf,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import Link from "next/link"

// Mock crowdfunding data
const featuredProjects = [
  {
    id: 1,
    title: "Solar Power for Rural School in Kenya",
    description: "Bringing clean energy and reliable electricity to 300 students in rural Kenya",
    location: "Nakuru, Kenya",
    category: "Education",
    target: 25000,
    raised: 18750,
    backers: 156,
    daysLeft: 12,
    image: "/school-solar-project.jpg",
    impact: "300 students, 15 teachers",
    organization: "Solar Education Initiative",
    featured: true,
  },
  {
    id: 2,
    title: "Community Health Clinic Solar Installation",
    description: "Powering a health clinic serving 5,000 people in rural Guatemala",
    location: "Quetzaltenango, Guatemala",
    category: "Healthcare",
    target: 35000,
    raised: 28900,
    backers: 203,
    daysLeft: 8,
    image: "/clinic-solar-project.jpg",
    impact: "5,000 people served",
    organization: "Health Without Borders",
    featured: true,
  },
  {
    id: 3,
    title: "Village Water Pump Solar System",
    description: "Solar-powered water pumping system for clean water access",
    location: "Rajasthan, India",
    category: "Water",
    target: 15000,
    raised: 12300,
    backers: 89,
    daysLeft: 18,
    image: "/water-pump-project.jpg",
    impact: "800 villagers",
    organization: "Clean Water Initiative",
    featured: false,
  },
]

const allProjects = [
  ...featuredProjects,
  {
    id: 4,
    title: "Solar Lights for Remote Village",
    description: "Providing solar lighting to 50 households in remote mountain village",
    location: "Nepal",
    category: "Community",
    target: 8000,
    raised: 6400,
    backers: 45,
    daysLeft: 25,
    image: "/village-lights-project.jpg",
    impact: "50 families",
    organization: "Mountain Light Project",
    featured: false,
  },
  {
    id: 5,
    title: "School Computer Lab Solar Power",
    description: "Enabling digital education with solar-powered computer lab",
    location: "Ghana",
    category: "Education",
    target: 20000,
    raised: 5600,
    backers: 32,
    daysLeft: 35,
    image: "/computer-lab-project.jpg",
    impact: "200 students",
    organization: "Digital Education Africa",
    featured: false,
  },
]

const impactStats = [
  { category: "People Impacted", value: 15420, icon: Users, color: "hsl(var(--chart-1))" },
  { category: "CO₂ Reduced", value: 2847, unit: "tons", icon: Leaf, color: "hsl(var(--chart-3))" },
  { category: "Projects Funded", value: 89, icon: CheckCircle, color: "hsl(var(--chart-4))" },
  { category: "Communities Served", value: 34, icon: Globe, color: "hsl(var(--chart-2))" },
]

const fundingProgress = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 58000 },
  { month: "Jun", amount: 67000 },
]

const categoryData = [
  { name: "Education", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Healthcare", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Community", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Water", value: 10, color: "hsl(var(--chart-4))" },
]

function ProjectCard({ project, featured = false }: { project: any; featured?: boolean }) {
  const progressPercentage = (project.raised / project.target) * 100
  const categoryIcons = {
    Education: School,
    Healthcare: Building2,
    Community: Home,
    Water: Zap,
  }
  const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons] || Building2

  return (
    <Card className={`hover:shadow-lg transition-shadow ${featured ? "border-accent" : ""}`}>
      <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
        <img
          src={project.image || `/placeholder.svg?height=200&width=400&query=${project.title}`}
          alt={project.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            <CategoryIcon className="h-3 w-3 mr-1" />
            {project.category}
          </Badge>
          {featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
        </div>
        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          {project.location}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">${project.raised.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${project.target.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} />
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{project.backers} backers</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{project.daysLeft} days left</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <strong>Impact:</strong> {project.impact}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">Back Project</Button>
          <Button variant="outline" size="icon" className="bg-transparent">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CrowdfundingPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Solar Crowdfunding Platform</h1>
          <p className="text-muted-foreground">Fund solar projects and create sustainable impact worldwide</p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.category}</CardTitle>
                  <Icon className="h-4 w-4" style={{ color: stat.color }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>
                    {stat.value.toLocaleString()}
                    {stat.unit && ` ${stat.unit}`}
                  </div>
                  <p className="text-xs text-muted-foreground">Total platform impact</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="create">Create Project</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="funded">Most Funded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="bg-transparent">
                Load More Projects
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Hand-picked projects making the biggest impact</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Why These Projects Are Featured</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Verified Organizations</h4>
                    <p className="text-sm text-muted-foreground">
                      All featured projects are from verified non-profit organizations with proven track records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-chart-4 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">High Impact Potential</h4>
                    <p className="text-sm text-muted-foreground">
                      These projects will directly benefit hundreds or thousands of people in underserved communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-chart-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Strong Community Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Projects with active community engagement and local government support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Funding Trends</CardTitle>
                  <CardDescription>Total amount funded over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fundingProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="hsl(var(--chart-1))" name="Amount Funded ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projects by Category</CardTitle>
                  <CardDescription>Distribution of funded projects across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryData.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span>
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-chart-3 pl-4">
                      <h4 className="font-semibold text-sm">Solar School in Tanzania</h4>
                      <p className="text-sm text-muted-foreground">
                        Now serving 500 students with reliable electricity for the first time.
                      </p>
                    </div>
                    <div className="border-l-4 border-chart-4 pl-4">
                      <h4 className="font-semibold text-sm">Health Clinic in Peru</h4>
                      <p className="text-sm text-muted-foreground">
                        24/7 power enables life-saving medical equipment operation.
                      </p>
                    </div>
                    <div className="border-l-4 border-chart-2 pl-4">
                      <h4 className="font-semibold text-sm">Village Water System</h4>
                      <p className="text-sm text-muted-foreground">
                        Clean water access for 1,200 people in rural Bangladesh.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-chart-3 mb-1">2,847</div>
                    <p className="text-sm text-muted-foreground">Tons of CO₂ reduced annually</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-chart-4 mb-1">1.2M</div>
                    <p className="text-sm text-muted-foreground">kWh of clean energy generated</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-chart-2 mb-1">450</div>
                    <p className="text-sm text-muted-foreground">Solar installations completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Reach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Schools Powered</span>
                    <span className="font-bold text-chart-1">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Health Clinics</span>
                    <span className="font-bold text-chart-2">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Communities</span>
                    <span className="font-bold text-chart-3">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Countries</span>
                    <span className="font-bold text-chart-4">23</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a Solar Project</CardTitle>
                <CardDescription>
                  Submit your solar project proposal to our community of backers and make a lasting impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Requirements</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Verified Organization</h4>
                          <p className="text-sm text-muted-foreground">
                            Must be a registered non-profit or community organization
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Clear Impact Goals</h4>
                          <p className="text-sm text-muted-foreground">
                            Specific metrics on how many people will benefit
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Technical Feasibility</h4>
                          <p className="text-sm text-muted-foreground">
                            Detailed technical plan and local installation support
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Community Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Letters of support from local community leaders
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Application Process</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-chart-1 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <span className="text-sm">Submit initial application</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-chart-2 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span className="text-sm">Technical review (5-7 days)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-chart-3 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <span className="text-sm">Community verification</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-chart-4 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <span className="text-sm">Project goes live</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t">
                  <Button size="lg" className="mr-4">
                    Start Application
                  </Button>
                  <Button variant="outline" size="lg" className="bg-transparent">
                    Download Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support & Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/learn" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Project Planning Guide
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    Connect with Mentors
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Creator Community
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                    <p>Projects with videos raise 3x more funding</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                    <p>Regular updates increase backer engagement by 40%</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                    <p>Clear impact metrics help build trust</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                    <p>Social media promotion is crucial for success</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
