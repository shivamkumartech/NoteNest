function Footer() {
  return (
    <footer className="mt-auto border-t border-(--app-border) py-6 text-center text-xs text-(--app-text-muted)">
      <p>© {new Date().getFullYear()} NoteNest. All rights reserved.</p>
    </footer>
  );
}

export default Footer;