from flask import Flask, render_template
from whitenoise import WhiteNoise

# Cria uma instância da aplicação Flask
app = Flask(__name__)
# Configura o WhiteNoise para servir arquivos estáticos
# root='static/' indica a pasta física onde os arquivos estão
# prefix='static/' indica a URL que o navegador usará (ex: /static/css/style.css)
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/', prefix='static/')

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

# Permite executar o servidor diretamente com 'python app.py'
if __name__ == '__main__':
    app.run(debug=True)  # Inicia o servidor Flask em modo de depuração