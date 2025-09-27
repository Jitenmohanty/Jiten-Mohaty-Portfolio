"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Define skill colors for better visual appeal
const skillColors: Record<string, string> = {
  "HTML": "#E34F26",
  "CSS": "#1572B6", 
  "JavaScript": "#F7DF1E",
  "TypeScript": "#3178C6",
  "React.js": "#61DAFB",
  "Next.js": "#000000",
  "Redux": "#764ABC",
  "TailwindCSS": "#06B6D4",
  "Bootstrap": "#7952B3",
  "Node.js": "#339933",
  "Express.js": "#000000",
  "MongoDB": "#47A248",
  "PostgreSQL": "#4169E1",
  "Redis": "#DC382D",
  "Git": "#F05032",
  "GitHub": "#181717",
  "AWS": "#FF9900",
  "Docker": "#2496ED",
  "Prisma": "#2D3748",
  "VS Code": "#007ACC",
  "Postman": "#FF6C37"
}

// Generate consistent colors for skills not in the predefined list
const generateSkillColor = (skill: string): string => {
  let hash = 0
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = ((hash % 360) + 360) % 360
  return `hsl(${hue}, 70%, 55%)`
}

// Convert color to RGBA with alpha
const colorToRGBA = (color: string, alpha: number): string => {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  if (color.startsWith('hsl(')) {
    return color.replace('hsl', 'hsla').replace(')', `, ${alpha})`)
  }
  
  return `rgba(139, 92, 246, ${alpha})`
}

type SkillsCloudProps = {
  skills: string[]
}

export default function SkillsCloud({ skills }: SkillsCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cleanup: (() => void) | null = null

    // Dynamically import Three.js to avoid SSR issues
    import('three').then((THREE) => {
      if (!containerRef.current) return

      try {
        // Scene setup with fog for depth perception
        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, 300, 800)

        // Enhanced camera setup with better FOV
        const camera = new THREE.PerspectiveCamera(
          60,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          2000
        )
        camera.position.set(0, 0, 500)

        // Enhanced renderer setup
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // Clear container and add renderer
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }
        containerRef.current.appendChild(renderer.domElement)

        // Create skill objects array for cleanup
        const skillObjects: InstanceType<typeof THREE.Object3D>[] = []
        
        // Enhanced sphere distribution with multiple layers
        const baseRadius = 200
        const layers = Math.ceil(skills.length / 12) // Distribute across layers
        
        skills.forEach((skill, index) => {
          // Calculate layer and position within layer
          const layer = Math.floor(index / 12)
          const indexInLayer = index % 12
          const layerRadius = baseRadius + (layer * 80)
          
          // Use golden angle for better distribution
          const goldenAngle = Math.PI * (3 - Math.sqrt(5))
          const y = 1 - (indexInLayer / 11) * 2
          const radiusAtY = Math.sqrt(1 - y * y)
          
          const theta = goldenAngle * indexInLayer
          
          const x = Math.cos(theta) * radiusAtY * layerRadius
          const z = Math.sin(theta) * radiusAtY * layerRadius
          const finalY = y * layerRadius * 0.8

          // Create 3D text geometry
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          if (context) {
            // Enhanced canvas setup
            const fontSize = 32
            const padding = 20
            canvas.width = Math.max(200, skill.length * fontSize * 0.7 + padding * 2)
            canvas.height = fontSize + padding * 2

            // Get skill color
            const skillColor = skillColors[skill] || generateSkillColor(skill)
            
            // Create gradient background
            const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, colorToRGBA(skillColor, 0.3))
            gradient.addColorStop(1, colorToRGBA(skillColor, 0.1))
            
            // Draw background with rounded corners
            context.fillStyle = gradient
            context.roundRect(5, 5, canvas.width - 10, canvas.height - 10, 8)
            context.fill()
            
            // Add border
            context.strokeStyle = colorToRGBA(skillColor, 0.8)
            context.lineWidth = 2
            context.roundRect(5, 5, canvas.width - 10, canvas.height - 10, 8)
            context.stroke()

            // Draw text with enhanced styling
            context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillStyle = skillColor
            
            // Add text glow effect
            context.shadowColor = skillColor
            context.shadowBlur = 8
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0
            
            context.fillText(skill, canvas.width / 2, canvas.height / 2)
            
            // Reset shadow
            context.shadowBlur = 0

            // Create 3D plane instead of sprite for better 3D effect
            const texture = new THREE.CanvasTexture(canvas)
            texture.generateMipmaps = false
            texture.minFilter = THREE.LinearFilter
            
            const geometry = new THREE.PlaneGeometry(canvas.width * 0.4, canvas.height * 0.4)
            const material = new THREE.MeshLambertMaterial({
              map: texture,
              transparent: true,
              alphaTest: 0.1,
              side: THREE.DoubleSide
            })
            
            const skillMesh = new THREE.Mesh(geometry, material)
            skillMesh.position.set(x, finalY, z)
            
            // Make the plane face the camera initially
            skillMesh.lookAt(camera.position)
            
            // Add some random rotation for variety
            skillMesh.rotation.x += (Math.random() - 0.5) * 0.2
            skillMesh.rotation.y += (Math.random() - 0.5) * 0.2
            
            scene.add(skillMesh)
            skillObjects.push(skillMesh)
          }
        })

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(100, 100, 50)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)
        
        // Add rim light for better depth
        const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.3)
        rimLight.position.set(-100, -50, -100)
        scene.add(rimLight)

        // Create floating particles for atmosphere
        const particleCount = 150
        const particleGeometry = new THREE.BufferGeometry()
        const particlePositions = new Float32Array(particleCount * 3)
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          const radius = 400 + Math.random() * 200
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          
          particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
          particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)  
          particlePositions[i3 + 2] = radius * Math.cos(phi)
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        
        const particleMaterial = new THREE.PointsMaterial({
          color: 0x8b5cf6,
          size: 3,
          transparent: true,
          opacity: 0.4,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        })
        
        const particles = new THREE.Points(particleGeometry, particleMaterial)
        scene.add(particles)
        skillObjects.push(particles)

        // Enhanced interaction controls
        let mouse = { x: 0, y: 0 }
        let target = { x: 0, y: 0 }
        let isInteracting = false
        let lastInteraction = Date.now()
        
        const handleMouseMove = (event: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect()
          if (!rect) return
          
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
          lastInteraction = Date.now()
          isInteracting = true
        }
        
        const handleWheel = (event: WheelEvent) => {
          event.preventDefault()
          const zoomSpeed = 0.1
          const minDistance = 200
          const maxDistance = 800
          
          camera.position.z += event.deltaY * zoomSpeed
          camera.position.z = Math.max(minDistance, Math.min(maxDistance, camera.position.z))
          lastInteraction = Date.now()
        }
        
        const handleMouseLeave = () => {
          isInteracting = false
        }

        // Add event listeners
        containerRef.current.addEventListener("mousemove", handleMouseMove)
        containerRef.current.addEventListener("wheel", handleWheel, { passive: false })
        containerRef.current.addEventListener("mouseleave", handleMouseLeave)

        // Animation loop with enhanced interactions
        let animationId: number
        const animate = () => {
          animationId = requestAnimationFrame(animate)
          
          const now = Date.now()
          const timeSinceInteraction = now - lastInteraction
          
          if (isInteracting && timeSinceInteraction < 100) {
            // User is actively interacting
            target.x = mouse.x * 0.5
            target.y = mouse.y * 0.5
            
            scene.rotation.y += (target.x - scene.rotation.y) * 0.05
            scene.rotation.x += (target.y - scene.rotation.x) * 0.05
          } else {
            // Auto-rotation with organic movement
            const time = now * 0.0001
            scene.rotation.y += 0.003
            scene.rotation.x = Math.sin(time) * 0.1
            
            // Update skill rotations to face camera with slight variation
            skillObjects.forEach((obj, index) => {
              if (obj instanceof THREE.Mesh) {
                const time = now * 0.001 + index * 0.1
                obj.rotation.z = Math.sin(time) * 0.1
              }
            })
          }
          
          // Animate particles
          if (particles) {
            particles.rotation.x += 0.0002
            particles.rotation.y += 0.0005
          }
          
          renderer.render(scene, camera)
        }

        // Handle resize
        const handleResize = () => {
          if (!containerRef.current) return
          
          const width = containerRef.current.clientWidth
          const height = containerRef.current.clientHeight
          
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }

        window.addEventListener("resize", handleResize)
        
        // Start animation
        animate()
        
        // Show loaded state
        setTimeout(() => setIsLoaded(true), 500)

        // Setup cleanup function
        cleanup = () => {
          cancelAnimationFrame(animationId)
          
          // Remove event listeners
          window.removeEventListener("resize", handleResize)
          if (containerRef.current) {
            containerRef.current.removeEventListener("mousemove", handleMouseMove)
            containerRef.current.removeEventListener("wheel", handleWheel)
            containerRef.current.removeEventListener("mouseleave", handleMouseLeave)
          }
          
          // Dispose of all objects
          skillObjects.forEach((obj) => {
            if (obj instanceof THREE.Mesh) {
              if (obj.geometry) obj.geometry.dispose()
              if (obj.material) {
                if (Array.isArray(obj.material)) {
                  obj.material.forEach(mat => {
                    if (mat.map) mat.map.dispose()
                    mat.dispose()
                  })
                } else {
                  if (obj.material.map) obj.material.map.dispose()
                  obj.material.dispose()
                }
              }
            } else if (obj instanceof THREE.Points) {
              if (obj.geometry) obj.geometry.dispose()
              if (obj.material) obj.material.dispose()
            }
            scene.remove(obj)
          })
          
          renderer.dispose()
          if (containerRef.current?.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement)
          }
        }
        
      } catch (err) {
        console.error("Error initializing 3D scene:", err)
        setError("Failed to initialize 3D visualization")
      }
    }).catch((err) => {
      console.error("Failed to load Three.js:", err)
      setError("Failed to load 3D library")
    })
    
    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup()
    }
  }, [skills])

  if (error) {
    return (
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-b from-red-50 to-red-100 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">3D Visualization Error</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg border border-slate-700 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Loading overlay */}
      {!isLoaded && !error && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400"></div>
              <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-300 opacity-20"></div>
            </div>
            <div className="text-center">
              <p className="text-white text-lg font-medium">Loading 3D Skills Universe</p>
              <p className="text-purple-300 text-sm mt-1">Preparing interactive experience...</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Instructions */}
      {isLoaded && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          🖱️ Move mouse to rotate • 🔄 Scroll to zoom
        </motion.div>
      )}
    </div>
  )
}