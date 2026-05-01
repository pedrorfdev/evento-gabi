import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'motion/react'
import { event } from '../data/event'
import { useCountdown } from '../hooks/useCountdown'

function CountUnit({ value, label }) {
  const display = String(value).padStart(2, '0')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{    y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 300,
              color: 'var(--color-pink-light)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              //tabularNums: true,
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--color-text-faint)',
      }}>
        {label}
      </span>
    </div>
  )
}

function CountSep() {
  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      fontWeight: 300,
      color: 'var(--color-silver-dim)',
      lineHeight: 1,
      marginBottom: '1.8rem',
      opacity: 0.4,
    }}>:</span>
  )
}

function Ornament() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-silver-dim))' }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
              fill="var(--color-silver)" opacity="0.6" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--color-silver-dim), transparent)' }} />
    </div>
  )
}

function Particles() {
  const dots = [
    { x: '12%',  y: '20%', size: 2, delay: 0    },
    { x: '88%',  y: '15%', size: 1, delay: 0.8  },
    { x: '6%',   y: '65%', size: 3, delay: 1.5  },
    { x: '92%',  y: '60%', size: 2, delay: 0.4  },
    { x: '20%',  y: '85%', size: 1, delay: 2    },
    { x: '78%',  y: '80%', size: 2, delay: 1.2  },
    { x: '50%',  y: '10%', size: 1, delay: 0.6  },
    { x: '35%',  y: '90%', size: 2, delay: 1.8  },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: 'var(--color-silver)',
          }}
          animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: 3 + i * 0.5, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Círculo decorativo grande — fundo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(600px, 90vw)',
        height: 'min(600px, 90vw)',
        borderRadius: '50%',
        border: '1px solid var(--color-border)',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(420px, 70vw)',
        height: 'min(420px, 70vw)',
        borderRadius: '50%',
        border: '1px solid var(--color-border)',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const { days, hours, minutes, seconds, expired } = useCountdown(event.date.iso)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%',  '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }
  const item: Variants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        paddingTop: '64px',
      }}
    >
      <Particles />

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-pink) 8%, transparent) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{ y, opacity, position: 'relative', zIndex: 10 }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
            padding: '0 1.5rem',
          }}
        >
          <motion.p variants={item} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
          }}>
            você está convidado para os
          </motion.p>

          <motion.div variants={item} style={{ lineHeight: 0.9 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 18vw, 11rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(160deg, var(--color-pink-light) 0%, var(--color-pink) 50%, var(--color-pink-deep) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}>
              {event.title}
            </h1>
          </motion.div>

          <motion.p variants={item} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-silver)',
            letterSpacing: '0.08em',
          }}>
            15 anos
          </motion.p>

          <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center' }}>
            <Ornament />
          </motion.div>
          <motion.p variants={item} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            {event.date.display} · {event.date.time}
          </motion.p>

          {!expired && (
            <motion.div
              variants={item}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 'clamp(0.75rem, 3vw, 1.75rem)',
                margin: '0.5rem 0',
              }}
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
          <motion.p variants={item} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
          }}>
            {event.venue.name}
          </motion.p>

          {/* CTA scroll */}
          <motion.button
            variants={item}
            onClick={() => document.querySelector('#detalhes')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-faint)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}>
              rolar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="1" height="32" viewBox="0 0 1 32" fill="none" style={{ overflow: 'visible' }}>
                <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="var(--color-silver-dim)" strokeWidth="1" />
                <circle cx="0.5" cy="30" r="2" fill="var(--color-silver-dim)" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}