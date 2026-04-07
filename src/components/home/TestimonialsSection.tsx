'use client'

import { useEffect, useRef } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HOMEPAGE_TESTIMONIALS as testimonials } from '@/lib/testimonials'
import { SCROLL_STAGES } from '@/lib/homepage-data'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export default function TestimonialsSection() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined' || window.innerWidth < 1024) return

    const ctx = gsap.context(() => {
      testimonials.forEach((_, index) => {
        const testimonialEl = document.querySelector(`[data-testimonial="${index}"]`)
        if (!testimonialEl) return

        gsap.timeline({
          scrollTrigger: {
            trigger: testimonialEl,
            start: 'top top',
            end: `+=${SCROLL_STAGES.testimonialEach}`,
            pin: true,
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const variants = prefersReduced ? reducedMotionVariants : itemVariants

  return (
    <section
      ref={sectionRef}
      className="relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="min-h-screen flex flex-col">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            data-testimonial={index}
            className="flex-1 flex items-center justify-center px-6 py-16 md:px-12"
          >
            <m.div
              variants={prefersReduced ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="max-w-4xl mx-auto text-center"
            >
              <m.blockquote
                variants={variants}
                className="font-display text-2xl md:text-4xl text-text-primary leading-relaxed mb-8"
              >
                &ldquo;{testimonial.quote}&rdquo;
              </m.blockquote>

              <m.cite
                variants={variants}
                className="text-text-secondary text-sm md:text-base"
              >
                <span className="font-semibold text-text-primary">{testimonial.author}</span>
                {testimonial.role && (
                  <>
                    <br />
                    <span className="text-gold">{testimonial.role}</span>
                  </>
                )}
              </m.cite>
            </m.div>
          </div>
        ))}
      </div>
    </section>
  )
}