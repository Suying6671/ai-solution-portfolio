type Capability = {
  number: string;
  title: string;
  description: string;
};

export function CapabilityGrid({ capabilities }: { capabilities: readonly Capability[] }) {
  return (
    <div className="capability-grid">
      {capabilities.map((capability) => (
        <article className="capability-card" key={capability.number}>
          <div className="capability-topline">
            <span>{capability.number}</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h3>{capability.title}</h3>
          <p>{capability.description}</p>
        </article>
      ))}
    </div>
  );
}
