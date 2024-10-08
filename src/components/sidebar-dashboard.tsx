"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AccountContent } from "@/components/AccountContent"

import { ChevronLeft, ChevronRight, MessageSquare, Settings, User, Zap, Plus } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function SidebarDashboardComponent() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`flex-shrink-0 bg-background border-r border-border transition-all duration-300 ease-in-out ${
          isMinimized ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            {!isMinimized && (
              <Image src="/images/logo-netfy2.png" alt="Logo" width={100} height={100} />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        
            <div className="p-4 space-y-6">
              <DashboardSection
                icon={<User className="h-5 w-5 text-nmarino" />}
                title="Cuenta"
                isMinimized={isMinimized}
                isSelected={selectedOption === 'account'}
                onClick={() => setSelectedOption('account')}
              />
              <DashboardSection
                icon={<MessageSquare className="h-5 w-5 text-nmarino" />}
                title="Conversaciones"
                isMinimized={isMinimized}
                isSelected={selectedOption === 'conversations'}
                onClick={() => setSelectedOption('conversations')}
              />
              <DashboardSection
                icon={<Settings className="h-5 w-5 text-nmarino" />}
                title="Configuración"
                isMinimized={isMinimized}
                isSelected={selectedOption === 'settings'}
                onClick={() => setSelectedOption('settings')}
              />
              <DashboardSection
                icon={<Zap className="h-5 w-5 text-nmarino" />}
                title="Integraciones"
                isMinimized={isMinimized}
                isSelected={selectedOption === 'integrations'}
                onClick={() => setSelectedOption('integrations')}
              />
            </div>
   
          <Separator className="my-2" />
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mx-auto mb-4"
                aria-label="Create Chatbot"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Chatbot</DialogTitle>
              </DialogHeader>
              {/* Add chatbot creation form here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex-1 overflow-auto ml-${isMinimized ? '16' : '64'}`}>
        <div className="p-6">
          {selectedOption === 'account' && <AccountContent />}
          {/* Add other content components for different options */}
        </div>
      </div>
    </div>
  )
}

interface DashboardSectionProps {
  icon: React.ReactNode;
  title: string;
  isMinimized: boolean;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function DashboardSection({ icon, title, isMinimized, isSelected, onClick, children }: DashboardSectionProps) {
  return (
    <section 
      className={`space-y-2 cursor-pointer ${isSelected ? 'bg-secondary' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 p-2">
        {icon}
        {!isMinimized && <h2 className="text-lg font-semibold">{title}</h2>}
      </div>
      {!isMinimized && children}
    </section>
  )
}
