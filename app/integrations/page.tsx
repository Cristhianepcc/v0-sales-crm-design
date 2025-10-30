import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Slack, Calendar, Mail, Zap, Github, Chrome, Database, MessageSquare } from "lucide-react"

const integrations = [
  {
    id: 1,
    name: "Slack",
    description: "Recibe notificaciones y actualizaciones directamente en tus canales de Slack",
    icon: Slack,
    connected: true,
    category: "Comunicación",
  },
  {
    id: 2,
    name: "Google Calendar",
    description: "Sincroniza tus reuniones y citas con Google Calendar",
    icon: Calendar,
    connected: true,
    category: "Productividad",
  },
  {
    id: 3,
    name: "HubSpot",
    description: "Sincroniza contactos y tratos con tu CRM de HubSpot",
    icon: Database,
    connected: false,
    category: "CRM",
  },
  {
    id: 4,
    name: "Zapier",
    description: "Conecta con más de 5000 aplicaciones a través de la automatización de Zapier",
    icon: Zap,
    connected: false,
    category: "Automatización",
  },
  {
    id: 5,
    name: "Gmail",
    description: "Rastrea aperturas de correos y sincroniza conversaciones de email",
    icon: Mail,
    connected: true,
    category: "Email",
  },
  {
    id: 6,
    name: "GitHub",
    description: "Vincula el trabajo de desarrollo con tratos y proyectos de clientes",
    icon: Github,
    connected: false,
    category: "Desarrollo",
  },
  {
    id: 7,
    name: "Extensión de Chrome",
    description: "Accede a los datos del CRM directamente desde tu navegador",
    icon: Chrome,
    connected: false,
    category: "Navegador",
  },
  {
    id: 8,
    name: "Microsoft Teams",
    description: "Colabora con tu equipo usando Microsoft Teams",
    icon: MessageSquare,
    connected: false,
    category: "Comunicación",
  },
]

const categories = [
  "Todas",
  "Comunicación",
  "Productividad",
  "CRM",
  "Automatización",
  "Email",
  "Desarrollo",
  "Navegador",
]

export default function Integrations() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integraciones</h1>
          <p className="text-muted-foreground">Conecta tus herramientas favoritas y optimiza tu flujo de trabajo</p>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Buscar integraciones..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button key={category} variant={category === "Todas" ? "default" : "outline"} size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <Card key={integration.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <integration.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  {integration.connected && <Badge className="bg-green-100 text-green-800">Conectado</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{integration.description}</CardDescription>
                <Button className="w-full" variant={integration.connected ? "outline" : "default"}>
                  {integration.connected ? "Administrar" : "Conectar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integraciones Populares</CardTitle>
            <CardDescription>Integraciones más utilizadas por equipos de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Slack className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-muted-foreground">95% de los equipos usan esto</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">87% de los equipos usan esto</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-8 w-8 text-red-600" />
                <div>
                  <p className="font-medium">Gmail</p>
                  <p className="text-sm text-muted-foreground">78% de los equipos usan esto</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
