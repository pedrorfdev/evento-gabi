import { motion } from 'motion/react'
import { CalendarDays, MapPin, MessageCircle, Shirt } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { stagger, fadeInLeft, fadeInRight } from '../lib/motion'

const icons = {
  date: CalendarDays,
  venue: MapPin,
  dress: Shirt,
  rsvp: MessageCircle,
}

const containerVariants = stagger(0.1, 0.2)
const cardVariants = fadeInRight()
const imageVariants = fadeInLeft()

export function Details() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="detalhes" className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-28" style={{ background: 'var(--color-bg)' }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-border-md), transparent)' }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative mx-auto grid max-w-7xl items-center gap-12 lg:gap-6 lg:grid-cols-[1fr_160px_1.1fr]"
      >
        <motion.div variants={imageVariants} className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            className="absolute inset-x-8 bottom-0 h-1/2 rounded-full blur-3xl"
            style={{ background: 'color-mix(in srgb, var(--color-pink) 16%, transparent)' }}
          />
          <img
            src={event.details.image}
            alt={event.name}
            className="relative z-10 mx-auto h-auto max-h-[600px] w-full object-contain drop-shadow-2xl"
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

        <motion.div variants={containerVariants} className="flex flex-col gap-6">
          <motion.div variants={cardVariants} className="flex flex-col gap-3 text-center lg:text-left">
            <p className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)' }}>
              {event.details.eyebrow}
            </p>
            <h2 className="font-display font-light leading-tight" style={{ fontSize: 'clamp(2.35rem, 7vw, 4.5rem)', color: 'var(--color-text-primary)' }}>
              {event.details.title}
            </h2>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {event.details.cards.map((card) => {
              const Icon = icons[card.key as keyof typeof icons] ?? CalendarDays
              return (
                <motion.article key={card.key} variants={cardVariants} className="card flex min-h-36 flex-col gap-4 p-5">
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
        </motion.div>
      </motion.div>
    </section>
  )
}
