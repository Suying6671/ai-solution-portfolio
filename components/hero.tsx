import { profile } from "../content/profile";

const profileSkills = ["需求发现", "Agent / Workflow", "POC 搭建", "客户交付"];

export function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <div className="availability-pill">
          <span className="status-dot" aria-hidden="true" />
          {profile.status}
        </div>
        <p className="hero-position">{profile.position}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-english">{profile.headlineEnglish}</p>
        <p className="hero-intro">{profile.intro}</p>
        <p className="hero-detail">{profile.introDetail}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            查看代表项目
            <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-secondary" href={profile.contact.resumeHref} download>
            下载简历
            <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href="#contact">
            联系我 <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-meta" aria-label="个人信息">
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
          <span>中英双语</span>
        </div>
      </div>

      <div className="profile-window" aria-label="AI Solution Profile">
        <div className="window-toolbar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>AI SOLUTION PROFILE</span>
          <span className="window-status">ACTIVE</span>
        </div>

        <div className="profile-window-body">
          <div className="profile-portrait">
            <img src="/profile.png" alt="万舒畅在城市户外的个人照片" />
            <span>SHANGHAI · CN</span>
          </div>

          <div className="profile-identity">
            <p>PROFILE / 01</p>
            <h2>{profile.name}</h2>
            <span>{profile.englishName}</span>
            <strong>{profile.position}</strong>
          </div>

          <div className="profile-skill-grid" aria-label="核心能力">
            {profileSkills.map((skill, index) => (
              <span key={skill}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {skill}
              </span>
            ))}
          </div>

          <div className="profile-project-list">
            <p>REPRESENTATIVE SYSTEMS</p>
            <div>
              <span>01</span>
              <strong>广告投放素材洞察数字员工</strong>
              <b>→</b>
            </div>
            <div>
              <span>02</span>
              <strong>多语言翻译与质量评估 Agent</strong>
              <b>→</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
