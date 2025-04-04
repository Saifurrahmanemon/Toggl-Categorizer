"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { BarChart3, Clock, Filter, Home, LogOut, Menu, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  userName: string
}

export function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Time Entries", href: "/entries", icon: Clock },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Categories", href: "/categories", icon: Filter },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r transition-transform duration-300 ease-in-out",
          "w-64 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b bg-toggl-red">
            <h1 className="text-xl font-bold text-white">Toggl Categorizer</h1>
          </div>

          {/* User info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-gray-500">AI-Powered Time Tracking</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                        isActive ? "bg-toggl-red text-white" : "text-gray-700 hover:bg-toggl-lightGray",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

