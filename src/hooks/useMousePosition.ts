import { useEffect, useRef } from "react";

export function useMousePosition() {
    const mousePosRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mousePosRef.current = { x: event.clientX, y: event.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return { getMousePosition: () => mousePosRef.current }
}
