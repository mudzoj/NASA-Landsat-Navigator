import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(null); // Ref to store the globe mesh

  useEffect(() => {
    const width = mountRef.current.clientWidth || window.innerWidth; // Get current width
    const height = mountRef.current.clientHeight || window.innerHeight; // Get current height

    const radius = width > 1200 ? 35000 : 30000; // Globe size based on screen width
    const cameraDistance = width > 1200 ? 100000 : 70000; // Camera distance

    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000000);
    camera.position.set(0, 0, cameraDistance); // Set camera position

    // Create the globe geometry
    const geometry = new THREE.SphereGeometry(radius + 1000, 32, 32);

    // Load texture and create material
    const texture = new THREE.TextureLoader().load('/assets/earth-texture-2.jpg'); // Load texture
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true }); // Globe material

    // Create the globe mesh and add it to the scene
    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe; // Store the globe in the ref
    scene.add(globe);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
    renderer.setSize(width, height); // Set initial size

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement); // Add renderer to DOM
    }

    // Animation function to spin the globe and adjust position based on scroll
    const animate = () => {
      requestAnimationFrame(animate); // Call this function recursively
      globe.rotation.y += 0.0025; // Spin the globe on Y-axis
      renderer.render(scene, camera); // Render the scene with the camera
    };

    animate(); // Start the animation

    // Handle window resize
    const handleResize = () => {
      const newWidth = mountRef.current?.clientWidth || window.innerWidth; // Get new width
      const newHeight = mountRef.current?.clientHeight || window.innerHeight; // Get new height
      renderer.setSize(newWidth, newHeight); // Update renderer size
      camera.aspect = newWidth / newHeight; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Update projection matrix after resize
      camera.position.z = (newWidth > 1200 ? 100000 : 70000); // Adjust camera position if needed
    };

    // Scroll event handler
    const handleScroll = () => {
      if (globeRef.current) {
        const scrollAmount = window.scrollY * 0.1; // Scale the scroll amount
        globeRef.current.position.set(scrollAmount, 0, 0); // Move globe right based on scroll
      }
    };

    window.addEventListener('resize', handleResize); // Listen to window resize
    window.addEventListener('scroll', handleScroll); // Listen to window scroll

    // Invoke resize to center the globe initially
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up listener
      window.removeEventListener('scroll', handleScroll); // Clean up scroll listener

      // Clean up the renderer and its DOM element
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // Remove the canvas from the DOM
      }
      renderer.dispose(); // Dispose renderer to free resources
    };
  }, []); // No dependencies, so this runs only once

  // Return the div that will hold the globe canvas
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Globe;
