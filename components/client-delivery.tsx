import { profile } from "../content/profile";

export function ClientDelivery() {
  return (
    <section className="delivery-section">
      <div className="section-shell">
        <div className="delivery-heading">
          <div>
            <p className="mono-label">CLIENT DELIVERY</p>
            <h2>让 AI 从一次演示走到持续交付</h2>
          </div>
          <p>从客户现场获取信号，用真实结果推动上线、迭代与跨场景复制。</p>
        </div>

        <ol className="delivery-flow">
          {profile.deliverySteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>

        <div className="client-group-grid">
          {profile.clientGroups.map((group) => (
            <article key={group.title}>
              <p>{group.title}</p>
              <h3>{group.clients}</h3>
              <span>{group.detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
