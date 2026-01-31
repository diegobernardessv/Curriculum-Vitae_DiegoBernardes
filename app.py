import os
from flask import Flask, render_template, send_from_directory

# Cria uma instância da aplicação Flask
app = Flask(__name__)

# Configurações para desenvolvimento
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['USE_MINIFIED_ASSETS'] = os.environ.get('USE_MINIFIED_ASSETS', '0') == '1'
app.config['GA_MEASUREMENT_ID'] = os.environ.get('GA_MEASUREMENT_ID')

# Configuração do WhiteNoise para Produção (Render)
# Verificamos se estamos no Render ou em ambiente de produção
if os.environ.get('RENDER') or os.environ.get('FLASK_ENV') == 'production':
    from whitenoise import WhiteNoise
    # Usar o caminho absoluto garante que o WhiteNoise encontre a pasta static no servidor
    base_dir = os.path.dirname(os.path.abspath(__file__))
    static_dir = os.path.join(base_dir, 'static')
    # Configura o WhiteNoise para servir a pasta /static
    app.wsgi_app = WhiteNoise(app.wsgi_app, root=static_dir, prefix='static/')

# Diretório absoluto para arquivos estáticos utilitários
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

# Define a rota para a página inicial (home)
@app.route('/')
@app.route('/home.html')
def home():
    """Renderiza a página inicial."""
    return render_template('home.html')

# Define a rota para a página de currículo
@app.route('/resume.html')
def resume():
    """Renderiza a página de currículo."""
    return render_template('resume.html')

# Define a rota para a página de projetos
@app.route('/projects.html')
def projects():
    """Renderiza a página de projetos."""
    return render_template('projects.html')

# Define a rota para a página de contato
@app.route('/contact.html')
def contact():
    """Renderiza a página de contato."""
    return render_template('contact.html')

# Rotas auxiliares para SEO
@app.route('/sitemap.xml')
def sitemap():
    """Entrega o sitemap do site."""
    return send_from_directory(STATIC_DIR, 'sitemap.xml')

@app.route('/robots.txt')
def robots():
    """Entrega o robots.txt do site."""
    return send_from_directory(STATIC_DIR, 'robots.txt')

# Permite executar o servidor diretamente com 'python app.py'
if __name__ == '__main__':
    app.run(debug=True)  # Inicia o servidor Flask em modo de depuração