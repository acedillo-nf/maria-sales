"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, MessageSquare, Settings, User, Zap } from "lucide-react"

export function SidebarDashboardComponent() {
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out ${
        isMinimized ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          {!isMinimized && <h1 className="text-xl font-bold">Dashboard</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMinimize}
            aria-label={isMinimized ? "Expand dashboard" : "Collapse dashboard"}
            className={isMinimized ? "mx-auto" : ""}
          >
            {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-6">
            <DashboardSection
              icon={<User className="h-5 w-5" />}
              title="Account"
              isMinimized={isMinimized}
            >
              <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
            </DashboardSection>

            <DashboardSection
              icon={<MessageSquare className="h-5 w-5" />}
              title="Conversations"
              isMinimized={isMinimized}
            >
              <ul className="space-y-2">
                {["Team Chat", "Project Discussion", "General"].map((chat, index) => (
                  <li key={index} className="text-sm">{chat}</li>
                ))}
              </ul>
            </DashboardSection>

            <DashboardSection
              icon={<Settings className="h-5 w-5" />}
              title="Settings"
              isMinimized={isMinimized}
            >
              <p className="text-sm text-muted-foreground">Customize your dashboard experience.</p>
            </DashboardSection>

            <DashboardSection
              icon={<Zap className="h-5 w-5" />}
              title="Integrations"
              isMinimized={isMinimized}
            >
              <ul className="space-y-2">
                {["Slack", "GitHub", "Trello"].map((integration, index) => (
                  <li key={index} className="text-sm">{integration}</li>
                ))}
              </ul>
            </DashboardSection>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function DashboardSection({ icon, title, children, isMinimized }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        {!isMinimized && <h2 className="text-lg font-semibold">{title}</h2>}
      </div>
      {!isMinimized && children}
    </section>
  )
}