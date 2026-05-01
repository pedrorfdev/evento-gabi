import type { Variants, Transition } from 'motion/react'

// ─── Shared easing ────────────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const

// ─── Reusable transitions ─────────────────────────────────────────────────────
export const transitions = {
  spring: { type: 'spring', stiffness: 260, damping: 20 } satisfies Transition,
  smooth: (duration = 0.65) => ({ duration, ease }) satisfies Transition,
}

// ─── Stagger containers ──────────────────────────────────────────────────────
export const stagger = (staggerChildren = 0.1, delayChildren = 0.2): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

// ─── Item variants ───────────────────────────────────────────────────────────
export const fadeUp = (y = 24, duration = 0.65): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
})

export const fadeInLeft = (x = -52, duration = 0.85): Variants => ({
  hidden: { opacity: 0, x, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration, ease } },
})

export const fadeInRight = (x = 36, duration = 0.65): Variants => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { duration, ease } },
})

export const scaleIn = (duration = 0.5): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration, ease } },
})

// ─── AnimatePresence helpers ─────────────────────────────────────────────────
export const countFlip = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
  transition: { duration: 0.3, ease },
}

export const expandCard = {
  initial: { opacity: 0, y: 24, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.95 },
  transition: { duration: 0.4, ease },
}

export const labelSwap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
}
