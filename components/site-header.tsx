"use client";

import { useState } from "react";

const navItems = [
  { href: "#projects", label: "代表项目" },
  { href: "#method", label: "搭建方法" },
  { href: "#experience", label: "工作经历" },
  { href: "#contact", label: "联系" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="万舒畅个人主页">
          <span className="brand-mark" aria-hidden="true">WS</span>
          <span className="brand-name">
            万舒畅
            <small>AI SOLUTION BUILDER</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav
          id="site-navigation"
          className={open ? "site-navigation is-open" : "site-navigation"}
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="/wan-shuchang-resume.pdf"
            download
            onClick={() => setOpen(false)}
          >
            下载简历 <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
