import { motion } from 'motion/react'
import { ExternalLink, Gift } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event, gifts } from '../data/event'

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

export function Gifts() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="presentes" className="px-6 py-24" style={{ background: 'var(--color-bg-deep)' }}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto flex max-w-6xl flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)' }}>
            {event.giftsSection.eyebrow}
          </p>
          <h2 className="font-display font-light leading-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}>
            {event.giftsSection.title}
          </h2>
        </motion.div>

        {gifts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gifts.map((gift) => (
              <motion.article key={gift.name} variants={itemVariants} className="card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden" style={{ background: 'var(--color-surface-2)' }}>
                  <img src={gift.image} alt={gift.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-light" style={{ fontSize: '1.45rem', color: 'var(--color-text-primary)' }}>
                      {gift.name}
                    </h3>
                    {gift.price && (
                      <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {gift.price}
                      </p>
                    )}
                  </div>
                  <motion.a
                    href={gift.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-body text-xs uppercase tracking-widest"
                    style={{ borderColor: 'var(--color-border-md)', color: 'var(--color-text-muted)' }}
                  >
                    <ExternalLink size={14} />
                    {event.giftsSection.buttonLabel}
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div variants={itemVariants} className="card mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
            <Gift size={28} style={{ color: 'var(--color-pink)' }} />
            <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              {event.giftsSection.emptyText}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
