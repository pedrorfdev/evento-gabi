import { useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Images } from 'lucide-react'
import { MasonryPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/masonry.css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event, photos } from '../data/event'
import { fadeUp } from '../lib/motion'
import { RevealText } from './ui/reveal-text'
const itemVariants = fadeUp()

const SKY_BG = 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=2000&q=80'

export function Gallery() {
  const { ref, isInView } = useScrollAnimation()
  const [index, setIndex] = useState(-1)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-180, 180])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.4])

  return (
    <section id="galeria" className="px-6 py-48 relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background Parallax Art */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 pointer-events-none opacity-15"
      >
        <img 
          src={SKY_BG} 
          alt="" 
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]" />
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16"
      >
        <motion.div variants={itemVariants} className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)', opacity: 0.8 }}>
            {event.gallerySection.eyebrow}
          </p>
          <RevealText
            as="h2"
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}
            text={event.gallerySection.title}
          />
        </motion.div>

        {photos.length > 0 ? (
          <motion.div variants={itemVariants}>
            <MasonryPhotoAlbum
              photos={photos}
              spacing={16}
              columns={(containerWidth) => {
                if (containerWidth < 520) return 2
                return 3
              }}
              onClick={({ index: photoIndex }) => setIndex(photoIndex)}
            />
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={photos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="card mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
            <Images size={28} style={{ color: 'var(--color-pink)' }} />
            <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              {event.gallerySection.emptyText}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
