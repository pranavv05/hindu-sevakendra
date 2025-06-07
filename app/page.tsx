import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Zap,
  Paintbrush,
  Hammer,
  Droplets,
  Wind,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const services = [
    { name: "Plumbing", icon: Droplets, description: "Water pipe repairs, installations, and maintenance" },
    { name: "Electrical", icon: Zap, description: "Electrical repairs, wiring, and installations" },
    { name: "Cleaning", icon: Wind, description: "House cleaning, office cleaning, deep cleaning" },
    { name: "Carpentry", icon: Hammer, description: "Furniture repair, wood work, installations" },
    { name: "Painting", icon: Paintbrush, description: "Wall painting, home painting services" },
    { name: "AC Repair", icon: Wind, description: "Air conditioner repair and maintenance" },
  ]

  const features = [
    {
      title: "Verified Vendors",
      description: "All service providers are verified and approved by our team",
      icon: CheckCircle,
    },
    { title: "Location-Based", description: "Automatic assignment of nearest available vendor", icon: MapPin },
    { title: "Happy Code System", description: "Secure completion confirmation system", icon: Star },
    { title: "Transparent Pricing", description: "Fair pricing with minimal platform commission", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">Hindu Seva Kendra</h1>
              <p className="text-sm text-orange-600">सेवा परमो धर्मः</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/auth/login" className="text-gray-600 hover:text-orange-600">
              Login
            </Link>
            <Link href="/register/user" className="text-gray-600 hover:text-orange-600">
              Register
            </Link>
            <Link href="/register/vendor" className="text-gray-600 hover:text-orange-600">
              Become a Vendor
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">HSK</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Connecting Communities Through <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Hindu Seva Kendra bridges the gap between people in need of services and verified local vendors, fostering
            community support and economic empowerment through our charitable trust initiative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/register/user">Request Service</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
              asChild
            >
              <Link href="/register/vendor">Join as Vendor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To create a sustainable ecosystem where quality services meet genuine needs, empowering local vendors
              while serving our community with integrity and compassion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-orange-200">
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-orange-800">Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building stronger communities by connecting neighbors and supporting local businesses
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-orange-800">Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every vendor is verified, trained, and committed to delivering excellent service
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200">
              <CardHeader>
                <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-orange-800">Service with Heart</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Guided by the principle of selfless service, we prioritize people over profit
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-lg text-gray-600">
              Comprehensive home and business services delivered by trusted professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-orange-200">
                <CardHeader>
                  <service.icon className="w-10 h-10 text-orange-600 mb-2" />
                  <CardTitle className="text-orange-800">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-lg text-gray-600">Simple steps to get the service you need</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Register</h4>
              <p className="text-gray-600">Create your account and verify your details</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
              <p className="text-gray-600">Call our platform number and describe your need</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <p className="text-gray-600">We assign the nearest verified vendor to you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Complete</h4>
              <p className="text-gray-600">Service completed, payment processed securely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-orange-200">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-orange-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Get Started Today</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5 text-orange-600" />
              <span className="text-lg font-semibold">+91 6359220055</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-orange-600" />
              <span className="text-lg">helphskhelp@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/register/user">Register as User</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
              asChild
            >
              <Link href="/register/vendor">Become a Vendor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Hindu Seva Kendra</h4>
                  <p className="text-sm text-gray-400">सेवा परमो धर्मः</p>
                </div>
              </div>
              <p className="text-gray-400">
                Connecting communities through service, empowering local vendors, and building a better tomorrow.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Plumbing</li>
                <li>Electrical</li>
                <li>Cleaning</li>
                <li>Carpentry</li>
                <li>Painting</li>
                <li>AC Repair</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register/user" className="hover:text-orange-400">
                    Register as User
                  </Link>
                </li>
                <li>
                  <Link href="/register/vendor" className="hover:text-orange-400">
                    Become a Vendor
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-orange-400">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-400">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-gray-400">
                <p>+91 6359220055</p>
                <p>helphskhelp@gmail.com</p>
                <p>Ut Corporate Services Pvt Ltd Silvassa-396230</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hindu Seva Kendra. All rights reserved. | A thoughtful Initiative</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
