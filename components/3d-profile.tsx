"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three-stdlib"

export default function ThreeDProfile() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)

    // Clear any existing canvas
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    // Create a glowing sphere
    const geometry = new THREE.SphereGeometry(1.5, 64, 64)

    // Create a shader material for the glowing effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x8b5cf6) }, // Primary color (purple)
        color2: { value: new THREE.Color(0x4c1d95) }, // Secondary color (darker purple)
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create a pulsing effect
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          
          // Create a noise pattern
          float noise = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time) * sin(vPosition.z * 10.0 + time);
          noise = noise * 0.5 + 0.5; // Normalize to 0-1
          
          // Mix colors based on noise
          vec3 finalColor = mix(color1, color2, noise);
          
          // Add glow effect
          float glow = 1.0 - length(vUv - 0.5) * 1.5;
          glow = max(0.0, glow) * pulse;
          
          gl_FragColor = vec4(finalColor, glow * 0.8);
        }
      `,
      transparent: true,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add particles around the sphere
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a sphere of particles
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 2

      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius
      posArray[i + 1] = Math.sin(angle1) * Math.sin(angle2) * radius
      posArray[i + 2] = Math.cos(angle2) * radius
      i += 2
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add initials using a sprite instead of text geometry
    const createTextSprite = (text: string) => {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (!context) return null

      canvas.width = 256
      canvas.height = 256

      // Draw background (transparent)
      context.fillStyle = "rgba(0, 0, 0, 0)"
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Draw text
      context.font = "Bold 100px Arial"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillStyle = "white"
      context.fillText(text, canvas.width / 2, canvas.height / 2)

      // Canvas contents will be used for a texture
      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      })

      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(1.5, 1.5, 1)
      sprite.position.set(0, 0, 0)

      return sprite
    }

    const textSprite = createTextSprite("JM")
    if (textSprite) {
      scene.add(textSprite)
    }

    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01
      if (material.uniforms) {
        material.uniforms.time.value = time
      }

      // Animate particles
      particlesMesh.rotation.x = time * 0.1
      particlesMesh.rotation.y = time * 0.15

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      const size = containerRef.current.clientWidth
      renderer.setSize(size, size)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()

      if (textSprite) {
        if (textSprite.material instanceof THREE.Material) {
          textSprite.material.dispose()
        }
        if (textSprite.material instanceof THREE.SpriteMaterial && textSprite.material.map) {
          textSprite.material.map.dispose()
        }
        scene.remove(textSprite)
      }

      scene.remove(sphere)
      scene.remove(particlesMesh)
      renderer.dispose()
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  )
}
