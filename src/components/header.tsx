import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { label: 'Detalhes',  href: '#detalhes'  },
  { label: 'Presentes', href: '#presentes' },
  { label: 'Galeria',   href: '#galeria'   },
  { label: 'Confirmar', href: '#confirmar', highlight: true },
]

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha menu no resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled
            ? 'color-mix(in srgb, var(--color-bg-deep) 85%, transparent)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo — monograma */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--color-pink)',
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            G.
          </button>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
               className="hidden md:flex">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: link.highlight ? 'var(--color-pink)' : 'var(--color-text-muted)',
                  background: 'none',
                  border: link.highlight ? '1px solid var(--color-border-md)' : 'none',
                  borderRadius: '2rem',
                  padding: link.highlight ? '0.4rem 1.1rem' : '0',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-pink-light)' }}
                onMouseLeave={e => { e.currentTarget.style.color = link.highlight ? 'var(--color-pink)' : 'var(--color-text-muted)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Ações direita */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Toggle tema */}
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-md)'
                e.currentTarget.style.color = 'var(--color-silver)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark'
                    ? <Sun  size={15} />
                    : <Moon size={15} />
                  }
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Hambúrguer mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              className="flex md:hidden"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 40,
              background: 'color-mix(in srgb, var(--color-bg-deep) 95%, transparent)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { scrollTo(link.href); setMenuOpen(false) }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: link.highlight ? 'var(--color-pink)' : 'var(--color-text-muted)',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  width: '100%',
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