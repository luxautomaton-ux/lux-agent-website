"use client";

import { useEffect, useState } from "react";
import LuxMarketingPage from "@/app/lux-marketing/page";
import WorkshopStudio from "@/components/admin/WorkshopStudio";
import { basePath, prefixPath } from "@/lib/prefix";
import { LUX_ADMIN_EMAIL, LUX_ADMIN_UID, supabase } from "@/lib/supabase";

type AdminTab = "workshops" | "analytics" | "marketing";
type AuthState = "loading" | "signed-out" | "authorized" | "denied";

function AdminLogin() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const sendMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setMessage("");
    const redirectTo = `${window.location.origin}${basePath}/admin`;
    const { error } = await supabase.auth.signInWithOtp({
      email: LUX_ADMIN_EMAIL,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false },
    });
    setSending(false);
    setMessage(error ? error.message : "Secure sign-in link sent. Check the Lux Automaton email inbox.");
  };

  return (
    <main className="admin-auth-world circuit-grid" style={{ "--admin-bg": `url("${prefixPath("/images/admin-lux-office.png")}")` } as React.CSSProperties}>
      <section className="admin-auth-card">
        <div className="admin-auth-mark">LUX</div>
        <p>Private administration</p>
        <h1>Lux OS Admin Studio</h1>
        <span>Secure access to Workshop Studio, system analytics, and Lux Marketing. A one-time sign-in link will be sent to the authorized Lux Automaton account.</span>
        <form onSubmit={sendMagicLink}>
          <label>
            <span>Authorized administrator</span>
            <input value={LUX_ADMIN_EMAIL} readOnly aria-label="Authorized administrator email" />
          </label>
          <button type="submit" disabled={sending}>{sending ? "Sending secure link…" : "Email secure sign-in link"}</button>
        </form>
        {message && <div className="admin-auth-message">{message}</div>}
        <small>Access is enforced by Supabase authentication and database security policies.</small>
      </section>
    </main>
  );
}

function AdminAnalytics() {
  const metrics = [
    { label: "Workshop publishing", value: "Live", detail: "Supabase connected" },
    { label: "Media library", value: "100 MB", detail: "Per uploaded asset" },
    { label: "Content channels", value: "2", detail: "Lux Automaton + AI Kids" },
    { label: "Admin security", value: "RLS", detail: "Owner-only publishing" },
  ];

  return (
    <section className="admin-analytics">
      <header><p>System overview</p><h1>Lux publishing operations</h1><span>The content control layer for workshops, media, marketing, and community learning.</span></header>
      <div className="admin-metric-grid">
        {metrics.map((metric) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></article>)}
      </div>
      <div className="admin-activity-panel">
        <div><b>Workshop Studio</b><span>Create → enrich → preview → publish</span></div>
        <div><b>Public Academy</b><span>Published workshops sync to the main Workshops page</span></div>
        <div><b>Media storage</b><span>Original images, video, and PDF resources</span></div>
      </div>
    </section>
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [activeTab, setActiveTab] = useState<AdminTab>("workshops");

  useEffect(() => {
    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;
      setAuthState(!userId ? "signed-out" : userId === LUX_ADMIN_UID ? "authorized" : "denied");
    };
    syncSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user.id;
      setAuthState(!userId ? "signed-out" : userId === LUX_ADMIN_UID ? "authorized" : "denied");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (authState === "loading") return <main className="admin-auth-world"><p className="admin-loading">Securing Lux Admin Studio…</p></main>;
  if (authState === "signed-out") return <AdminLogin />;
  if (authState === "denied") {
    return (
      <main className="admin-auth-world" style={{ "--admin-bg": `url("${prefixPath("/images/admin-lux-office.png")}")` } as React.CSSProperties}>
        <section className="admin-auth-card">
          <p>Access denied</p><h1>This account is not a Lux administrator.</h1>
          <button type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-world" style={{ "--admin-bg": `url("${prefixPath("/images/admin-lux-office.png")}")` } as React.CSSProperties}>
      <header className="admin-command-bar">
        <div className="admin-command-brand"><span>⚙</span><div><b>Lux OS Admin Workspace</b><small>Authenticated · Workshop database online</small></div></div>
        <nav aria-label="Admin workspace">
          <button type="button" className={activeTab === "workshops" ? "active" : ""} onClick={() => setActiveTab("workshops")}>Workshop Studio</button>
          <button type="button" className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>System Analytics</button>
          <button type="button" className={activeTab === "marketing" ? "active" : ""} onClick={() => setActiveTab("marketing")}>Marketing Studio</button>
        </nav>
        <button type="button" className="admin-signout" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </header>

      {activeTab === "workshops" && <WorkshopStudio />}
      {activeTab === "analytics" && <AdminAnalytics />}
      {activeTab === "marketing" && <div className="admin-marketing-shell"><LuxMarketingPage /></div>}
    </main>
  );
}
