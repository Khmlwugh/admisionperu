function Footer() {
  return (
    <div className="border-t border-border py-5 px-8 flex items-center justify-center gap-2 text-sm text-muted">
      <span>Creado por Gabo</span>
      <span aria-hidden="true">·</span>
      <a
        href="https://heygabo.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent-hover font-medium"
      >
        Ver más proyectos
      </a>
    </div>
  );
}

export default Footer;