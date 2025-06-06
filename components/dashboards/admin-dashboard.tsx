"use client"

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
import { Users, DollarSign, TrendingUp, CheckCircle, XCircle, Clock, Settings, Phone } from "lucide-react"

interface Vendor {
  id: number
  name: string
  email: string
  phone: string
  service_type: string
  approval_status: string
  registration_fee: number
  fee_paid: boolean
}

interface ServiceRequest {
  id: number
  user_name: string
  service_name: string
  status: string
  price: number
  created_at: string
  vendor_name?: string
}

interface Stats {
  totalVendors: number
  pendingApprovals: number
  totalRevenue: number
  activeRequests: number
}

export default function AdminDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [stats, setStats] = useState<Stats>({
    totalVendors: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    activeRequests: 0,
  })
  const [registrationFee, setRegistrationFee] = useState("500")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [vendorsRes, requestsRes, statsRes] = await Promise.all([
        fetch("/api/admin/vendors"),
        fetch("/api/admin/requests"),
        fetch("/api/admin/stats"),
      ])

      if (vendorsRes.ok) {
        const vendorsData = await vendorsRes.json()
        setVendors(vendorsData)
      }

      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        setRequests(requestsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVendorApproval = async (vendorId: number, status: "approved" | "rejected") => {
    try {
      const response = await fetch("/api/admin/vendors/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId, status }),
      })

      if (response.ok) {
        toast({
          title: "Vendor Updated",
          description: `Vendor has been ${status}`,
        })
        fetchDashboardData()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive",
      })
    }
  }

  const updateRegistrationFee = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "vendor_registration_fee",
          value: registrationFee,
        }),
      })

      if (response.ok) {
        toast({
          title: "Settings Updated",
          description: "Registration fee has been updated",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      })
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVendors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRequests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Applications</CardTitle>
                <CardDescription>Review and approve vendor registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <Badge
                            variant={
                              vendor.approval_status === "approved"
                                ? "default"
                                : vendor.approval_status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {vendor.approval_status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{vendor.email}</p>
                        <p className="text-sm text-gray-600">
                          <Phone className="w-4 h-4 inline mr-1" />
                          {vendor.phone} | Service: {vendor.service_type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Registration Fee: ₹{vendor.registration_fee}
                          {vendor.fee_paid ? " (Paid)" : " (Pending)"}
                        </p>
                      </div>

                      {vendor.approval_status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleVendorApproval(vendor.id, "approved")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleVendorApproval(vendor.id, "rejected")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {vendors.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No vendor applications found</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Monitor all service requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">Request #{request.id}</h3>
                          <Badge
                            variant={
                              request.status === "completed"
                                ? "default"
                                : request.status === "in_progress"
                                  ? "secondary"
                                  : request.status === "assigned"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          User: {request.user_name} | Service: {request.service_name}
                        </p>
                        {request.vendor_name && <p className="text-sm text-gray-600">Vendor: {request.vendor_name}</p>}
                        <p className="text-sm text-gray-600">
                          Price: ₹{request.price} | Date: {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold">₹{request.price}</p>
                        <p className="text-sm text-gray-500">Commission: ₹{(request.price * 0.02).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  {requests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No service requests found</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform parameters and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Vendor Registration Fee (₹)</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="registrationFee"
                      type="number"
                      value={registrationFee}
                      onChange={(e) => setRegistrationFee(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button onClick={updateRegistrationFee}>
                      <Settings className="w-4 h-4 mr-2" />
                      Update
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">This fee will be applied to new vendor registrations</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Platform Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Contact Number:</strong> +91-1800-HINDU-SEVA
                    </p>
                    <p>
                      <strong>Commission Rate:</strong> 1-3% per completed service
                    </p>
                    <p>
                      <strong>Assignment Radius:</strong> 10 KM maximum
                    </p>
                    <p>
                      <strong>Happy Code System:</strong> 6-digit completion verification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
