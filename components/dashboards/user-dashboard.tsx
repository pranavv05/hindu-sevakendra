"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Phone, Clock, CheckCircle, Plus, User, Calendar, DollarSign } from "lucide-react"

interface ServiceRequest {
  id: number
  service_name: string
  description: string
  status: string
  price: number
  vendor_name?: string
  vendor_phone?: string
  scheduled_at?: string
  created_at: string
  happy_code?: string
}

interface ServiceType {
  id: number
  name: string
  description: string
  base_price: number
}

export default function UserDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [newRequest, setNewRequest] = useState({
    serviceTypeId: "",
    description: "",
    address: "",
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const [requestsRes, servicesRes] = await Promise.all([fetch("/api/user/requests"), fetch("/api/services")])

      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        setRequests(requestsData)
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServiceTypes(servicesData)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewRequest = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/user/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      })

      if (response.ok) {
        toast({
          title: "Service Request Submitted",
          description: "We'll assign a vendor to you shortly. You'll receive a call confirmation.",
        })
        setNewRequest({ serviceTypeId: "", description: "", address: "" })
        fetchUserData()
      } else {
        throw new Error("Failed to submit request")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit service request. Please try again.",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.filter((r) => r.status === "completed").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                {requests
                  .filter((r) => r.status === "completed")
                  .reduce((sum, r) => sum + r.price, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="new-request" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new-request">New Request</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="new-request" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Request a Service</CardTitle>
                <CardDescription>
                  Submit a new service request and we'll connect you with a verified vendor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select onValueChange={(value) => setNewRequest((prev) => ({ ...prev, serviceTypeId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name} - ₹{service.base_price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your service requirement in detail..."
                      value={newRequest.description}
                      onChange={(e) => setNewRequest((prev) => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter the complete address where service is needed..."
                      value={newRequest.address}
                      onChange={(e) => setNewRequest((prev) => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
                    <ol className="text-sm text-blue-700 space-y-1">
                      <li>1. Submit your service request</li>
                      <li>
                        2. We'll call you at <strong>+91-1800-HINDU-SEVA</strong> to confirm
                      </li>
                      <li>3. Nearest verified vendor will be assigned automatically</li>
                      <li>4. Vendor will contact you to schedule the service</li>
                      <li>5. After completion, provide the Happy Code to confirm</li>
                    </ol>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Service Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Service Requests</CardTitle>
                <CardDescription>Track your current and past service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">Request #{request.id}</h3>
                            <Badge variant={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Service: {request.service_name}</p>
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Requested: {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">₹{request.price}</p>
                        </div>
                      </div>

                      {request.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Description:</strong> {request.description}
                        </p>
                      )}

                      {request.vendor_name && (
                        <div className="p-3 bg-green-50 rounded-lg mb-3">
                          <h4 className="font-semibold text-green-800 mb-1">Assigned Vendor</h4>
                          <p className="text-sm text-green-700">
                            <User className="w-4 h-4 inline mr-1" />
                            {request.vendor_name}
                          </p>
                          {request.vendor_phone && (
                            <p className="text-sm text-green-700">
                              <Phone className="w-4 h-4 inline mr-1" />
                              {request.vendor_phone}
                            </p>
                          )}
                        </div>
                      )}

                      {request.scheduled_at && (
                        <p className="text-sm text-gray-600 mb-3">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Scheduled: {new Date(request.scheduled_at).toLocaleString()}
                        </p>
                      )}

                      {request.status === "completed" && request.happy_code && (
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm text-orange-700">
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Service completed with Happy Code: <strong>{request.happy_code}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {requests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No service requests yet</p>
                      <p className="text-sm">Submit your first request to get started!</p>
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
