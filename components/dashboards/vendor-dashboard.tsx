"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import DashboardLayout from "@/components/dashboard-layout"
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  DollarSign,
  User,
  Calendar,
  Key,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface ServiceRequest {
  id: number
  user_name: string
  user_phone: string
  service_name: string
  description: string
  location_address: string
  status: string
  price: number
  commission: number
  vendor_payment: number
  scheduled_at?: string
  created_at: string
  happy_code?: string
}

interface VendorStats {
  totalEarnings: number
  completedJobs: number
  pendingJobs: number
  approvalStatus: string
}

export default function VendorDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [stats, setStats] = useState<VendorStats>({
    totalEarnings: 0,
    completedJobs: 0,
    pendingJobs: 0,
    approvalStatus: "pending",
  })
  const [happyCode, setHappyCode] = useState("")
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchVendorData()
  }, [])

  const fetchVendorData = async () => {
    try {
      const [requestsRes, statsRes] = await Promise.all([fetch("/api/vendor/requests"), fetch("/api/vendor/stats")])

      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        setRequests(requestsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleHappyCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRequestId || !happyCode) {
      toast({
        title: "Error",
        description: "Please select a request and enter the Happy Code",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/vendor/complete-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: selectedRequestId,
          happyCode: happyCode,
        }),
      })

      if (response.ok) {
        toast({
          title: "Job Completed!",
          description: "Payment will be processed and credited to your account.",
        })
        setHappyCode("")
        setSelectedRequestId(null)
        fetchVendorData()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Invalid Happy Code",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete job. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      case "assigned":
        return "outline"
      default:
        return "destructive"
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (stats.approvalStatus !== "approved") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Approval Pending</CardTitle>
              <CardDescription>
                Your vendor application is under review. You'll be notified once approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Status: <Badge variant="secondary">{stats.approvalStatus}</Badge>
              </p>
              <p className="text-sm text-gray-500">
                Once approved, you'll receive your starter kit and can start accepting jobs.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedJobs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingJobs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant="default">{stats.approvalStatus}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assigned-jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assigned-jobs">Assigned Jobs</TabsTrigger>
            <TabsTrigger value="complete-job">Complete Job</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned-jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Service Requests</CardTitle>
                <CardDescription>Jobs assigned to you by the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.status !== "completed")
                    .map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">Job #{request.id}</h3>
                              <Badge variant={getStatusColor(request.status)}>{request.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Service: {request.service_name}</p>
                            <p className="text-sm text-gray-600">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              Assigned: {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">₹{request.vendor_payment}</p>
                            <p className="text-sm text-gray-500">(Total: ₹{request.price})</p>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <h4 className="font-semibold text-blue-800 mb-1">Customer Details</h4>
                          <p className="text-sm text-blue-700">
                            <User className="w-4 h-4 inline mr-1" />
                            {request.user_name}
                          </p>
                          <p className="text-sm text-blue-700">
                            <Phone className="w-4 h-4 inline mr-1" />
                            {request.user_phone}
                          </p>
                          <p className="text-sm text-blue-700">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            {request.location_address}
                          </p>
                        </div>

                        {request.description && (
                          <p className="text-sm text-gray-600 mb-3">
                            <strong>Description:</strong> {request.description}
                          </p>
                        )}

                        {request.scheduled_at && (
                          <p className="text-sm text-gray-600">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Scheduled: {new Date(request.scheduled_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    ))}

                  {requests.filter((r) => r.status !== "completed").length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No pending jobs</p>
                      <p className="text-sm">New jobs will appear here when assigned</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complete-job" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Job</CardTitle>
                <CardDescription>Enter the Happy Code provided by the customer to mark job as complete</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHappyCodeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobSelect">Select Job</Label>
                    <select
                      id="jobSelect"
                      className="w-full p-2 border rounded-md"
                      value={selectedRequestId || ""}
                      onChange={(e) => setSelectedRequestId(Number(e.target.value))}
                      required
                    >
                      <option value="">Select a job to complete</option>
                      {requests
                        .filter((r) => r.status === "in_progress")
                        .map((request) => (
                          <option key={request.id} value={request.id}>
                            Job #{request.id} - {request.service_name} - {request.user_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="happyCode">Happy Code</Label>
                    <Input
                      id="happyCode"
                      type="text"
                      placeholder="Enter 6-digit Happy Code"
                      value={happyCode}
                      onChange={(e) => setHappyCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      The customer will provide this code after service completion
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">How it works:</h4>
                    <ol className="text-sm text-green-700 space-y-1">
                      <li>1. Complete the service for the customer</li>
                      <li>2. Ask customer for the 6-digit Happy Code</li>
                      <li>3. Enter the code here to confirm completion</li>
                      <li>4. Payment will be processed automatically</li>
                    </ol>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    <Key className="w-4 h-4 mr-2" />
                    Complete Job
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Track your completed jobs and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.status === "completed")
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Job #{request.id}</h3>
                          <p className="text-sm text-gray-600">
                            {request.service_name} for {request.user_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Completed: {new Date(request.created_at).toLocaleDateString()}
                          </p>
                          {request.happy_code && (
                            <p className="text-sm text-green-600">
                              <Key className="w-4 h-4 inline mr-1" />
                              Happy Code: {request.happy_code}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">+₹{request.vendor_payment}</p>
                          <p className="text-sm text-gray-500">Commission: ₹{request.commission}</p>
                        </div>
                      </div>
                    ))}

                  {requests.filter((r) => r.status === "completed").length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No completed jobs yet</p>
                      <p className="text-sm">Earnings will appear here after job completion</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
