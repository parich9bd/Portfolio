export default function SectionHeading({ index, id, children }: { index: string; id: string; children: string }) {
  return (
    <header className="sec-head reveal">
      <span className="mono">{index}</span>
      <h2 id={id}>{children}</h2>
    </header>
  )
}
