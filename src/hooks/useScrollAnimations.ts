import { useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Retorna { ref, isInView } para disparar animações quando
 * o elemento entra na viewport.
 *
 * @param {object} options
 * @param {boolean} options.once     - anima só na primeira vez (padrão: true)
 * @param {string}  options.margin   - margem antes de entrar (padrão: '-80px')
 */
export function useScrollAnimation({ once = true, margin = '-80px' }: { once?: boolean; margin?: string } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: margin as any })
  return { ref, isInView }
}