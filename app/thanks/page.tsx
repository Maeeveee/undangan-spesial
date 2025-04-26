import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Thanks() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kita tunggu tanggal mainnya ya!!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
            Makasih banyak udah luangin waktu! Seneng kamu terima undangan ini.
            </p>
            <div className="py-4">
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
