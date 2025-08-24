import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, Users, TrendingUp, DollarSign, Zap, Leaf } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 bg-gradient-to-br from-background to-muted overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 248, 240, 0.9), rgba(255, 245, 230, 0.9)), url('/solar-panels-hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 solar-panel-bg opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Power Your Future with
              <span className="text-accent block">Solar Energy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our comprehensive solar platform for real-time monitoring, community sharing, energy forecasting, and
              crowdfunding sustainable projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/monitoring">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Sun className="mr-2 h-5 w-5" />
                  Start Monitoring
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 250, 245, 0.95), rgba(255, 248, 240, 0.95)), url('/solar-farm-background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Solar Energy Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to harness, share, and optimize solar energy in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Track your solar power generation, consumption, and efficiency in real-time with detailed analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/monitoring">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle>Community Sharing</CardTitle>
                <CardDescription>
                  Connect with neighbors to share solar resources and build a sustainable energy network.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/community">
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Network
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>Energy Forecasting</CardTitle>
                <CardDescription>
                  AI-powered predictions help optimize your energy usage and storage based on weather patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/forecasting">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Forecasts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle>Crowdfunding Platform</CardTitle>
                <CardDescription>
                  Fund and support solar projects in schools, clinics, and communities worldwide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/crowdfunding">
                  <Button variant="outline" className="w-full bg-transparent">
                    Browse Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Advanced insights and recommendations to maximize your solar energy efficiency and savings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-chart-5" />
                </div>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>
                  Track your carbon footprint reduction and contribution to a sustainable future.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  View Impact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 solar-panel-bg opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users already benefiting from our comprehensive solar platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/monitoring">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </Link>
            <Link href="/learn">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
