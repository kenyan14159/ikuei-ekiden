"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    // タッチデバイスではカーソルを非表示
    const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
    const [isVisible, setIsVisible] = useState(!isTouchDevice);

    useEffect(() => {
        // Hide on mobile/touch devices
        if (typeof window !== "undefined" && "ontouchstart" in window) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Detect hoverable elements
        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isHoverable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "hover";
            setIsHovering(!!isHoverable);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousemove", handleElementHover);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousemove", handleElementHover);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Custom cursor enhancement - default cursor remains visible */}

            {/* Main Cursor Dot */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isClicking ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                animate={{
                    x: position.x - (isHovering ? 30 : 20),
                    y: position.y - (isHovering ? 30 : 20),
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    opacity: isHovering ? 1 : 0.5,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            >
                <div
                    className={`w-full h-full rounded-full border transition-colors duration-200 ${isHovering ? "border-[var(--blue)]" : "border-white/50"
                        }`}
                />
            </motion.div>
        </>
    );
}
