import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import SceneFallback from './SceneFallback'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HeroScene = lazy(() => import('./HeroScene'))

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}

// Mounts the heavy 3D chunk only after first paint (idle), and pauses it offscreen.
export default function SceneHost() {
  const host = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [webgl] = useState(hasWebGL)

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const id = idle(() => setReady(true))
    return () => cancel(id as number)
  }, [])

  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={host} className="scene" aria-hidden="true">
      <SceneFallback />
      {webgl && ready && (
        <Boundary>
          <Suspense fallback={null}>
            <HeroScene active={visible} reduced={reduced} />
          </Suspense>
        </Boundary>
      )}
    </div>
  )
}
