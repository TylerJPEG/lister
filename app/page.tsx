import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="p-4">
      <PageHeader title="Oh, it's you again." />

      <Card className="mt-6 max-w-md">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Welcome to Grim Lister. This is your home dashboard.</p>
        </CardContent>
      </Card>
    </main>
  )
}
