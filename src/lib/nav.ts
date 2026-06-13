export interface NavLink {
  label: string;
  href: string;
}

// Section links are absolute (`/#about`) so they also work from /blog, not just
// the home page.
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
