import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kamu Diundang!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Heii! Aku kepikiran seru banget kalau kita bisa ngobrol dan quality time bareng. Mau ngopi atau belajar
              bareng?
            </p>
            <div className="py-4">
              <Link href="/select">
                <Button size="lg" className="w-full">
                  Mau
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
