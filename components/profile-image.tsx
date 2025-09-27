"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three-stdlib"

export default function ProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 2.5

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
    controls.autoRotateSpeed = 0.5

    // Create a circular plane for the image
    const geometry = new THREE.CircleGeometry(1, 64)

    // Load profile image texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load("/images/profile.png")
    texture.colorSpace = THREE.SRGBColorSpace

    // Create material with the image
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })

    const imagePlane = new THREE.Mesh(geometry, material)
    scene.add(imagePlane)

    // Add particles around the image
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere of particles
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2
      const radius = 1.2 + Math.random() * 0.8

      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius
      posArray[i + 1] = Math.sin(angle1) * Math.sin(angle2) * radius
      posArray[i + 2] = Math.cos(angle2) * radius
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add a glow effect
    const glowGeometry = new THREE.CircleGeometry(1.1, 64)
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x8b5cf6) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
          float distanceToCenter = length(vUv - vec2(0.5));
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          float alpha = smoothstep(0.5, 0.8, distanceToCenter) * pulse;
          gl_FragColor = vec4(color, alpha * 0.5);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    })

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    glowMesh.position.z = -0.01
    scene.add(glowMesh)

    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01
      if (glowMaterial.uniforms) {
        glowMaterial.uniforms.time.value = time
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
      glowGeometry.dispose()
      glowMaterial.dispose()

      scene.remove(imagePlane)
      scene.remove(particlesMesh)
      scene.remove(glowMesh)

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
