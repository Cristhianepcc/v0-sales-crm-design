"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "Jan",
    total: 42000,
    courses: 8,
  },
  {
    name: "Feb",
    total: 38000,
    courses: 12,
  },
  {
    name: "Mar",
    total: 45000,
    courses: 10,
  },
  {
    name: "Apr",
    total: 52000,
    courses: 15,
  },
  {
    name: "May",
    total: 48500,
    courses: 12,
  },
  {
    name: "Jun",
    total: 55000,
    courses: 18,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip
          formatter={(value, name) => {
            if (name === "total") return [`$${value}`, "Ingresos"]
            return [value, "Cursos"]
          }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Ingresos" />
      </BarChart>
    </ResponsiveContainer>
  )
}
