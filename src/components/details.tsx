import { motion } from 'motion/react'
import { CalendarDays, MapPin, MessageCircle, Shirt } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'

const icons = {
  date: CalendarDays,
  venue: MapPin,
  dress: Shirt,
  rsvp: MessageCircle,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export function Details() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="detalhes" className="relative overflow-hidden px-6 py-24" style={{ background: 'var(--color-bg)' }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-border-md), transparent)' }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_160px_1fr]"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -52, scale: 0.96 },
            visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as const } },
          }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div
            className="absolute inset-x-8 bottom-0 h-1/2 rounded-full blur-3xl"
            style={{ background: 'color-mix(in srgb, var(--color-pink) 16%, transparent)' }}
          />
          <img
            src={event.details.image}
            alt={event.name}
            className="relative z-10 mx-auto h-auto max-h-[560px] w-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        <div className="pointer-events-none relative hidden h-72 items-center justify-center lg:flex">
          <svg width="160" height="180" viewBox="0 0 160 180" fill="none" className="overflow-visible">
            <motion.path
              d="M8 102C48 58 88 48 132 74C150 85 149 110 126 119"
              stroke="var(--color-pink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.55, ease: 'easeInOut' }}
            />
            <motion.path
              d="M126 119L146 111L135 94"
              stroke="var(--color-pink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.45, delay: 1.55, ease: 'easeOut' }}
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
                <motion.article
                  key={card.key}
                  variants={cardVariants}
                  className="card flex min-h-36 flex-col gap-4 p-5"
                >
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
