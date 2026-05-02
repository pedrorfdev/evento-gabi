import { motion } from 'motion/react'
import { MessageCircle, Send } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { fadeUp } from '../lib/motion'
import { RevealText } from './ui/reveal-text'

const itemVariants = fadeUp()

function whatsappUrl() {
  const phone = event.rsvp.phone || event.social.whatsapp
  if (!phone) return ''

  const cleanPhone = phone.replace(/\D/g, '')
  const message = encodeURIComponent(event.rsvpSection.whatsappMessage)
  return `https://wa.me/${cleanPhone}?text=${message}`
}

export function Rsvp() {
  const { ref, isInView } = useScrollAnimation()
  const whatsUrl = whatsappUrl()

  return (
    <section id="confirmar" className="relative overflow-hidden px-6 py-48" style={{ background: 'var(--color-bg-deep)' }}>
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'color-mix(in srgb, var(--color-pink) 10%, transparent)' }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.p variants={itemVariants} className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)', opacity: 0.8 }}>
            {event.rsvpSection.eyebrow}
          </motion.p>

          <RevealText 
            as="h2" 
            className="font-display font-light leading-tight" 
            style={{ fontSize: 'clamp(2.7rem, 8vw, 5rem)', color: 'var(--color-text-primary)' }}
            text={event.rsvpSection.title}
          />
        </div>

        <motion.p variants={itemVariants} className="font-body leading-relaxed" style={{ fontSize: '15px', color: 'var(--color-text-muted)', maxWidth: '520px' }}>
          {event.rsvpSection.description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
          {event.rsvp.formUrl ? (
            <motion.a
              href={event.rsvp.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-body text-xs uppercase tracking-widest btn-premium focus-ring"
            >
              <Send size={15} />
              {event.rsvpSection.primaryLabel}
            </motion.a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-body text-xs uppercase tracking-widest opacity-60"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
            >
              <Send size={15} />
              {event.rsvpSection.formUnavailable}
            </button>
          )}

          {whatsUrl && (
            <motion.a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 font-body text-xs uppercase tracking-widest transition-all duration-300 focus-ring hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
              style={{ borderColor: 'var(--color-border-md)', color: 'var(--color-text-muted)' }}
            >
              <MessageCircle size={15} />
              {event.rsvpSection.secondaryLabel}
            </motion.a>
          )}
        </motion.div>

        <motion.p variants={itemVariants} className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--color-text-faint)' }}>
          {event.rsvp.deadline}
        </motion.p>
      </motion.div>
    </section>
  )
}
