export interface NavLink {
  label: string;
  href: string;
}

// Section links are absolute (`/#work`) so they also work from /blog, not just
// the home page. Order matches the on-page scroll order. Writing points at the
// on-page section, which then links through to the individual posts.
export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];
