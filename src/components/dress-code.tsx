import { motion } from 'motion/react'
import { Shirt } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event } from '../data/event'
import { fadeUp, stagger } from '../lib/motion'
import { RevealText } from './ui/reveal-text'

const itemVariants = fadeUp(24, 0.7)
const containerVariants = stagger(0.1, 0.1)

function ColorCircle({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] shadow-sm"
        style={{ background: color }}
      />
      <span className="font-body text-[10px] uppercase tracking-widest opacity-60">{name}</span>
    </div>
  )
}

export function DressCode() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id="dresscode"
      className="py-48 px-6 relative overflow-hidden"
      style={{ background: 'var(--color-bg-deep)' }}
    >
      {/* Background Accent - Unique to Dress Code */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'var(--color-pink-night)' }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10 relative z-10"
      >
        {/* Ícone */}
        <motion.div
          variants={itemVariants}
          className="w-14 h-14 rounded-full flex items-center justify-center border"
          style={{ borderColor: 'var(--color-border-md)', color: 'var(--color-pink)' }}
        >
          <Shirt size={22} />
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          {/* Pré-título */}
          <motion.p
            variants={itemVariants}
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)', opacity: 0.8 }}
          >
            como se vestir
          </motion.p>

          {/* Título */}
          <RevealText
            as="h2"
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}
            text={event.dressCode.title}
          />
        </div>

        {/* Palette - New visual element */}
        <motion.div 
          variants={itemVariants}
          className="flex gap-6 sm:gap-10 py-4"
        >
          <ColorCircle color="#EF87AC" name="Rosa" />
          <ColorCircle color="#D4D4E0" name="Prata" />
          <ColorCircle color="#BF9B4A" name="Dourado" />
        </motion.div>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="font-body leading-relaxed"
          style={{ fontSize: '15px', color: 'var(--color-text-muted)', maxWidth: '480px' }}
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
