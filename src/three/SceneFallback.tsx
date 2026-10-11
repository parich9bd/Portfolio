// Pure-CSS stand-in used when WebGL is unavailable or the scene fails.
export default function SceneFallback() {
  return <div className="orb" aria-hidden="true" />
}
