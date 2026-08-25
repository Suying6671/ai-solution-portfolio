type ToolkitItem = {
  title: string;
  detail: string;
};

export function Toolkit({ items }: { items: readonly ToolkitItem[] }) {
  return (
    <section className="content-section section-shell toolkit-section" id="toolkit">
      <div className="section-heading section-heading-split">
        <div className="section-kicker">
          <span>05</span>
          <p>PRODUCT &amp; TECH TOOLKIT</p>
        </div>
        <div>
          <h2>能做方案，也能下场搭建。</h2>
          <p>工具服务于验证和交付，不用技术名词替代业务结果。</p>
        </div>
      </div>
      <div className="toolkit-table">
        {items.map((item, index) => (
          <div key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
