'use client'

import { ReactNode, useEffect, useState } from 'react'

export default function ClientOnly({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    return <>{children}</>
}