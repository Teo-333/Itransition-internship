"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function BubbleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let bubbles: Bubble[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initBubbles()
    }

    class Bubble {
      x: number
      y: number
      size: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 15 + 5
        this.speedY = Math.random() * 0.7 + 0.3
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.y -= this.speedY

        // Reset bubble when it goes off the top
        if (this.y < -this.size * 2) {
          this.y = canvas.height + this.size
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        const color = theme === "dark" ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(100, 100, 100, ${this.opacity})`

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle highlight
        ctx.fillStyle =
          theme === "dark" ? `rgba(255, 255, 255, ${this.opacity * 0.5})` : `rgba(255, 255, 255, ${this.opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initBubbles = () => {
      bubbles = []
      const bubbleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 50)

      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
}

