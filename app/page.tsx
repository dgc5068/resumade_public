import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, Cpu, FileText, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Cpu className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Resumade</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col justify-center space-y-4 text-white text-center lg:text-left lg:w-1/2">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Perfect Resume with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Our AI-powered platform helps you craft a professional resume in minutes. Stand out from the crowd and land your dream job.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button 
                      className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200" 
                      size="lg"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white text-white bg-white/10 hover:bg-white hover:text-purple-600" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center lg:w-1/2">
                <div className="relative w-[250px] h-[353px] sm:w-[300px] sm:h-[424px] md:w-[400px] md:h-[565px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-2xl transform -rotate-6"></div>
                  <Image
                    alt="Resume Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
                    height="1600"
                    src="/resume example.png"
                    style={{
                      aspectRatio: "1131/1600",
                      objectFit: "cover",
                    }}
                    width="1131"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">How It Works</h2>
            <p className="text-gray-500 md:text-xl text-center mb-8 max-w-[800px] mx-auto">
              Our AI-powered platform simplifies the resume creation process, helping you build a professional resume in just three easy steps.
            </p>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
              <Card className="text-center">
                <CardHeader className="items-center">
                  <FileText className="h-10 w-10 mb-2 text-purple-600" />
                  <CardTitle>1. Input Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Simply enter your details or upload an existing resume. Our AI will extract and organize your information.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="items-center">
                  <Cpu className="h-10 w-10 mb-2 text-purple-600" />
                  <CardTitle>2. AI Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Our advanced AI analyzes your information and optimizes your resume for your target industry and job role.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="items-center">
                  <Zap className="h-10 w-10 mb-2 text-purple-600" />
                  <CardTitle>3. Customize and Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Choose from our professionally designed templates, make final adjustments, and download your perfect resume.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">What Our Users Say</h2>
            <p className="text-gray-500 md:text-xl text-center mb-8 max-w-[800px] mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our users have to say about their experience with AI Resume Builder.
            </p>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="flex items-center gap-4 justify-center">
                      <Image
                        alt={`User ${i}`}
                        className="rounded-full"
                        height="40"
                        src="/resume example.png"
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="40"
                      />
                      <div>
                        <CardTitle>John Doe</CardTitle>
                        <CardDescription>Software Engineer</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      &ldquo;The AI-powered resume builder helped me create a professional resume in minutes. I got multiple interview calls after using it!&rdquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Pricing Plans</h2>
            <p className="text-gray-500 md:text-xl text-center mb-8 max-w-[800px] mx-auto">
              Choose the plan that best fits your needs. All plans come with a 7-day free trial.
            </p>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 max-w-5xl mx-auto justify-center">
              {[
                { name: "Basic", price: "$9.99", features: ["1 Resume", "3 Templates", "AI Optimization", "24/7 Support"] },
                { name: "Pro", price: "$19.99", features: ["3 Resumes", "10 Templates", "AI Optimization", "24/7 Support", "Cover Letter Builder"] },
                { name: "Enterprise", price: "Custom", features: ["Unlimited Resumes", "All Templates", "AI Optimization", "24/7 Priority Support", "Cover Letter Builder", "Team Collaboration"] },
              ].map((plan, i) => (
                <Card key={i} className={`text-center ${i === 1 ? "border-purple-500 shadow-lg" : ""}`}>
                  <CardHeader className="items-center">
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button className="w-full" variant={i === 1 ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white max-w-3xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Build Your Perfect Resume?</h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
                </p>
              </div>
              <div className="flex justify-center w-full">
                <div className="w-full max-w-sm">
                  <Button 
                    className="w-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg py-6 rounded-xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center" 
                    size="lg"
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500"> 2024 AI Resume Builder. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
