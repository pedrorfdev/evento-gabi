import { useState } from 'react'
import { motion } from 'motion/react'
import { Images } from 'lucide-react'
import { MasonryPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/masonry.css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useScrollAnimation } from '../hooks/useScrollAnimations'
import { event, photos } from '../data/event'
import { fadeUp } from '../lib/motion'

const itemVariants = fadeUp()

export function Gallery() {
  const { ref, isInView } = useScrollAnimation()
  const [index, setIndex] = useState(-1)

  return (
    <section id="galeria" className="px-6 py-24" style={{ background: 'var(--color-bg)' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto flex max-w-6xl flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="font-body uppercase" style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'var(--color-text-faint)' }}>
            {event.gallerySection.eyebrow}
          </p>
          <h2 className="font-display font-light leading-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-primary)' }}>
            {event.gallerySection.title}
          </h2>
        </motion.div>

        {photos.length > 0 ? (
          <motion.div variants={itemVariants}>
            <MasonryPhotoAlbum
              photos={photos}
              spacing={12}
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
