"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, BookOpen, ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { format } from "date-fns"

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "coffee"
  const dateParam = searchParams.get("date")
  const timeParam = searchParams.get("time")
  const locationParam = searchParams.get("location")

  const isMobile = useMobile()
  const [copied, setCopied] = useState(false)

  // Parse the date from URL parameter
  let formattedDate = "Date not selected"
  if (dateParam) {
    try {
      const parsedDate = new Date(dateParam)
      formattedDate = format(parsedDate, "EEEE, MMMM do, yyyy")
    } catch (e) {
      console.error("Error parsing date:", e)
    }
  }

  // Default locations if none provided
  const defaultLocations = {
    coffee: "",
    study: "",
  }

  // Use the provided location or fall back to default
  const location = locationParam
    ? decodeURIComponent(locationParam)
    : defaultLocations[type as keyof typeof defaultLocations]

  const activityDetails = {
    coffee: {
      title: "Ngopi Bareng",
      icon: <Coffee className="h-12 w-12 text-amber-600" />,
      description: "Ngobrol seru sambil ngopi bareng",
      location: location,
      time: timeParam || "Time not selected",
      date: formattedDate,
      color: "bg-amber-50",
    },
    study: {
      title: "Nugas Bareng",
      icon: <BookOpen className="h-12 w-12 text-emerald-600" />,
      description: "Ngobrol sambil nugas di cafe",
      location: location,
      time: timeParam || "Time not selected",
      date: formattedDate,
      color: "bg-emerald-50",
    },
  }

  const details = type === "study" ? activityDetails.study : activityDetails.coffee

    const handleShare = async () => {
      const shareText = `Halo! Aku terima undangan kamu buat ${details.title}.\nDetail : ${details.location}, ${details.date} ${details.time}.`
    
      try {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Error copying text:", err)
        alert("Gagal share nih, kamu screenshot aja ya!")
      }
    }


  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href={`/datetime?type=${type}`} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className={`flex-1 container mx-auto px-4 py-8 ${details.color}`}>
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">{details.icon}</div>
            <CardTitle className="text-2xl">{details.title}</CardTitle>
            <CardDescription>{details.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>{details.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{details.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{details.location}</span>
            </div>

            <div className="pt-4">
              <Button onClick={handleShare} className="w-full flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                {copied ? "Copied!" : "Kirim ke Aku Buat Konfirmasi"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/datetime?type=${type}`}>
              <Button variant="outline">Ada yang kelewat</Button>
            </Link>
            <Link href="/thanks">
              <Button variant="secondary">Selese</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>

    </div>
  )
}
 