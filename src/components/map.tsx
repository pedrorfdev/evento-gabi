import { motion } from 'motion/react'
import { MapPin, Navigation } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export function Map() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id="local"
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto flex flex-col gap-8"
      >
        {/* Cabeçalho */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-3">
          <p
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)' }}
          >
            onde vai ser
          </p>
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}
          >
            Localização
          </h2>
        </motion.div>

        {/* Embed do mapa */}
        <motion.div
          variants={itemVariants}
          className="w-full overflow-hidden rounded-2xl border"
          style={{ borderColor: 'var(--color-border)', aspectRatio: '16/7' }}
        >
          {event.venue.mapsEmbed ? (
            <iframe
              src={event.venue.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa — ${event.venue.name}`}
            />
          ) : (
            /* Placeholder enquanto não tem o embed */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: 'var(--color-surface)' }}
            >
              <MapPin size={28} style={{ color: 'var(--color-pink)', opacity: 0.5 }} />
              <p
                className="font-body"
                style={{ fontSize: '13px', color: 'var(--color-text-faint)', letterSpacing: '0.05em' }}
              >
                mapa em breve
              </p>
            </div>
          )}
        </motion.div>

        {/* Info do local + botão */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0"
              style={{ borderColor: 'var(--color-border-md)', color: 'var(--color-pink)' }}
            >
              <MapPin size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <p
                className="font-display"
                style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}
              >
                {event.venue.name}
              </p>
              {event.venue.address && (
                <p
                  className="font-body"
                  style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
                >
                  {event.venue.address}
                </p>
              )}
            </div>
          </div>

          {/* Botão como chegar */}
          <motion.a
            href={event.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-body text-xs uppercase tracking-widest transition-colors duration-200 flex-shrink-0"
            style={{
              borderColor: 'var(--color-border-md)',
              color: 'var(--color-text-muted)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-pink)'; e.currentTarget.style.borderColor = 'var(--color-pink)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border-md)' }}
          >
            <Navigation size={13} />
            Como chegar
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}