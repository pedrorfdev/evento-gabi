import { motion } from 'motion/react'
import { svgDraw } from '../../lib/motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimations'

interface DecorativeLineProps {
  className?: string
  width?: number | string
  height?: number | string
  color?: string
  delay?: number
  duration?: number
}

export function DecorativeLine({
  className,
  width = 160,
  height = 20,
  color = 'var(--color-pink)',
  delay = 0,
  duration = 1.5
}: DecorativeLineProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <div ref={ref} className={`flex items-center justify-center ${className || ''}`}>
      <svg width={width} height={height} viewBox="0 0 160 20" fill="none" className="overflow-visible">
        <motion.path
          d="M 10 10 Q 80 -10, 150 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 0.8, 
              transition: { duration, delay, ease: 'easeInOut' } 
            }
          }}
        />
      </svg>
    </div>
  )
}
