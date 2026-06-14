export interface NavLink {
  label: string;
  href: string;
}

// Section links are absolute (`/#projects`) so they also work from /blog, not
// just the home page. Order matches the on-page scroll order.
export const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
