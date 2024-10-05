'use client'; // Indicate that this is a client component
import React, { useCallback, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; // Load full tsparticles engine

const ParticlesBackground = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine); // Load the full tsparticles engine
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);
 
    const particlesOptions = {
        fullScreen: {
            enable: true,
            zIndex: -1, // Ensure particles are behind content
        },
        background: {
            color: {
                value: "#000000", // Set background color to black
            },
        },
        particles: {
            number: {
                value: 200, // Increase the number of particles for a denser star field
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: "#ffffff", // White particles
            },
            shape: {
                type: "circle", // Use circles for a realistic star appearance
            },
            opacity: {
                value: 0.8, // Higher opacity for brighter stars
                random: true, // Random opacity for twinkling effect
                anim: {
                    enable: true,
                },
            },
            size: {
                value: 1, // Base size for stars
                random: {
                    enable: true,
                    minimumValue: 0.5, // Allow smaller stars
                },
                anim: {
                    enable: false, // Disable size animation
                },
            },
            move: {
                enable: true,
                speed: 0.2, // Slow movement to create a subtle twinkling effect
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true, // Enable hover effects
                    mode: "mousemove", // Change to mousemove to detect mouse position
                },
                onclick: {
                    enable: false, // Disable click effects
                },
                resize: true,
            },
            modes: {
                // Remove the repulse mode
                mouseMove: {
                    distance: 400, // Distance threshold for changing opacity
                },
            },
        },
        retina_detect: true,
    };

    // Function to handle mouse move and update the mouse position
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    };

    // Update particle opacity based on mouse position
    const updateParticlesOpacity = (particles) => {
        particles.forEach((particle) => {
            const distance = Math.sqrt(
                Math.pow(particle.position.x - mousePosition.x, 2) +
                Math.pow(particle.position.y - mousePosition.y, 2)
            );
            const newOpacity = Math.max(0, 1 - distance / 100); // Adjust 100 to change the range of effect
            particle.opacity.value = newOpacity; // Set the new opacity value
        });
    };

    return (
        <div onMouseMove={handleMouseMove}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesOptions}
                particlesLoaded={(container) => {
                    // Update particle opacity based on mouse position
                    const particles = container.particles;
                    updateParticlesOpacity(particles);
                }}
            />
            {children}
        </div>
    );
};

export default ParticlesBackground;
