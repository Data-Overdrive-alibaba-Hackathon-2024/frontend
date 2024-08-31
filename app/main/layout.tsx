interface ChatLayoutProps {
    children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
    return (
        <div className="flex flex-col bg-[#1C0043] min-h-screen items-center text-white">
            {/* <Header /> */}
            {/* <SidebarDesktop /> */}
            {children}
        </div>
    )
}
