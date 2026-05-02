import React from 'react'
import { motion } from 'motion/react'

interface RevealTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
  delay?: number
}

export function RevealText({ text, className, style, as: Component = 'span', delay = 0 }: RevealTextProps) {
  const MotionComponent = motion(Component as any)

  return (
    <Component 
      className={`flex flex-wrap justify-center text-center ${className || ''}`} 
      style={{ ...style, display: 'flex' }}
    >
      {text.split(' ').map((word, wordIndex, array) => (
        <span key={wordIndex} className="inline-flex overflow-hidden pb-1 -mb-1 mr-[0.25em] last:mr-0">
          <MotionComponent
            variants={{
              hidden: { y: '100%' },
              visible: { 
                y: 0, 
                transition: { 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: delay + (wordIndex * 0.03)
                } 
              }
            }}
          >
            {word}
          </MotionComponent>
        </span>
      ))}
    </Component>
  )
}
