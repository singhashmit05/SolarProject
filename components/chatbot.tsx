"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Lightbulb,
  HelpCircle,
  Calculator,
  BookOpen,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion"
}

const quickSuggestions = [
  { text: "How do solar panels work?", icon: HelpCircle },
  { text: "Calculate my solar savings", icon: Calculator },
  { text: "Solar installation process", icon: Lightbulb },
  { text: "Maintenance tips", icon: BookOpen },
]

const solarKnowledgeBase = {
  "how do solar panels work": {
    response:
      "Solar panels work through the photovoltaic effect. When sunlight hits the silicon cells in a solar panel, it knocks electrons loose, creating an electric current. This DC electricity is then converted to AC by an inverter for use in your home. The process is completely silent and produces no emissions!",
    followUp: ["What are the main components of a solar system?", "How efficient are modern solar panels?"],
  },
  "solar panel cost": {
    response:
      "Solar panel costs vary by system size and location. On average, residential systems cost $15,000-$25,000 before incentives. However, federal tax credits (30%), state rebates, and financing options can significantly reduce upfront costs. Most systems pay for themselves within 6-10 years through energy savings.",
    followUp: ["What financing options are available?", "How do I calculate ROI?"],
  },
  "solar installation": {
    response:
      "Solar installation typically takes 6-10 weeks from contract to activation: 1) Site assessment (1-2 days), 2) System design (3-5 days), 3) Permits (2-4 weeks), 4) Equipment procurement (1-2 weeks), 5) Installation (1-3 days), 6) Inspection & connection (1-2 weeks).",
    followUp: ["Do I need permits for solar?", "Can I install solar myself?"],
  },
  "solar maintenance": {
    response:
      "Solar panels require minimal maintenance! Clean panels 2-4 times per year, check for debris or shading, monitor system performance through your app, and schedule professional inspections every 3-5 years. Most systems come with 20-25 year warranties.",
    followUp: ["How do I clean solar panels?", "What can reduce solar efficiency?"],
  },
  "solar savings": {
    response:
      "Solar savings depend on your location, energy usage, and system size. Most homeowners save 70-90% on electricity bills. In sunny areas, a typical 6kW system can save $1,000-$1,500 annually. Use our calculator in the forecasting section for personalized estimates!",
    followUp: ["How is solar savings calculated?", "What affects solar production?"],
  },
  "net metering": {
    response:
      "Net metering allows you to sell excess solar energy back to the grid for credits. When your panels produce more than you use, the excess goes to the grid. At night or cloudy days, you use these credits. It's like using the grid as a giant battery!",
    followUp: ["Is net metering available in my area?", "How are net metering credits calculated?"],
  },
  "battery storage": {
    response:
      "Solar batteries store excess energy for use when the sun isn't shining. Popular options include lithium-ion batteries (10-15 year lifespan) and newer LFP batteries (15-20 years). Battery systems provide backup power during outages and can increase energy independence to 80-90%.",
    followUp: ["Do I need battery storage?", "How long do solar batteries last?"],
  },
}

function findBestMatch(query: string): string | null {
  const normalizedQuery = query.toLowerCase()
  const keywords = Object.keys(solarKnowledgeBase)

  for (const keyword of keywords) {
    if (normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery.split(" ")[0])) {
      return keyword
    }
  }
  return null
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm your solar energy assistant. I can help you learn about solar panels, installation, costs, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const bestMatch = findBestMatch(content)
        let botResponse: Message

        if (bestMatch && solarKnowledgeBase[bestMatch as keyof typeof solarKnowledgeBase]) {
          const knowledge = solarKnowledgeBase[bestMatch as keyof typeof solarKnowledgeBase]
          botResponse = {
            id: (Date.now() + 1).toString(),
            content: knowledge.response,
            sender: "bot",
            timestamp: new Date(),
          }
        } else {
          // Default response for unmatched queries
          botResponse = {
            id: (Date.now() + 1).toString(),
            content:
              "I'd be happy to help you with that! While I specialize in solar energy topics, you might find detailed information in our Learning Center. You can also connect with our community experts for personalized advice. Is there a specific solar topic I can help you with?",
            sender: "bot",
            timestamp: new Date(),
          }
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow bg-accent hover:bg-accent/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn("w-96 shadow-2xl transition-all duration-300", isMinimized ? "h-16" : "h-[500px]")}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-accent text-accent-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-foreground/10 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm">Solar Assistant</CardTitle>
              <p className="text-xs opacity-80">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 hover:bg-accent-foreground/10"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-accent-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(500px-4rem)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.sender === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {message.content}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-accent-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground px-2">Quick suggestions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickSuggestions.map((suggestion, index) => {
                        const Icon = suggestion.icon
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion.text)}
                            className="justify-start h-auto p-2 text-left bg-transparent"
                          >
                            <Icon className="h-3 w-3 mr-2 flex-shrink-0" />
                            <span className="text-xs">{suggestion.text}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about solar energy..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Powered by AI • Solar energy expertise</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
