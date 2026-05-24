import http.server
import socketserver
import os

PORT = 9000
Handler = http.server.SimpleHTTPRequestHandler

# Ensure we are in the right directory
os.chdir(r"c:\Users\Paula\Pagina TEF")

print(f"Starting server on port {PORT}")
try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()
except Exception as e:
    print(f"Fatal error: {e}")
