"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CalendarIcon, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DateTimePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "coffee"

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [customLocation, setCustomLocation] = useState<string>("")
  const [locationError, setLocationError] = useState<string>("")

  // Predefined location options
  const locationOptions = ["CW", "Nakoa", "Tomorro", "Gingsul", "Aku ada saran bagus"]

  // Handle location selection change
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value)
    setLocationError("")

    // Clear custom location if not "Lainnya"
    if (value !== "Lainnya") {
      setCustomLocation("")
    }
  }

  // Handle custom location input change
  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomLocation(e.target.value)
    if (selectedLocation === "Lainnya" && !e.target.value.trim()) {
      setLocationError("Please enter a custom location")
    } else {
      setLocationError("")
    }
  }

  const handleContinue = () => {
    // Validate location
    if (!selectedLocation) {
      setLocationError("Please select a location")
      return
    }

    if (selectedLocation === "Lainnya" && !customLocation.trim()) {
      setLocationError("Please enter a custom location")
      return
    }

    if (date && time) {
      const formattedDate = format(date, "yyyy-MM-dd")
      const finalLocation = selectedLocation === "Aku ada saran bagus" ? customLocation.trim() : selectedLocation
      const encodedLocation = encodeURIComponent(finalLocation)
      router.push(`/confirm?type=${type}&date=${formattedDate}&time=${time}&location=${encodedLocation}`)
    }
  }

  // Generate time options from 8 AM to 9 PM in 30-minute intervals
  const timeOptions = []
  for (let hour = 8; hour <= 21; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12
    const period = hour < 12 ? "AM" : "PM"

    timeOptions.push(`${hourFormatted}:00 ${period}`)
    if (hour < 21) {
      timeOptions.push(`${hourFormatted}:30 ${period}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/select" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kapan dan Dimana?</CardTitle>
            <CardDescription>
              Pilih waktu dan tempat yaa buat {type === "coffee" ? "ngopi bareng" : "nugas bareng"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Kapan
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Tanggal..</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Jam berapa ya
              </Label>
              <Select onValueChange={setTime}>
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Jam.." />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lokasi
              </Label>

              <RadioGroup
                value={selectedLocation}
                onValueChange={handleLocationChange}
                className="grid grid-cols-2 gap-2"
              >
                {locationOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`location-${option}`} />
                    <Label htmlFor={`location-${option}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {selectedLocation === "Aku ada saran bagus" && (
                <div className="pt-2">
                  <Input
                    placeholder="sini aku kasi tau"
                    value={customLocation}
                    onChange={handleCustomLocationChange}
                    className={locationError && selectedLocation === "Aku ada saran bagus" ? "border-red-500" : ""}
                  />
                </div>
              )}

              {locationError && <p className="text-sm text-red-500">{locationError}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/select">
              <Button variant="outline">Ada yang kelewat</Button>
            </Link>
            <Button onClick={handleContinue} disabled={!date || !time}>
              Lanjut
            </Button>
          </CardFooter>
        </Card>
      </main>

    </div>
  )
}
