type IconProps = { className?: string };

export function IconActivity({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 100 12 6 6 0 000-12zm0 1.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM3.5 17.5a.75.75 0 011.06 0L10 22.94l5.44-5.44a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06z" />
    </svg>
  );
}

export function IconChat({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a5 5 0 00-5 5v1.09c-.36.11-.7.27-1 .47V7a6.5 6.5 0 0113 0v4.5c0 .83-.67 1.5-1.5 1.5H15v2.09c.36.11.7.27 1 .47V13A6.5 6.5 0 1010 2zm-3.5 8A1.5 1.5 0 016 8.5h8A1.5 1.5 0 0114.5 10v3A1.5 1.5 0 0113 14.5H7A1.5 1.5 0 015.5 13v-3z" />
    </svg>
  );
}

export function IconTeams({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.5 4.75A2.25 2.25 0 019.75 2.5h.5A2.25 2.25 0 0112.5 4.75v.5A2.25 2.25 0 0110.25 7.5h-.5A2.25 2.25 0 017.5 5.25v-.5zM3 8.5A2.5 2.5 0 015.5 6h2A2.5 2.5 0 0110 8.5v2A2.5 2.5 0 017.5 13h-2A2.5 2.5 0 013 10.5v-2zm10 0a2.5 2.5 0 012.5-2.5h2a2.5 2.5 0 012.5 2.5v2a2.5 2.5 0 01-2.5 2.5h-2a2.5 2.5 0 01-2.5-2.5v-2zM5.5 15A2.5 2.5 0 018 12.5h4A2.5 2.5 0 0114.5 15v.5A2.5 2.5 0 0112 18H8a2.5 2.5 0 01-2.5-2.5V15z" />
    </svg>
  );
}

export function IconCalendar({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.75 3A1.75 1.75 0 004 4.75v.25H3.25a.75.75 0 000 1.5H4v8.5c0 .97.78 1.75 1.75 1.75h8.5A1.75 1.75 0 0116 13.25V6.25h.75a.75.75 0 000-1.5H16v-.25A1.75 1.75 0 0014.25 3h-8.5zM5.5 6.25h9v7a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-7zM7 2.5a.75.75 0 011.5 0v1.25H7V2.5zm5 0a.75.75 0 011.5 0v1.25h-1.5V2.5z" />
    </svg>
  );
}

export function IconCalls({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.02 11.47a12.5 12.5 0 005.51 5.51l1.65-1.65a1 1 0 011.01-.24 8.5 8.5 0 002.67.43 1 1 0 011 1V18a1 1 0 01-1 1C8.85 19 1 11.15 1 2a1 1 0 011-1h3.25a1 1 0 011 1 8.5 8.5 0 00.43 2.67 1 1 0 01-.24 1.01l-1.42 1.79z" />
    </svg>
  );
}

export function IconFiles({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 2a2 2 0 00-2 2v1H5.75A1.75 1.75 0 004 6.75v8.5c0 .97.78 1.75 1.75 1.75h8.5A1.75 1.75 0 0116 15.25v-8.5A1.75 1.75 0 0014.25 5H12V4a2 2 0 00-2-2H8zm0 2h2v1.25c0 .14.11.25.25.25h2.5v7.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-7.5c0-.14.11-.25.25-.25H8V4z" />
    </svg>
  );
}

export function IconApps({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 3.5A1.5 1.5 0 014.5 2h2A1.5 1.5 0 018 3.5v2A1.5 1.5 0 016.5 7h-2A1.5 1.5 0 013 5.5v-2zm0 9A1.5 1.5 0 014.5 11h2a1.5 1.5 0 011.5 1.5v2A1.5 1.5 0 016.5 16h-2A1.5 1.5 0 013 14.5v-2zM11.5 3A1.5 1.5 0 0113 4.5v2A1.5 1.5 0 0111.5 8h-2A1.5 1.5 0 018 6.5v-2A1.5 1.5 0 019.5 2h2zm0 9a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5h-2a1.5 1.5 0 01-1.5-1.5v-2a1.5 1.5 0 011.5-1.5h2z" />
    </svg>
  );
}

export function IconSearch({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M8.5 3a5.5 5.5 0 104.47 8.97l3.25 3.25a.75.75 0 101.06-1.06l-3.25-3.25A5.5 5.5 0 008.5 3zm0 1.5a4 4 0 110 8 4 4 0 010-8z" />
    </svg>
  );
}

export function IconVideo({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M3.5 5.75A1.75 1.75 0 015.25 4h7.5A1.75 1.75 0 0114.5 5.75v8.5A1.75 1.75 0 0112.75 16h-7.5A1.75 1.75 0 013.5 14.25v-8.5zm10.28 1.4l3.22-2.15a.75.75 0 011.28.56v9.48a.75.75 0 01-1.28.56l-3.22-2.15V7.15z" />
    </svg>
  );
}

export function IconPhone({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.02 11.47a12.5 12.5 0 005.51 5.51l1.65-1.65a1 1 0 011.01-.24 8.5 8.5 0 002.67.43 1 1 0 011 1V18a1 1 0 01-1 1C8.85 19 1 11.15 1 2a1 1 0 011-1h3.25a1 1 0 011 1 8.5 8.5 0 00.43 2.67 1 1 0 01-.24 1.01l-1.42 1.79z" />
    </svg>
  );
}

export function IconSend({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.5 17.5L17.5 10 2.5 2.5l.75 6.75 9 1.25-9 1.25-.75 6.75z" />
    </svg>
  );
}

export function IconMore({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M4 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
  );
}

export function IconShield({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.5L3.5 4.5v5.5c0 4.14 2.87 8.01 6.5 9 3.63-.99 6.5-4.86 6.5-9V4.5L10 1.5zm0 2.2l4.5 1.8v4.55c0 3.1-2.15 6.02-4.5 6.78-2.35-.76-4.5-3.68-4.5-6.78V5.5l4.5-1.8z" />
    </svg>
  );
}
