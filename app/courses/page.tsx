"use client"

import type React from "react"

import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, BookOpen, Users, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Course = {
  id: string
  courseName: string
  instructor: string
  category: "Desarrollo" | "Diseño" | "Marketing" | "Negocios" | "Datos"
  price: number
  students: number
  duration: string
  level: "Principiante" | "Intermedio" | "Avanzado"
  instructorAvatar: string
  description: string
  createdAt: string
}

const initialCourses: Course[] = [
  {
    id: "CURSO-001",
    courseName: "Desarrollo Web Full Stack con React",
    instructor: "María García",
    category: "Desarrollo",
    price: 299,
    students: 1250,
    duration: "40 horas",
    level: "Intermedio",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    description: "Aprende a crear aplicaciones web modernas con React, Node.js y bases de datos",
    createdAt: "2024-01-15",
  },
  {
    id: "CURSO-002",
    courseName: "Diseño UX/UI Profesional",
    instructor: "Carlos Rodríguez",
    category: "Diseño",
    price: 199,
    students: 890,
    duration: "25 horas",
    level: "Principiante",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Domina los principios de diseño de experiencia de usuario e interfaces",
    createdAt: "2024-01-20",
  },
  {
    id: "CURSO-003",
    courseName: "Marketing Digital Avanzado",
    instructor: "Ana Martínez",
    category: "Marketing",
    price: 249,
    students: 2100,
    duration: "30 horas",
    level: "Avanzado",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    description: "Estrategias avanzadas de marketing digital, SEO, SEM y redes sociales",
    createdAt: "2024-02-01",
  },
  {
    id: "CURSO-004",
    courseName: "Análisis de Datos con Python",
    instructor: "Luis Fernández",
    category: "Datos",
    price: 349,
    students: 1580,
    duration: "50 horas",
    level: "Intermedio",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Aprende análisis de datos, visualización y machine learning con Python",
    createdAt: "2024-02-10",
  },
]

const getCategoryColor = (category: Course["category"]) => {
  const colors = {
    Desarrollo: "bg-blue-100 text-blue-800",
    Diseño: "bg-purple-100 text-purple-800",
    Marketing: "bg-green-100 text-green-800",
    Negocios: "bg-orange-100 text-orange-800",
    Datos: "bg-pink-100 text-pink-800",
  }
  return colors[category]
}

const getLevelColor = (level: Course["level"]) => {
  const colors = {
    Principiante: "bg-green-100 text-green-800",
    Intermedio: "bg-yellow-100 text-yellow-800",
    Avanzado: "bg-red-100 text-red-800",
  }
  return colors[level]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: `CURSO-${String(courses.length + 1).padStart(3, "0")}`,
      courseName: courseData.courseName || "",
      instructor: courseData.instructor || "",
      category: courseData.category || "Desarrollo",
      price: courseData.price || 0,
      students: courseData.students || 0,
      duration: courseData.duration || "",
      level: courseData.level || "Principiante",
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: courseData.description || "",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCourses([...courses, newCourse])
    setIsDialogOpen(false)
  }

  const handleEditCourse = (courseData: Partial<Course>) => {
    if (editingCourse) {
      setCourses(courses.map((course) => (course.id === editingCourse.id ? { ...course, ...courseData } : course)))
      setEditingCourse(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
            <p className="text-muted-foreground">Gestiona tu catálogo de cursos y programas de formación</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCourse(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Nuevo Curso
              </Button>
            </DialogTrigger>
            <CourseDialog
              course={editingCourse}
              onSave={editingCourse ? handleEditCourse : handleAddCourse}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingCourse(null)
              }}
            />
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar cursos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              <SelectItem value="Desarrollo">Desarrollo</SelectItem>
              <SelectItem value="Diseño">Diseño</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Negocios">Negocios</SelectItem>
              <SelectItem value="Datos">Datos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Vista de Cuadrícula</TabsTrigger>
            <TabsTrigger value="list">Vista de Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{course.courseName}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingCourse(course)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Curso
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar Curso
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </div>
                    <div className="text-2xl font-bold">${course.price}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} estudiantes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} className="object-cover" />
                        <AvatarFallback className="text-xs">
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{course.instructor}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <BookOpen className="h-8 w-8 text-muted-foreground" />
                          <div className="space-y-1">
                            <h3 className="font-medium">{course.courseName}</h3>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                            <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                          </div>
                          <div className="text-lg font-semibold">${course.price}</div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{course.students.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingCourse(course)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar Curso
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar Curso
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CourseDialog({
  course,
  onSave,
  onCancel,
}: {
  course: Course | null
  onSave: (data: Partial<Course>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    courseName: course?.courseName || "",
    instructor: course?.instructor || "",
    category: course?.category || "Desarrollo",
    price: course?.price || 0,
    students: course?.students || 0,
    duration: course?.duration || "",
    level: course?.level || "Principiante",
    description: course?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{course ? "Editar Curso" : "Agregar Nuevo Curso"}</DialogTitle>
        <DialogDescription>
          {course ? "Actualiza la información del curso." : "Crea un nuevo curso en el catálogo."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="courseName">Nombre del Curso</Label>
          <Input
            id="courseName"
            value={formData.courseName}
            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as Course["category"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                <SelectItem value="Diseño">Diseño</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Negocios">Negocios</SelectItem>
                <SelectItem value="Datos">Datos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Nivel</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => setFormData({ ...formData, level: value as Course["level"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Principiante">Principiante</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Precio ($)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Input
              id="duration"
              placeholder="ej: 40 horas"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="students">Número de Estudiantes</Label>
          <Input
            id="students"
            type="number"
            min="0"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{course ? "Actualizar Curso" : "Crear Curso"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
