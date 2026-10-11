import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from '../components/Button'
import SceneHost from '../three/SceneHost'
import { site } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Single coordinated entrance timeline. gsap.context handles cleanup.
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__line span', { yPercent: 110, duration: 1, stagger: 0.12 })
        .from('.hero__meta > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')
        .from('.scene', { opacity: 0, scale: 0.92, duration: 1.4 }, 0)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="home" className="hero" ref={root} aria-labelledby="hero-title">
      <SceneHost />
      <div className="hero__copy">
        <p className="mono hero__kicker">{site.brand} — {site.title}</p>
        <h1 id="hero-title">
          <span className="sr-only">{site.brand}: </span>
          {site.headline.map((l) => <span className="hero__line" key={l}><span>{l}</span></span>)}
        </h1>
        <div className="hero__meta">
          <p>{site.intro}</p>
          <div className="row">
            <Button href="#projects">Explore my work</Button>
            <Button href="#contact" variant="ghost">Let’s connect</Button>
          </div>
        </div>
      </div>
      <a className="scroll-cue mono" href="#about">Scroll</a>
    </section>
  )
}
