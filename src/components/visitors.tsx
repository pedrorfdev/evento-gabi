import { motion } from 'motion/react'
import { MapPin, Phone, Building2, Scissors } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { stagger, fadeUp, diagonalBackground } from '../lib/motion'
import { RevealText } from './ui/reveal-text'
import { DecorativeLine } from './ui/decorative-line'

const containerVariants = stagger(0.1, 0.2)
const itemVariants = fadeUp(24, 0.7)

export function Visitors() {
  const { ref, isInView } = useScrollAnimation({ margin: '-100px' })

  return (
    <section id="visitantes" className="relative px-6 py-40 overflow-hidden text-[var(--color-bg-deep)]">
      {/* Animated Diagonal Background */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={diagonalBackground(1.4)}
        className="absolute inset-0 z-0 origin-top-left"
        style={{ background: 'var(--color-pink-light)' }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto max-w-5xl flex flex-col items-center gap-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6">
          <p className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', opacity: 0.8, color: 'var(--color-bg-deep)' }}>
            {event.visitorsSection.eyebrow}
          </p>
          <RevealText
            as="h2"
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
            text={event.visitorsSection.title}
          />
          <motion.div variants={itemVariants} className="mt-2">
            <DecorativeLine width={120} color="var(--color-bg-deep)" duration={1.2} delay={0.8} />
          </motion.div>
        </motion.div>

        <div className="grid w-full gap-12 md:grid-cols-2 md:gap-8">
          {/* Hotels */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-[var(--color-bg-deep)] pb-3 opacity-80">
              <Building2 size={20} />
              <h3 className="font-display text-2xl">Hospedagem</h3>
            </div>
            <div className="flex flex-col gap-4">
              {event.visitorsSection.hotels.map((hotel, i) => (
                <a
                  key={i}
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-xl p-4 transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                >
                  <span className="font-display text-xl">{hotel.name}</span>
                  <div className="flex items-center gap-2 opacity-80 font-body text-sm">
                    <Phone size={14} />
                    {hotel.phone}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Salons */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-[var(--color-bg-deep)] pb-3 opacity-80">
              <Scissors size={20} />
              <h3 className="font-display text-2xl">Salões de Beleza</h3>
            </div>
            <div className="flex flex-col gap-4">
              {event.visitorsSection.salons.map((salon, i) => (
                <a
                  key={i}
                  href={salon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-xl p-4 transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                >
                  <span className="font-display text-xl">{salon.name}</span>
                  <div className="flex items-center gap-2 opacity-80 font-body text-sm">
                    <Phone size={14} />
                    {salon.phone}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
