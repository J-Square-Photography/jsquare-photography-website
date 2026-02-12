'use client'

import { useEffect, useRef } from 'react'
import { useSpring, useTransform, motion } from 'framer-motion'

interface AnimatedPriceProps {
  value: number
  className?: string
}

export const AnimatedPrice = ({ value, className = '' }: AnimatedPriceProps) => {
  const spring = useSpring(value, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (v) =>
    `$${Math.round(v).toLocaleString()}`
  )
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      spring.set(value)
      prevValue.current = value
    }
  }, [value, spring])

  return <motion.span className={className}>{display}</motion.span>
}
