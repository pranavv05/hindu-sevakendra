"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Heart, LogOut, Home, User, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-800">Hindu Seva Kendra</h1>
              <p className="text-xs text-orange-600">सेवा परमो धर्मः</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 py-4 text-gray-600 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {user?.role === "user" && (
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-2 py-4 text-gray-600 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-2 py-4 text-gray-600 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
