import { Header } from '@/components/header'
import { ChatbotHeader } from '@/components/new/chatbot-header'
import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {/* <Header /> */}
      <ChatbotHeader />
      <SidebarDesktop />
      {children}
    </div>
  )
}
