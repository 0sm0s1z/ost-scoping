"use client";

import { IconSearch } from "./icons";

export function TitleBar() {
  return (
    <header className="t-titlebar" aria-hidden>
      <div className="t-titlebar-drag">
        <div className="t-titlebar-traffic">
          <span />
          <span />
          <span />
        </div>
        <div className="t-titlebar-search">
          <IconSearch className="h-3.5 w-3.5" />
          <input type="search" placeholder="Search" readOnly tabIndex={-1} />
        </div>
      </div>
      <div className="t-titlebar-actions">
        <button type="button" className="t-titlebar-btn" tabIndex={-1} />
        <button type="button" className="t-titlebar-btn" tabIndex={-1} />
        <button type="button" className="t-titlebar-btn t-titlebar-btn-close" tabIndex={-1} />
      </div>
    </header>
  );
}
