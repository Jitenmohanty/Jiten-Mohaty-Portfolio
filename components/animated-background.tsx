"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Clear any existing canvas
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesCount = 200
    const positions = new Float32Array(particlesCount * 3)
    const sizes = new Float32Array(particlesCount)
    const colors = new Float32Array(particlesCount * 3)

    const color = new THREE.Color()
    const primaryColor = new THREE.Color(0x8b5cf6) // Purple (primary color)

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 100 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100 // z

      // Size
      sizes[i] = Math.random() * 2 + 0.5

      // Color - slightly randomize the primary color
      color.copy(primaryColor)
      color.offsetHSL(0, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // Shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          float alpha = 0.8 - distanceToCenter;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0)
    const target = new THREE.Vector2(0, 0)
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update particles
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        const y = particlesGeometry.attributes.position.array[i3 + 1]

        // Slow wave movement
        particlesGeometry.attributes.position.array[i3 + 2] =
          Math.sin(elapsedTime * 0.2 + x * 0.1) * 5 + Math.cos(elapsedTime * 0.2 + y * 0.1) * 5
      }
      particlesGeometry.attributes.position.needsUpdate = true

      // Smooth follow mouse
      target.x = mouse.x * 0.1
      target.y = mouse.y * 0.1
      particles.rotation.x += 0.01 * (target.y - particles.rotation.x)
      particles.rotation.y += 0.01 * (target.x - particles.rotation.y)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      particlesGeometry.dispose()
      particlesMaterial.dispose()
      scene.remove(particles)
      renderer.dispose()

      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
