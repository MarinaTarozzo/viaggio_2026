export default function Icon({ name, size = 24, stroke = 1.6, fill = false, style, className, ...rest }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round",
    strokeLinejoin: "round", style, className, ...rest,
  };
  const P = {
    search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
    car: <><path d="M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><line x1="3" y1="13" x2="21" y2="13" /><circle cx="7.5" cy="16" r="0.6" fill="currentColor" /><circle cx="16.5" cy="16" r="0.6" fill="currentColor" /></>,
    bed: <><path d="M3 18V7" /><path d="M3 12h18v6" /><path d="M21 18v-2" /><path d="M3 12V9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3" /></>,
    sheet: <><rect x="5" y="3" width="14" height="18" rx="1.5" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></>,
    map: <><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" /><line x1="9" y1="4" x2="9" y2="17" /><line x1="15" y1="6.5" x2="15" y2="19.5" /></>,
    star: fill
      ? <path d="M12 3.5l2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.3 6.9 19l1-5.6-4.1-4 5.6-.8L12 3.5Z" fill="currentColor" stroke="none" />
      : <path d="M12 3.5l2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.3 6.9 19l1-5.6-4.1-4 5.6-.8L12 3.5Z" />,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    chevron: <polyline points="9 6 15 12 9 18" />,
    chevronL: <polyline points="15 6 9 12 15 18" />,
    arrow: <><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="1.5" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="9" y1="3" x2="9" y2="6" /><line x1="15" y1="3" x2="15" y2="6" /></>,
    clock: <><circle cx="12" cy="12" r="8" /><polyline points="12 8 12 12 15 13.5" /></>,
    route: <><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M8 6h6a3 3 0 0 1 0 6H10a3 3 0 0 0 0 6h6" /></>,
    check: <polyline points="5 12.5 10 17.5 19 7" />,
    external: <><path d="M14 4h6v6" /><line x1="20" y1="4" x2="11" y2="13" /><path d="M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" /></>,
    close: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
    flag: <><line x1="5" y1="3" x2="5" y2="21" /><path d="M5 4h11l-2 3 2 3H5" /></>,
    home: <><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /></>,
    plane: <path d="M21 15.5l-7-2-3.5 6-1.8-.6 1.3-5.2-4.2-1.2-2 2-1.5-.5 1.2-3-.8-2.8 1.5.4 1.6-1.6 1 4.4 5.2 1.6 1.3-7 1.9.5-2 7.2Z" />,
    thumb: <><path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" /><path d="M7 11l4-7a2 2 0 0 1 2 1.8V9h5.2a1.6 1.6 0 0 1 1.6 2l-1.4 7a1.6 1.6 0 0 1-1.6 1.3H7" /></>,
    filter: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="17" x2="14" y2="17" /></>,
  };
  return <svg {...common} aria-hidden="true">{P[name] || null}</svg>;
}
