function Footer() {
  return (
    <div className="border-t border-border py-5 px-8 flex items-center justify-center gap-2 text-sm text-muted">
      <span>Creado por Gabo</span>
      <span aria-hidden="true">·</span>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-1.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Apóyame en Ko-fi
      </a>
    </div>
  );
}

export default Footer;