import { motion } from 'motion/react'
import { Shirt } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export function DressCode() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id="dresscode"
      className="py-24 px-6"
      style={{ background: 'var(--color-bg-deep)' }}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8"
      >
        {/* Ícone */}
        <motion.div
          variants={itemVariants}
          className="w-14 h-14 rounded-full flex items-center justify-center border"
          style={{ borderColor: 'var(--color-border-md)', color: 'var(--color-pink)' }}
        >
          <Shirt size={22} />
        </motion.div>

        {/* Pré-título */}
        <motion.p
          variants={itemVariants}
          className="font-body uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)' }}
        >
          como se vestir
        </motion.p>

        {/* Título */}
        <motion.h2
          variants={itemVariants}
          className="font-display font-light leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}
        >
          {event.dressCode.title}
        </motion.h2>

        {/* Ornamento */}
        <motion.div variants={itemVariants} className="w-full max-w-xs flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-silver-dim))' }} />
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="var(--color-silver)" opacity="0.6" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--color-silver-dim), transparent)' }} />
        </motion.div>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="font-body leading-relaxed"
          style={{ fontSize: '15px', color: 'var(--color-text-muted)', maxWidth: '420px' }}
        >
          {event.dressCode.description}
        </motion.p>

        {/* Nota de destaque */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 px-6 py-3 rounded-full border"
          style={{ borderColor: 'var(--color-border-md)', background: 'color-mix(in srgb, var(--color-pink) 5%, transparent)' }}
        >
          <span style={{ color: 'var(--color-pink)', fontSize: '14px' }}>✦</span>
          <p
            className="font-body"
            style={{ fontSize: '13px', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}
          >
            {event.dressCode.note}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}