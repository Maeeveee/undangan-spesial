import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, BookOpen, ArrowLeft } from "lucide-react"

export default function SelectPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Mau pilih yang mana?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/datetime?type=coffee" className="block h-full">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <CardHeader className="text-center">
                  <Coffee className="h-12 w-12 mx-auto mb-2 text-amber-600" />
                  <CardTitle>Ngopi Bareng</CardTitle>
                  <CardDescription>Ngobrol seru sambil ngopi bareng</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Ayo ketemuan di cafe pilihan kamu, ngopi bareng sambil ngobrol santai.
                  </p>
                </CardContent>
              </Card>
            </Link>


            <Link href="/datetime?type=study" className="block h-full">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-2 text-emerald-600" />
                  <CardTitle>Nugas Bareng</CardTitle>
                  <CardDescription>Ngobrol sambil nugas di cafe</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Kalo ini nugas bareng di cafe, ngobrol, dan menikmati suasana asik.
                  </p>
                </CardContent>
              </Card>
            </Link>

          </div>
        </div>
      </main>

    </div>
  )
}
