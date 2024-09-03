import React, { useState, useEffect } from 'react'

const images = [

  'images/slideshow1.png',
  'images/slideshow2.png',
  'images/slideshow3.png'
]

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <button
        className="absolute bottom-4 right-4 px-4 py-2 bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors duration-300"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  )
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function Menu({ isOpen, onClose }: MenuProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <button
        className="absolute top-4 right-4 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
      <nav className="mt-16">
        <ul className="space-y-4">
          <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">Home</a></li>
          <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">Gallery</a></li>
          <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">About</a></li>
          <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative">
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 ">
      <button
        className="text-2xl text-white hover:text-gray-300 transition-colors duration-300"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>
      <h1 className="text-2xl font-bold text-white">Riz Brun Space</h1>
    </header>
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Slideshow />
    </div>
  )
}
