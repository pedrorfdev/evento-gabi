import { motion } from 'motion/react'
//import { Instagram } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { transitions } from '../lib/motion'

// Ícone WhatsApp (Lucide não tem, SVG manual)
function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.558 4.112 1.532 5.836L.054 23.25a.75.75 0 0 0 .916.932l5.555-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.723 9.723 0 0 1-4.951-1.349l-.355-.212-3.683.967.985-3.595-.232-.37A9.722 9.722 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  )
}

export function Footer() {
  const { ref, isInView } = useScrollAnimation({ margin: '-40px' })

  const hasSocial = event.social.instagram || event.social.whatsapp

  return (
    <footer
      className="pt-16 pb-10 px-6"
      style={{ background: 'var(--color-bg-deep)', borderTop: '1px solid var(--color-border)' }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={transitions.smooth(0.7)}
        className="max-w-4xl mx-auto flex flex-col items-center gap-8"
      >
        {/* Nome e hashtag */}
        <div className="flex flex-col items-center gap-2">
          <h2
            className="font-display font-light"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--color-pink-light)' }}
          >
            {event.title}
          </h2>
          <p
            className="font-display italic font-light"
            style={{ fontSize: '1.1rem', color: 'var(--color-silver-dim)' }}
          >
            15 anos
          </p>
        </div>

        {/* Ornamento */}
        <div className="w-full max-w-xs flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-silver-dim))' }} />
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="var(--color-silver)" opacity="0.4" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--color-silver-dim), transparent)' }} />
        </div>

        {/* Data */}
        <p
          className="font-body uppercase text-center"
          style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'var(--color-text-faint)' }}
        >
          {event.date.display} · {event.date.time} · {event.venue.name}
        </p>

        {/* Redes sociais */}
        {hasSocial && (
          <div className="flex items-center gap-6">
            {event.social.instagram && (
              <motion.a
                href={`https://instagram.com/${event.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 font-body transition-colors duration-200 focus-ring cursor-pointer hover:text-[var(--color-pink)]"
                style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
              >
                {/* <Instagram size={16} /> */}
                @{event.social.instagram}
              </motion.a>
            )}

            {event.social.instagram && event.social.whatsapp && (
              <div className="w-px h-4" style={{ background: 'var(--color-border-md)' }} />
            )}

            {event.social.whatsapp && (
              <motion.a
                href={`https://wa.me/${event.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 font-body transition-colors duration-200 focus-ring cursor-pointer hover:text-[var(--color-pink)]"
                style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
              >
                <WhatsAppIcon size={15} />
                Dúvidas
              </motion.a>
            )}
          </div>
        )}

        {/* Hashtag */}
        {event.hashtag && (
          <p
            className="font-body"
            style={{ fontSize: '13px', color: 'var(--color-text-faint)', letterSpacing: '0.05em' }}
          >
            {event.hashtag}
          </p>
        )}

        {/* Crédito */}
        <p
          className="font-body"
          style={{ fontSize: '11px', color: 'var(--color-text-faint)', opacity: 0.5, marginTop: '0.5rem' }}
        >
          feito com carinho
        </p>
      </motion.div>
    </footer>
  )
}