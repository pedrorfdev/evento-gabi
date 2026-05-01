import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { label: 'Detalhes',  href: '#detalhes'  },
  { label: 'Presentes', href: '#presentes' },
  { label: 'Galeria',   href: '#galeria'   },
  { label: 'Confirmar', href: '#confirmar', cta: true },
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b backdrop-blur-lg'
            : 'border-b border-transparent'
        )}
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--color-bg-deep) 85%, transparent)' : 'transparent',
          borderColor: scrolled ? 'var(--color-border)' : 'transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl leading-none transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-pink)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            G.
          </button>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={clsx(
                  'font-body text-xs uppercase tracking-widest transition-colors duration-200 bg-transparent border-0 cursor-pointer',
                  link.cta
                    ? 'px-4 py-1.5 rounded-full border'
                    : 'hover:opacity-100 opacity-60 hover:opacity-100'
                )}
                style={{
                  fontFamily: 'var(--font-body)',
                  color: link.cta ? 'var(--color-pink)' : 'var(--color-text-muted)',
                  borderColor: link.cta ? 'var(--color-border-md)' : undefined,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {/* Toggle tema */}
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-200 bg-transparent cursor-pointer"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Hambúrguer mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border bg-transparent cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl border-b flex flex-col px-6 py-2"
            style={{
              background: 'color-mix(in srgb, var(--color-bg-deep) 95%, transparent)',
              borderColor: 'var(--color-border)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { scrollTo(link.href); setMenuOpen(false) }}
                className="font-body text-sm uppercase tracking-widest text-left py-4 border-b bg-transparent border-x-0 border-t-0 cursor-pointer w-full"
                style={{
                  borderColor: 'var(--color-border)',
                  color: link.cta ? 'var(--color-pink)' : 'var(--color-text-muted)',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}