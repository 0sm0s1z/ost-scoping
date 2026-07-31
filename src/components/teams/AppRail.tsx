"use client";

import {
  IconActivity,
  IconApps,
  IconCalendar,
  IconCalls,
  IconChat,
  IconFiles,
  IconTeams,
} from "./icons";

const navItems = [
  { id: "activity", label: "Activity", icon: IconActivity },
  { id: "chat", label: "Chat", icon: IconChat, active: true },
  { id: "teams", label: "Teams", icon: IconTeams },
  { id: "calendar", label: "Calendar", icon: IconCalendar },
  { id: "calls", label: "Calls", icon: IconCalls },
  { id: "files", label: "OneDrive", icon: IconFiles },
  { id: "apps", label: "Apps", icon: IconApps },
] as const;

export function AppRail() {
  return (
    <nav className="t-rail" aria-hidden>
      <div className="t-rail-top">
        <button type="button" className="t-rail-waffle" tabIndex={-1}>
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
            <path d="M3 3h3v3H3V3zm0 5h3v3H3V8zm0 5h3v3H3v-3zm5-10h3v3H8V3zm0 5h3v3H8V8zm0 5h3v3H8v-3zm5-10h3v3h-3V3zm0 5h3v3h-3V8zm0 5h3v3h-3v-3z" />
          </svg>
        </button>
      </div>

      <ul className="t-rail-nav">
        {navItems.map(({ id, label, icon: Icon, ...item }) => {
          const active = "active" in item && item.active;
          return (
          <li key={id}>
            <button
              type="button"
              className={`t-rail-item ${active ? "t-rail-item-active" : ""}`}
              tabIndex={-1}
              title={label}
            >
              <Icon className="h-5 w-5" />
              <span className="t-rail-label">{label}</span>
              {id === "activity" && <span className="t-rail-badge">3</span>}
            </button>
          </li>
          );
        })}
      </ul>

      <div className="t-rail-bottom">
        <button type="button" className="t-rail-profile" tabIndex={-1} title="Your profile">
          <span className="t-rail-profile-inner">OST</span>
        </button>
      </div>
    </nav>
  );
}
