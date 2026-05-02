import { motion } from 'motion/react'
import { CalendarDays, MapPin, MessageCircle, Shirt } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { stagger, lockInLeft, lockInRight } from '../lib/motion'
import { RevealText } from './ui/reveal-text'

const icons = {
  date: CalendarDays,
  venue: MapPin,
  dress: Shirt,
  rsvp: MessageCircle,
}

const containerVariants = stagger(0.1, 0.2)
const cardVariants = lockInRight()
const imageVariants = lockInLeft()

export function Details() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="detalhes" className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-48" style={{ background: 'var(--color-bg)' }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-border-md), transparent)' }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 text-center"
      >
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <motion.p variants={cardVariants} className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)', opacity: 0.8 }}>
            {event.details.eyebrow}
          </motion.p>
          <RevealText 
            as="h2" 
            className="font-display font-light leading-tight" 
            style={{ fontSize: 'clamp(2.35rem, 7vw, 4.5rem)', color: 'var(--color-text-primary)' }} 
            text={event.details.title}
            delay={0.2}
          />
        </div>

        <div className="w-full grid gap-12 lg:gap-0 lg:grid-cols-[1fr_160px_1.1fr] items-center text-left">
          <motion.div variants={imageVariants} className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div
              className="absolute inset-x-8 bottom-0 h-1/2 rounded-full blur-3xl"
              style={{ background: 'color-mix(in srgb, var(--color-pink) 16%, transparent)' }}
            />
            <img
              src={event.details.image}
              alt={event.name}
              className="relative z-10 mx-auto h-auto max-h-[500px] w-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          <div className="pointer-events-none relative hidden h-72 items-center justify-center lg:flex">
            <svg width="160" height="180" viewBox="0 0 160 180" fill="none" className="overflow-visible">
              <motion.path
                d="M 10 95 C 50 75, 100 70, 148 88"
                stroke="var(--color-pink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="6 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.55, ease: 'easeInOut' }}
              />
              <motion.path
                d="M 140 80 L 150 88 L 140 96"
                stroke="var(--color-pink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.35, delay: 1.6, ease: 'easeOut' }}
              />
            </svg>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {event.details.cards.map((card) => {
              const Icon = icons[card.key as keyof typeof icons] ?? CalendarDays
              return (
                <motion.article key={card.key} variants={cardVariants} className="card flex min-h-36 flex-col gap-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--color-text-faint)' }}>
                      {card.label}
                    </span>
                    <Icon size={18} style={{ color: 'var(--color-pink)' }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-light" style={{ fontSize: '1.55rem', color: 'var(--color-text-primary)' }}>
                      {card.title}
                    </h3>
                    <p className="font-body leading-relaxed" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                      {card.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
