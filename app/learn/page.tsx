"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Download,
  Search,
  Sun,
  Zap,
  Battery,
  Home,
  DollarSign,
  Leaf,
  Settings,
  Calculator,
  ChevronRight,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react"

// Learning content data
const learningPaths = [
  {
    id: 1,
    title: "Solar Energy Basics",
    description: "Start your solar journey with fundamental concepts",
    level: "Beginner",
    duration: "2-3 hours",
    modules: 6,
    progress: 0,
    icon: Sun,
    color: "hsl(var(--chart-4))",
  },
  {
    id: 2,
    title: "Home Solar Installation",
    description: "Complete guide to residential solar systems",
    level: "Intermediate",
    duration: "4-5 hours",
    modules: 8,
    progress: 25,
    icon: Home,
    color: "hsl(var(--chart-2))",
  },
  {
    id: 3,
    title: "Solar System Design",
    description: "Technical aspects of solar system planning",
    level: "Advanced",
    duration: "6-8 hours",
    modules: 12,
    progress: 0,
    icon: Settings,
    color: "hsl(var(--chart-1))",
  },
  {
    id: 4,
    title: "Financial Planning",
    description: "ROI, incentives, and financing options",
    level: "Intermediate",
    duration: "3-4 hours",
    modules: 7,
    progress: 60,
    icon: DollarSign,
    color: "hsl(var(--chart-3))",
  },
]

const quickGuides = [
  {
    title: "How Solar Panels Work",
    description: "Understanding photovoltaic technology",
    readTime: "5 min",
    type: "article",
    icon: FileText,
  },
  {
    title: "Calculating Your Solar Needs",
    description: "Size your system correctly",
    readTime: "8 min",
    type: "calculator",
    icon: Calculator,
  },
  {
    title: "Solar Installation Process",
    description: "Step-by-step installation guide",
    readTime: "12 min",
    type: "video",
    icon: Video,
  },
  {
    title: "Maintenance Best Practices",
    description: "Keep your system running efficiently",
    readTime: "6 min",
    type: "article",
    icon: FileText,
  },
  {
    title: "Solar Incentives & Rebates",
    description: "Maximize your savings",
    readTime: "10 min",
    type: "article",
    icon: FileText,
  },
  {
    title: "Battery Storage Guide",
    description: "Energy storage solutions",
    readTime: "15 min",
    type: "video",
    icon: Video,
  },
]

const faqData = [
  {
    question: "How do solar panels work?",
    answer:
      "Solar panels work through the photovoltaic effect. When sunlight hits the silicon cells in a solar panel, it knocks electrons loose, creating an electric current. This direct current (DC) is then converted to alternating current (AC) by an inverter, which can be used to power your home or fed back into the grid.",
  },
  {
    question: "How much do solar panels cost?",
    answer:
      "The cost of solar panels varies based on system size, location, and installation complexity. On average, residential solar systems cost between $15,000-$25,000 before incentives. However, federal tax credits, state rebates, and financing options can significantly reduce upfront costs. Most systems pay for themselves within 6-10 years.",
  },
  {
    question: "How long do solar panels last?",
    answer:
      "Solar panels are designed to last 25-30 years or more. Most manufacturers offer warranties of 20-25 years, guaranteeing at least 80% of original power output. While panels degrade slightly over time (typically 0.5-0.8% per year), they continue producing electricity well beyond their warranty period.",
  },
  {
    question: "Do solar panels work in cloudy weather?",
    answer:
      "Yes, solar panels still generate electricity on cloudy days, though at reduced efficiency (typically 10-25% of peak output). Modern panels are designed to capture diffused sunlight. Germany, despite its cloudy climate, is one of the world's leading solar energy producers, proving that solar works in various weather conditions.",
  },
  {
    question: "Can I install solar panels myself?",
    answer:
      "While technically possible, DIY solar installation is not recommended for most homeowners. Solar installation involves electrical work, roof modifications, and local permitting requirements. Professional installation ensures safety, proper system design, warranty coverage, and compliance with local codes. Most areas require licensed electricians for grid connections.",
  },
  {
    question: "What happens to excess solar energy?",
    answer:
      "Excess solar energy can be handled in several ways: 1) Net metering allows you to sell excess power back to the grid for credits, 2) Battery storage systems store excess energy for later use, 3) Some systems use excess power for water heating or other applications. The best option depends on your local utility policies and energy needs.",
  },
]

const resources = [
  {
    category: "Technical Guides",
    items: [
      { title: "Solar Panel Specifications Guide", type: "PDF", size: "2.3 MB" },
      { title: "Inverter Selection Manual", type: "PDF", size: "1.8 MB" },
      { title: "Wiring Diagrams Collection", type: "PDF", size: "4.1 MB" },
      { title: "System Sizing Calculator", type: "Excel", size: "0.5 MB" },
    ],
  },
  {
    category: "Installation Resources",
    items: [
      { title: "Safety Checklist", type: "PDF", size: "0.8 MB" },
      { title: "Permit Application Templates", type: "ZIP", size: "1.2 MB" },
      { title: "Installation Video Series", type: "Video", size: "External Link" },
      { title: "Code Compliance Guide", type: "PDF", size: "3.2 MB" },
    ],
  },
  {
    category: "Financial Tools",
    items: [
      { title: "ROI Calculator Spreadsheet", type: "Excel", size: "0.7 MB" },
      { title: "Incentive Database", type: "Web App", size: "External Link" },
      { title: "Financing Options Guide", type: "PDF", size: "1.5 MB" },
      { title: "Tax Credit Forms", type: "PDF", size: "0.9 MB" },
    ],
  },
]

function LearningPathCard({ path }: { path: any }) {
  const Icon = path.icon
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${path.color}20` }}>
              <Icon className="h-6 w-6" style={{ color: path.color }} />
            </div>
            <div>
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <Badge variant="secondary">{path.level}</Badge>
            </div>
          </div>
        </div>
        <CardDescription>{path.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{path.modules} modules</span>
          <span>{path.duration}</span>
        </div>
        {path.progress > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{path.progress}%</span>
            </div>
            <Progress value={path.progress} />
          </div>
        )}
        <Button className="w-full">
          {path.progress > 0 ? "Continue Learning" : "Start Course"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickGuideCard({ guide }: { guide: any }) {
  const Icon = guide.icon
  const typeColors = {
    article: "hsl(var(--chart-2))",
    video: "hsl(var(--chart-1))",
    calculator: "hsl(var(--chart-3))",
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-muted">
            <Icon className="h-5 w-5" style={{ color: typeColors[guide.type as keyof typeof typeColors] }} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{guide.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {guide.readTime}
              </Badge>
              <span className="text-xs text-muted-foreground capitalize">{guide.type}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Solar Energy Learning Center</h1>
          <p className="text-muted-foreground">
            Comprehensive education on solar power, from basics to advanced installation and maintenance
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search learning materials..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="guides">Quick Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Learning Paths</h2>
              <p className="text-muted-foreground">Structured courses to build your solar energy expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Why Learn About Solar Energy?</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-semibold mb-2">Save Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce electricity bills by 70-90% and increase property value
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Leaf className="h-6 w-6 text-chart-4" />
                  </div>
                  <h3 className="font-semibold mb-2">Help Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce carbon footprint and contribute to clean energy future
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-chart-2" />
                  </div>
                  <h3 className="font-semibold mb-2">Energy Independence</h3>
                  <p className="text-sm text-muted-foreground">Generate your own power and reduce grid dependence</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Quick Guides</h2>
              <p className="text-muted-foreground">Bite-sized learning for specific topics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickGuides.map((guide, index) => (
                <QuickGuideCard key={index} guide={guide} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solar Energy Fundamentals</CardTitle>
                  <CardDescription>Essential concepts everyone should know</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-chart-4 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Photovoltaic Effect</h4>
                        <p className="text-sm text-muted-foreground">How sunlight converts to electricity</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-chart-3 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">System Components</h4>
                        <p className="text-sm text-muted-foreground">Panels, inverters, batteries, and monitoring</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-chart-2 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Grid Connection</h4>
                        <p className="text-sm text-muted-foreground">Net metering and energy storage</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-chart-1 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Performance Factors</h4>
                        <p className="text-sm text-muted-foreground">Location, orientation, and efficiency</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Installation Process</CardTitle>
                  <CardDescription>Step-by-step installation overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Site Assessment</span>
                      <Badge variant="outline">1-2 days</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>System Design</span>
                      <Badge variant="outline">3-5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Permits & Approvals</span>
                      <Badge variant="outline">2-4 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Equipment Procurement</span>
                      <Badge variant="outline">1-2 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Installation</span>
                      <Badge variant="outline">1-3 days</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Inspection & Connection</span>
                      <Badge variant="outline">1-2 weeks</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Total Timeline:</strong> 6-10 weeks from contract to activation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Common questions about solar energy and installation</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Still Have Questions?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Can't find the answer you're looking for? Our community and experts are here to help.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full">Ask the Community</Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Expert
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>System sizing</span>
                    <Badge variant="secondary">127 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Installation costs</span>
                    <Badge variant="secondary">98 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Maintenance</span>
                    <Badge variant="secondary">76 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Incentives</span>
                    <Badge variant="secondary">65 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Battery storage</span>
                    <Badge variant="secondary">54 questions</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Downloadable Resources</h2>
              <p className="text-muted-foreground">Tools, templates, and guides for your solar journey</p>
            </div>

            <div className="space-y-6">
              {resources.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-muted rounded">
                              {item.type === "PDF" && <FileText className="h-4 w-4" />}
                              {item.type === "Excel" && <Calculator className="h-4 w-4" />}
                              {item.type === "Video" && <Video className="h-4 w-4" />}
                              {item.type === "ZIP" && <Download className="h-4 w-4" />}
                              {item.type === "Web App" && <ExternalLink className="h-4 w-4" />}
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {item.type} • {item.size}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="glossary" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Solar Energy Glossary</h2>
              <p className="text-muted-foreground">Key terms and definitions in solar energy</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Photovoltaic (PV)</h4>
                      <p className="text-sm text-muted-foreground">
                        Technology that converts sunlight directly into electricity using semiconductor materials.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Inverter</h4>
                      <p className="text-sm text-muted-foreground">
                        Device that converts DC electricity from solar panels into AC electricity for home use.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Net Metering</h4>
                      <p className="text-sm text-muted-foreground">
                        Billing arrangement allowing solar customers to sell excess electricity back to the grid.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">kWh (Kilowatt-hour)</h4>
                      <p className="text-sm text-muted-foreground">
                        Unit of energy measurement; 1 kWh = 1,000 watts used for one hour.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Solar Irradiance</h4>
                      <p className="text-sm text-muted-foreground">
                        Amount of solar energy received per unit area, typically measured in watts per square meter.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Grid-Tie System</h4>
                      <p className="text-sm text-muted-foreground">
                        Solar system connected to the electrical grid, allowing energy exchange.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Battery Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        System that stores excess solar energy for use when the sun isn't shining.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">MPPT</h4>
                      <p className="text-sm text-muted-foreground">
                        Maximum Power Point Tracking - technology that optimizes power output from solar panels.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Solar Panel Efficiency</h4>
                      <p className="text-sm text-muted-foreground">
                        Percentage of sunlight that a solar panel can convert into usable electricity.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Degradation Rate</h4>
                      <p className="text-sm text-muted-foreground">
                        Annual decrease in solar panel power output, typically 0.5-0.8% per year.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solar System Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Sun className="h-6 w-6 text-chart-4" />
                    </div>
                    <h3 className="font-semibold mb-2">Solar Panels</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert sunlight into DC electricity using photovoltaic cells
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-chart-2" />
                    </div>
                    <h3 className="font-semibold mb-2">Inverter</h3>
                    <p className="text-sm text-muted-foreground">
                      Converts DC electricity to AC for household use and grid connection
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Battery className="h-6 w-6 text-chart-3" />
                    </div>
                    <h3 className="font-semibold mb-2">Battery Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Stores excess energy for use during nighttime or power outages
                    </p>
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
