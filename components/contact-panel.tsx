"use client";

import { useState } from "react";
import { profile } from "../content/profile";
import { buildMailtoHref, copyWithFallback } from "../lib/contact";

export function ContactPanel() {
  const [status, setStatus] = useState("");
  const mailtoHref = buildMailtoHref(profile.contact.email, "企业 AI / Agent 岗位沟通");

  async function copyWechat() {
    try {
      await copyWithFallback(profile.contact.wechat);
      setStatus("微信号已复制，可以直接去微信添加我");
    } catch {
      setStatus(`请手动复制微信号：${profile.contact.wechat}`);
    }
  }

  return (
    <section className="contact-panel section-shell" id="contact">
      <div className="contact-intro">
        <p className="eyebrow eyebrow-light">LET&apos;S BUILD SOMETHING USEFUL</p>
        <h2>如果你正在寻找能把企业 AI 方案真正做出来的人</h2>
        <p>
          我期待参与企业 AI、Agent 应用交付、AI 产品与解决方案工作，也欢迎交流真实业务里的 AI 落地问题。
        </p>
      </div>

      <div className="contact-actions">
        <a className="contact-action" href={mailtoHref}>
          <span>邮件联系</span>
          <strong>{profile.contact.email}</strong>
          <b aria-hidden="true">↗</b>
        </a>
        <button className="contact-action" type="button" onClick={copyWechat}>
          <span>微信联系</span>
          <strong>点击复制微信号</strong>
          <b aria-hidden="true">＋</b>
        </button>
        <a className="contact-action" href={profile.contact.resumeHref} download>
          <span>完整资料</span>
          <strong>下载 PDF 简历</strong>
          <b aria-hidden="true">↓</b>
        </a>
        <p className="copy-status" aria-live="polite">{status}</p>
      </div>
    </section>
  );
}
