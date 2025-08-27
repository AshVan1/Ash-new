'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

export const JewelryHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const cameraVelocity = useRef({ x: 0, y: 0, z: 0 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    gems: THREE.Points[];
    lightRays: THREE.Mesh | null;
    surfaces: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    gems: [],
    lightRays: null,
    surfaces: [],
    animationId: null
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      
      if (!canvasRef.current) return;
      
      // Scene setup with warm jewelry lighting
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.00015);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer with jewelry-appropriate settings
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: false, // Disabled for better performance
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced from 2
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing for jewelry sparkle effect
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6, // Reduced from 0.8
        0.3, // Reduced from 0.4
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create jewelry-themed scene elements
      createGemField();
      createLightRays(); // Function is now completely disabled
      createJewelrySurfaces();
      createAmbientGlow();
      getLocation();

      // Start animation
      animate();
      
      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createGemField = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const gemCount = 1500; // Reduced from 3000 for better performance
      
      for (let i = 0; i < 2; i++) { // Reduced from 3 layers
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(gemCount * 3);
        const colors = new Float32Array(gemCount * 3);
        const sizes = new Float32Array(gemCount);

        for (let j = 0; j < gemCount; j++) {
          const radius = 200 + Math.random() * 600; // Reduced radius
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Silver/gray tones for jewelry
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.4) {
            // Silver tones
            color.setHSL(0, 0, 0.7 + Math.random() * 0.2);
          } else if (colorChoice < 0.7) {
            // Light silver
            color.setHSL(0, 0, 0.8 + Math.random() * 0.1);
          } else if (colorChoice < 0.85) {
            // Dark silver
            color.setHSL(0, 0, 0.5 + Math.random() * 0.2);
          } else {
            // Platinum
            color.setHSL(0, 0, 0.9);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5; // Reduced size range
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Gentle rotation like gems catching light
              float angle = time * 0.03 * (1.0 - depth * 0.2);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (400.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              // Diamond-like sparkle effect
              float sparkle = 1.0 - smoothstep(0.0, 0.3, dist);
              sparkle = pow(sparkle, 2.0);
              
              gl_FragColor = vec4(vColor * (1.0 + sparkle), sparkle);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const gems = new THREE.Points(geometry, material);
        refs.scene.add(gems);
        refs.gems.push(gems);
      }
    };

    const createLightRays = () => {
      // Completely disabled - no laser effect
      return;
    };

    const createJewelrySurfaces = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const layers = [
        { distance: -50, height: 40, color: 0x2a2a2a, opacity: 1 },      // Dark jewelry display
        { distance: -100, height: 60, color: 0x404040, opacity: 0.8 },   // Medium surface
        { distance: -150, height: 80, color: 0x1a1a1a, opacity: 0.6 },   // Far surface
        { distance: -200, height: 100, color: 0x0a0a0a, opacity: 0.4 }   // Background
      ];

      layers.forEach((layer, index) => {
        if (!refs.scene) return;
        
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          // Gentler curves like jewelry display surfaces
          const y = Math.sin(i * 0.08) * layer.height * 0.3 + 
                   Math.sin(i * 0.04) * layer.height * 0.2 +
                   Math.random() * layer.height * 0.1 - 50;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -200));
        points.push(new THREE.Vector2(-5000, -200));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const surface = new THREE.Mesh(geometry, material);
        surface.position.z = layer.distance;
        surface.position.y = layer.distance * 0.5;
        surface.userData = { baseZ: layer.distance, index };
        refs.scene.add(surface);
        refs.surfaces.push(surface);
      });
    };

    const createAmbientGlow = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
            vec3 atmosphere = vec3(0.8, 0.8, 0.8) * intensity; // Silver glow
            
            float pulse = sin(time * 1.5) * 0.1 + 0.7;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.2);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update gems
      refs.gems.forEach((gemField, i) => {
        const material = gemField.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.time.value = time;
        }
      });

      // Update light rays
      if (refs.lightRays && refs.lightRays.material) {
        const material = refs.lightRays.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.time.value = time * 0.8;
        }
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05;
        
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;
        
        // Subtle floating motion
        const floatX = Math.sin(time * 0.15) * 1.5;
        const floatY = Math.cos(time * 0.2) * 0.8;
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 0, -400);
      }

      // Parallax surfaces with subtle animation
      refs.surfaces.forEach((surface, i) => {
        const parallaxFactor = 1 + i * 0.4;
        surface.position.x = Math.sin(time * 0.08) * 1.5 * parallaxFactor;
        surface.position.y = 30 + (Math.cos(time * 0.12) * 0.8 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.gems.forEach(gemField => {
        gemField.geometry.dispose();
        if (gemField.material) {
          (gemField.material as THREE.Material).dispose();
        }
      });

      refs.surfaces.forEach(surface => {
        surface.geometry.dispose();
        if (surface.material) {
          (surface.material as THREE.Material).dispose();
        }
      });

      if (refs.lightRays) {
        refs.lightRays.geometry.dispose();
        if (refs.lightRays.material) {
          (refs.lightRays.material as THREE.Material).dispose();
        }
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.surfaces.forEach((surface, i) => {
      locations[i] = surface.position.z;
    });
    refs.locations = locations;
  };

  // GSAP Animations
  useEffect(() => {
    if (!isReady) return;
    
    gsap.set([menuRef.current, scrollProgressRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4");
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      setScrollProgress(progress);

      const { current: refs } = threeRefs;
      
      // Calculate which section we're in based on scroll progress
      const heroEndProgress = 0.85; // Hero section ends at 85% of scroll
      
      // Hide hero content when we're near the end of the 3D section
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      const scrollIndicator = document.querySelector('.scroll-progress') as HTMLElement;
      const sideMenu = document.querySelector('.side-menu') as HTMLElement;
      
      if (progress > heroEndProgress) {
        if (heroContent) heroContent.style.opacity = '0';
        if (scrollIndicator) scrollIndicator.style.opacity = '0';
        if (sideMenu) sideMenu.style.opacity = '0';
      } else {
        if (heroContent) heroContent.style.opacity = '1';
        if (scrollIndicator) scrollIndicator.style.opacity = '1';
        if (sideMenu) sideMenu.style.opacity = '1';
      }
      
      // Hide laser when user scrolls to portfolio section
      if (refs.lightRays && refs.lightRays.material) {
        const material = refs.lightRays.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          // Hide laser when progress is high (near portfolio section)
          if (progress > 0.1) { // Changed to 0.1 (10%) for very early hiding
            material.uniforms.opacity.value = 0.0;
            console.log('Laser hidden at progress:', progress);
            // Also remove from scene completely
            if (refs.scene && refs.lightRays.parent) {
              refs.scene.remove(refs.lightRays);
            }
          } else {
            material.uniforms.opacity.value = 0.03;
            console.log('Laser visible at progress:', progress);
            // Add back to scene if not already there
            if (refs.scene && !refs.lightRays.parent) {
              refs.scene.add(refs.lightRays);
            }
          }
        }
      }
      
      // Simple camera movement
      const targetPos = {
        x: 0,
        y: 30 + progress * 20,
        z: 200 - progress * 700
      };
      
      refs.targetCameraX = targetPos.x;
      refs.targetCameraY = targetPos.y;
      refs.targetCameraZ = targetPos.z;

      // Smooth parallax for surfaces
      refs.surfaces.forEach((surface, i) => {
        const speed = 0.8 + i * 0.3;
        const targetZ = surface.userData.baseZ + scrollY * speed * 0.2;
        
        if (progress > 0.9) {
          surface.position.z = 400000; // Move far away at the end
        } else {
          surface.position.z = targetZ;
        }
      });
      
      if (refs.lightRays) {
        refs.lightRays.position.z = refs.surfaces[2]?.position.z || -150;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={containerRef} className="hero-container jewelry-style">
        <canvas ref={canvasRef} className="hero-canvas" />
        
        {/* Side menu */}
        <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="vertical-text">CRAFT</div>
        </div>

        {/* Main content - no text, just visual effects */}
        <div className="hero-content jewelry-content">
          {/* Empty - no text content */}
        </div>

        {/* Scroll progress indicator */}
        <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
          <div className="scroll-text">EXPLORE</div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="section-counter">
            01 / 01
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          width: 100vw;
          height: 300vh;
          overflow: hidden;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
        }

        .hero-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          image-rendering: auto;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }

        .side-menu {
          position: fixed;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          transition: opacity 0.5s ease;
        }

        .menu-icon {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .menu-icon span {
          width: 20px;
          height: 2px;
          background: #C0C0C0;
          transition: all 0.3s ease;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #C0C0C0;
          opacity: 0.8;
        }

        .hero-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 5;
          max-width: 90vw;
          transition: opacity 0.5s ease;
        }

        .hero-title {
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 900;
          line-height: 0.9;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #C0C0C0, #E5E5E5, #C0C0C0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(192, 192, 192, 0.2);
          letter-spacing: 0.02em;
          will-change: transform;
        }

        .title-char {
          display: inline-block;
          transition: all 0.3s ease;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          transition: all 0.6s ease;
        }

        .subtitle-line {
          margin: 0.5rem 0;
          opacity: 0.9;
          transition: all 0.4s ease;
        }

        .scroll-progress {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: opacity 0.5s ease;
        }

        .scroll-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #C0C0C0;
          opacity: 0.8;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .progress-track {
          width: 2px;
          height: 100px;
          background: rgba(192, 192, 192, 0.2);
          border-radius: 1px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to bottom, #C0C0C0, #E5E5E5);
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .section-counter {
          font-size: 0.75rem;
          font-weight: 600;
          color: #C0C0C0;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .side-menu, .scroll-progress {
            display: none;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .hero-canvas {
            image-rendering: auto;
          }
        }
      `}</style>
    </>
  );
}; 