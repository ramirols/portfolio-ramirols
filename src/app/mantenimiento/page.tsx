'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSettings, FiInstagram, FiGithub, FiLinkedin, FiChevronDown, FiPhone } from 'react-icons/fi';
import { BsArrowDownCircle } from 'react-icons/bs';

export default function Mantenimiento() {
    const mainRef = useRef(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const gearRef = useRef(null);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animación del engranaje girando constantemente
        gsap.to(gearRef.current, {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none"
        });

        // Animación del scroll indicator con fade
        const scrollTween = gsap.timeline({ repeat: -1 })
            .to('.scroll-indicator', {
                y: 15,
                duration: 1.2,
                ease: 'power2.inOut'
            })
            .to('.scroll-indicator', {
                y: 0,
                duration: 1.2,
                ease: 'power2.inOut'
            });

        // Timeline para cada sección con animación de entrada y salida
        sectionsRef.current.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 50 });

            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: false,
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                },
                onLeave: () => {
                    gsap.to(section, {
                        opacity: 0,
                        y: -50,
                        duration: 1,
                        ease: "power2.in"
                    });
                },
                onEnterBack: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(section, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power2.in"
                    });
                }
            });
        });

        // Efecto parallax para el fondo
        gsap.to(".grid-background", {
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: -100,
            scale: 1.1
        });

        // Auto-scroll al inicio después de 30 segundos de inactividad
        let inactivityTimer: NodeJS.Timeout;
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 30000); // 30 segundos
        };

        // Eventos para resetear el timer
        window.addEventListener('scroll', resetInactivityTimer);
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keypress', resetInactivityTimer);

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            scrollTween.kill();
            clearTimeout(inactivityTimer);
            window.removeEventListener('scroll', resetInactivityTimer);
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keypress', resetInactivityTimer);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
                scrollIndicator?.classList.add('hidden');
            } else {
                scrollIndicator?.classList.remove('hidden');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const scrollTextList = [
        "¡Vamos, vamos!",
        "¡Dale scroll!",
        "¡Sigue dandole scroll!",
        "¡No te rindas!",
        "¡Tu puerta de entrada está aquí!",
        "¡Tu paciencia es muy importante para mi!",
        "¡Jaja, ¿Por qué no me sigues?",
        "¡Proyectos en camino!",
        "¡Gracias por visitar mi sitio!",
        "¡Espero que te guste!",
        "¡Hasta la próxima!",
        "¡Hasta la vista!",
        "¡Hasta la vista, baby!",
    ]

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Solo cambiar el texto si se ha scrolleado al menos 200px desde el último cambio
            if (Math.abs(currentScroll - lastScroll) > 200) {
                lastScroll = currentScroll;

                // Obtener un índice aleatorio distinto al actual
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * scrollTextList.length);
                } while (newIndex === currentTextIndex);

                setCurrentTextIndex(newIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentTextIndex, scrollTextList.length]);

    const features = [
        {
            title: "Interfaz completamente rediseñada con animaciones fluidas",
            content: "La nueva interfaz incluirá transiciones suaves, efectos de parallax, y animaciones interactivas que mejorarán significativamente la experiencia del usuario. Implementaré las últimas tendencias en diseño web manteniendo un equilibrio entre estética y funcionalidad."
        },
        {
            title: "Nuevo sistema de gestión de proyectos",
            content: "Un sistema integral que permitirá organizar, seguir y gestionar proyectos de manera eficiente. Incluiré tableros Kanban, seguimiento de tiempo, asignación de tareas, y generación de informes detallados sobre el progreso del proyecto."
        },
        {
            title: "Integración con las últimas tecnologías web",
            content: "Implementaré integraciones con herramientas populares como GitHub, Figma, y servicios de CI/CD. También incluiré soporte para WebAssembly, PWA y otras tecnologías emergentes para mejorar el rendimiento y la funcionalidad."
        },
        {
            title: "Mejoras significativas en rendimiento y velocidad",
            content: "Optimizaré profundamente el código base, implementaré lazy loading, caching inteligente y optimizaré assets. El objetivo es lograr puntuaciones perfectas en Lighthouse y tiempos de carga inferiores a 2 segundos."
        },
        {
            title: "Experiencia de usuario optimizada y más intuitiva",
            content: "Rediseñaré completamente la navegación y la arquitectura de la información. Implementaré un sistema de búsqueda avanzado, filtros inteligentes y personalización de la interfaz según las preferencias del usuario."
        }
    ];

    return (
        <main
            ref={mainRef}
            className="relative min-h-[400vh] w-full bg-black overflow-x-hidden"
        >
            {/* Fondo animado */}
            <div className="fixed inset-0 grid-background -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle 600px at 50% 300px, rgba(255,255,255,0.1), transparent 70%)",
                            "radial-gradient(circle 600px at 50% 300px, rgba(100,100,100,0.1), transparent 70%)",
                            "radial-gradient(circle 600px at 50% 300px, rgba(255,255,255,0.1), transparent 70%)"
                        ]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute left-0 right-0 top-[-10%] h-[1000px] w-full"
                />
            </div>

            {/* Primera sección */}
            <section className="h-screen flex items-center justify-center p-4 relative z-10">
                <div
                    ref={el => { if (el) sectionsRef.current[0] = el; }}
                    className="text-center max-w-4xl mx-auto backdrop-blur-sm px-4 md:px-0"
                >
                    <motion.div
                        ref={gearRef}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="mb-8 md:mb-10"
                    >
                        <FiSettings className="w-20 h-20 md:w-32 md:h-32 text-white/90 mx-auto drop-shadow-lg" />
                    </motion.div>

                    <motion.h1
                        className="hero-title text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight mb-4 md:mb-8 drop-shadow-2xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        En Mantenimiento
                    </motion.h1>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl text-white/80 drop-shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        Estoy mejorando tu experiencia
                    </motion.p>

                    <motion.div className="flex justify-center gap-8 mt-6 md:mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                    >
                        <p className="text-white/90 text-base md:text-xl">Ramiro Ls | Desarrollador Semi Full Stack</p>
                    </motion.div>

                    <motion.div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6 md:mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.5 }}
                    >
                        <a href="https://www.instagram.com/imramero/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiInstagram className="w-5 h-5 md:w-6 md:h-6" /> @imramero
                        </a>
                        <a href="https://github.com/ramirols/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiGithub className="w-5 h-5 md:w-6 md:h-6" /> @ramirols
                        </a>
                        <a href="https://www.linkedin.com/in/ramirols/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiLinkedin className="w-5 h-5 md:w-6 md:h-6" /> @ramirols
                        </a>
                        <a href="https://wa.link/ryp5wu" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiPhone className="w-5 h-5 md:w-6 md:h-6" /> +51 957 271 213
                        </a>
                    </motion.div>

                </div>
            </section>

            {/* Segunda sección */}
            <section className="h-screen flex items-center justify-center p-4 relative z-10">
                <motion.div
                    ref={el => { if (el) sectionsRef.current[1] = el; }}
                    className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-white/5 p-4 sm:p-12 rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Sobre Mí</h2>
                    <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                        Soy un desarrollador Semi Full Stack con 3 años de experiencia, apasionado por crear experiencias web y aplicaciones únicas y memorables.
                        Con experiencia en React, Next.js, React Native, Node.js, y las últimas tecnologías web, me especializo en
                        construir aplicaciones modernas y eficientes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                        <a href="https://www.instagram.com/imramero/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiInstagram className="w-5 h-5 sm:w-6 sm:h-6" /> @imramero
                        </a>
                        <a href="https://github.com/ramirols/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" /> @ramirols
                        </a>
                        <a href="https://www.linkedin.com/in/ramirols/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" /> @ramirols
                        </a>
                        <a href="https://wa.link/ryp5wu" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" /> +51 957 271 213
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Tercera sección */}
            <section className="h-screen flex items-center justify-center p-4 relative z-10">
                <motion.div
                    ref={el => { if (el) sectionsRef.current[2] = el; }}
                    className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-white/5 p-4 sm:p-12 rounded-2xl"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Próximas Características</h2>
                    <p className="text-base sm:text-xl text-white/80 leading-relaxed mb-4 sm:mb-6">
                        Estamos trabajando en una completa renovación de la plataforma que incluirá:
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="border-b border-white/10">
                                <motion.button
                                    className="w-full text-left py-3 sm:py-4 flex items-center justify-between text-white hover:text-white transition-colors cursor-pointer"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className="text-base sm:text-lg">{feature.title}</span>
                                    <motion.div
                                        animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </motion.div>
                                </motion.button>
                                <AnimatePresence>
                                    {activeAccordion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm sm:text-base text-white/60 pb-3 sm:pb-4 pl-3 sm:pl-4">
                                                {feature.content}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Cuarta sección */}
            <section className="h-screen flex items-center justify-center p-4 relative z-10">
                <motion.div
                    ref={el => { if (el) sectionsRef.current[3] = el; }}
                    className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-white/5 p-4 sm:p-12 rounded-2xl"
                    whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">¡Gracias por tu Paciencia!</h2>
                    <p className="text-base sm:text-xl text-white/80 leading-relaxed">
                        Esto es un proyecto personal, estoy trabajando arduamente para brindarte una experiencia excepcional.
                        Mientras tanto, puedes seguir mis actualizaciones en redes sociales
                        para mantenerte informado sobre el progreso.
                    </p>
                </motion.div>
            </section>

            {/* Indicador de scroll mejorado */}
            <motion.div
                className="scroll-indicator fixed bottom-12 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="flex flex-col items-center text-white/70">
                    <BsArrowDownCircle className="w-8 h-8 animate-bounce" />
                    <p className="text-sm mt-2 tracking-wider text-white text-center font-bold">{scrollTextList[currentTextIndex]}</p>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="text-center text-white py-4 absolute bottom-0 left-0 right-0 z-30">
                <p>Copyright © 2025 Ramiro Ls | Todos los derechos reservados</p>
            </footer>
        </main>
    );
}