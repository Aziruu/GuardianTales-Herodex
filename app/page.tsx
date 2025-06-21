"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Hero = {
  id: number
  name: string
  class: string
  element: string
  image_url: string
}

export default function HomePage() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // Panggil Api
        const response = await fetch("/api/heroes")
        const data = await response.json()
        setHeroes(data)
      } catch (error) {
        console.error("Gagal mengambil data heroes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroes()
  }, [])

  if (loading) {
    return (
      <p className="text-center mt-20 text-xl">Sedang Mengambil para Hero...</p>
    )
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center my-8 text-gray-800">Guardian Tales Herodex</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {heroes.map((hero) => (
          // Setiap hero akan jadi link yang mengarah ke halaman detailnya
          <Link href={`/hero/${hero.id}`} key={hero.id}>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
              <Image
                src={hero.image_url}
                alt={hero.name}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded-md mx-auto"
              />
              <h2 className="text-xl font-semibold mt-4">{hero.name}</h2>
              <p className="text-gray-500">{hero.class} - {hero.element}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
