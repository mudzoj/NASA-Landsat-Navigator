"use client"; // Mark this as a Client Component

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || window.innerWidth; // Fallback in case mountRef is null
    const height = mountRef.current?.clientHeight || window.innerHeight;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera.position.z = 80000; // Adjust camera position based on globe size

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
    renderer.setSize(width, height);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create a sphere geometry (the globe) with a larger radius
    const geometry = new THREE.SphereGeometry(20000, 32, 32); // Set radius to 20,000
    const texture = new THREE.TextureLoader().load('/assets/earth-texture-2.jpg'); // Correct path
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true }); // Enable transparency
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Animation function to spin the globe
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0025; // Adjust the rotation speed as needed
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = mountRef.current?.clientWidth || window.innerWidth;
      const newHeight = mountRef.current?.clientHeight || window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      // Clean up the renderer and its DOM element
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Properly dispose of the renderer to free up resources
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Globe;
