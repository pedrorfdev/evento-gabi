import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useCountdown } from '../hooks/useCountdown'
import { event } from '../data/event'
import { stagger, fadeUp, countFlip } from '../lib/motion'

const containerVariants = stagger(0.12, 0.25)
const itemVariants = fadeUp(28, 0.75)

function CountUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={countFlip.initial}
            animate={countFlip.animate}
            exit={countFlip.exit}
            transition={countFlip.transition}
            className="block font-display font-light leading-none tabular-nums"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              color: 'var(--color-pink-light)',
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="font-body uppercase"
        style={{
          fontSize: '10px',
          letterSpacing: '0.25em',
          color: 'var(--color-text-faint)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function CountSep() {
  return (
    <span
      className="font-display font-light leading-none"
      style={{
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        color: 'var(--color-silver-dim)',
        marginBottom: '1.8rem',
        opacity: 0.4,
      }}
    >
      :
    </span>
  )
}

function Ornament() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-silver-dim))' }}
      />
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
          fill="var(--color-silver)"
          opacity="0.6"
        />
      </svg>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, var(--color-silver-dim), transparent)' }}
      />
    </div>
  )
}

const DOTS = [
  { left: '12%', top: '20%', size: 2, delay: 0   },
  { left: '88%', top: '15%', size: 1, delay: 0.8 },
  { left:  '6%', top: '65%', size: 3, delay: 1.5 },
  { left: '92%', top: '60%', size: 2, delay: 0.4 },
  { left: '20%', top: '85%', size: 1, delay: 2   },
  { left: '78%', top: '80%', size: 2, delay: 1.2 },
  { left: '50%', top: '10%', size: 1, delay: 0.6 },
  { left: '35%', top: '90%', size: 2, delay: 1.8 },
]

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {DOTS.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: 'var(--color-silver)',
          }}
          animate={{ opacity: [0.1, 0.45, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: 3 + i * 0.4, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(600px, 90vw)',
          height: 'min(600px, 90vw)',
          border: '1px solid var(--color-border)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(400px, 68vw)',
          height: 'min(400px, 68vw)',
          border: '1px solid var(--color-border)',
          opacity: 0.25,
        }}
      />
    </div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const { days, hours, minutes, seconds, expired } = useCountdown(event.date.iso)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: 'var(--color-bg)' }}
    >
      <Particles />

      {/* Glow rosa de fundo */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-pink) 7%, transparent) 0%, transparent 70%)',
        }}
      />

      {/* Conteúdo com parallax */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-8 px-6"
        >

          {/* Pré-título */}
          <motion.p
            variants={itemVariants}
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)', opacity: 0.8 }}
          >
            você está convidado para os
          </motion.p>

          {/* Nome principal — gradiente rosa, com fallback sólido */}
          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
              className="font-display font-light leading-none text-gradient-pink"
              style={{ fontSize: 'clamp(4.5rem, 18vw, 11rem)', letterSpacing: '-0.02em' }}
            >
              {event.title}
            </motion.h1>
          </div>

          {/* 15 anos — prata */}
          <motion.p
            variants={itemVariants}
            className="font-display italic font-light"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 1.8rem)', letterSpacing: '0.08em', color: 'var(--color-silver)' }}
          >
            15 anos
          </motion.p>

          {/* Ornamento */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Ornament />
          </motion.div>

          {/* Data + local */}
          <motion.p
            variants={itemVariants}
            className="font-body uppercase"
            style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-text-muted)' }}
          >
            {event.date.display} · {event.date.time}
          </motion.p>

          {/* Countdown */}
          {!expired && (
            <motion.div
              variants={itemVariants}
              className="flex items-end"
              style={{ gap: 'clamp(0.75rem, 3vw, 1.75rem)', margin: '0.25rem 0' }}
            >
              <CountUnit value={days}    label="dias"     />
              <CountSep />
              <CountUnit value={hours}   label="horas"    />
              <CountSep />
              <CountUnit value={minutes} label="minutos"  />
              <CountSep />
              <CountUnit value={seconds} label="segundos" />
            </motion.div>
          )}

          {/* Local */}
          <motion.p
            variants={itemVariants}
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--color-text-faint)' }}
          >
            {event.venue.name}
          </motion.p>

          {/* CTA scroll */}
          <motion.button
            variants={itemVariants}
            onClick={() => document.querySelector('#detalhes')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer focus-ring rounded-lg p-2 transition-opacity hover:opacity-100 opacity-70"
            style={{ color: 'var(--color-text-faint)' }}
          >
            <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.3em' }}>
              rolar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="1" height="32" viewBox="0 0 1 32" fill="none" className="overflow-visible">
                <line x1="0.5" y1="0" x2="0.5" y2="27" stroke="var(--color-silver-dim)" strokeWidth="1" />
                <circle cx="0.5" cy="30" r="2" fill="var(--color-silver-dim)" />
              </svg>
            </motion.div>
          </motion.button>

        </motion.div>
      </motion.div>
    </section>
  )
}