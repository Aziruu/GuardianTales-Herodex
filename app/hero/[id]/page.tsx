// Lokasi file: app/hero/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Tipe data untuk detail hero, ada deskripsinya
type HeroDetail = {
  id: number;
  name: string;
  class: string;
  element: string;
  image_url: string;
  description: string;
};

export default function HeroDetailPage() {
  // 'useParams' untuk mendapatkan ID dari URL, misal '1' dari /hero/1
  const params = useParams();
  const id = params.id;

  const [hero, setHero] = useState<HeroDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchHero = async () => {
        try {
          // Panggil API detail hero dengan ID yang didapat dari URL
          const response = await fetch(`/api/heroes/${id}`);
          if (!response.ok) {
            throw new Error('Hero tidak ditemukan');
          }
          const data = await response.json();
          setHero(data);
        } catch (error) {
          console.error('Gagal mengambil detail hero:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchHero();
    }
  }, [id]); // Jalankan lagi jika ID di URL berubah

  if (loading) {
    return <p className="text-center mt-20 text-xl">Mencari info detail hero...</p>;
  }

  if (!hero) {
    return (
        <div className="text-center mt-20">
            <p className="text-2xl text-red-500">Hero tidak ditemukan.</p>
            <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Kembali ke Herodex</Link>
        </div>
    )
  }

  return (
    <main className="container mx-auto p-8">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Kembali ke Daftar Hero</Link>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <Image
            src={hero.image_url}
            alt={hero.name}
            width={400}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-5xl font-bold mb-2">{hero.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-gray-200 text-gray-800 text-md font-medium px-4 py-1 rounded-full">{hero.class}</span>
            <span className="bg-blue-100 text-blue-800 text-md font-medium px-4 py-1 rounded-full">{hero.element}</span>
          </div>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">{hero.description}</p>
        </div>
      </div>
    </main>
  );
}