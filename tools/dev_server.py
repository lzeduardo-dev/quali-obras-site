"""Servidor local do site com URLs amigáveis, do mesmo jeito que a Vercel (cleanUrls).

- /servicos serve servicos.html e /obras/sede-atlantico serve obras/sede-atlantico.html
- /servicos.html e /index.html redirecionam para /servicos e /
- sem cache, para ver cada mudança ao recarregar

Uso: python3 tools/dev_server.py [porta]   (padrão: 8080)
"""
import http.server
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if not self._clean_url():
            super().do_GET()

    def do_HEAD(self):
        if not self._clean_url():
            super().do_HEAD()

    def _clean_url(self):
        """Devolve True se já respondeu com um redirecionamento."""
        parts = urlsplit(self.path)
        path, query = unquote(parts.path), ("?" + parts.query if parts.query else "")
        if path.endswith(".html"):
            clean = path[: -len(".html")]
            if clean.endswith("/index"):
                clean = clean[: -len("index")]
            self.send_response(308)
            self.send_header("Location", clean + query)
            self.end_headers()
            return True
        last = path.rsplit("/", 1)[-1]
        if last and "." not in last and (ROOT / (path.lstrip("/") + ".html")).is_file():
            self.path = path + ".html" + query
        return False


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler) as httpd:
        print(f"Quali Obras em http://localhost:{port}  (Ctrl+C para parar)")
        httpd.serve_forever()
