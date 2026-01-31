# DBSolutions Lab' - Portfolio Diego Bernardes

**DBSolutions Lab' – Building SaaS & Software Engineering**

Bem-vindo ao repositório do meu Portfólio Interativo. Este projeto é uma aplicação web dinâmica para apresentar meu perfil profissional, destacando minha experiência em Software Engineering e construção de soluções SaaS.

## 📋 Sobre o Projeto

Este projeto utiliza o microframework Flask (Python) para servir um site dinâmico com um sistema de templates, permitindo fácil manutenção e escalabilidade.

O site está organizado nas seguintes páginas:
- **Início:** Página inicial de boas-vindas.
- **Currículo:** Currículo detalhado (Experiência, Skills, Formação).
- **Projetos:** Galeria de projetos e portfólio.
- **Contato:** Informações de contato e redes sociais.

## 🚀 Como Rodar o Projeto (Localmente)

Para executar este projeto em sua máquina local, você precisará do Python e do Flask.

### Pré-requisitos

- [Python 3.8+](https://www.python.org/downloads/)
- Git (para clonar o repositório)

### Passo a passo

1. **Clone o repositório:**
   Abra seu terminal ou prompt de comando e execute:
   ```bash
   git clone https://github.com/diegobernardessv/Curriculum-Vitae_DiegoBernardes.git
   cd Curriculum-Vitae_DiegoBernardes
   ```

2. **Crie e ative um ambiente virtual (Recomendado):**
   ```bash
   # Para Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Para macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Instale as dependências:**
   Com o ambiente virtual ativado, instale os pacotes necessários:
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute a aplicação:**
   ```bash
   flask run
   ```
   Ou, alternativamente:
   ```bash
   python app.py
   ```

5. **Acesse no navegador:**
   Abra seu navegador e acesse http://127.0.0.1:5000.

## ☁️ Deploy na Nuvem com Render

Este projeto está pronto para ser implantado na nuvem usando a plataforma Render.

1.  **Crie uma conta no Render:** Acesse render.com e crie uma conta (você pode usar sua conta do GitHub).

2.  **Crie um "New Web Service":** No dashboard, clique em **New +** e selecione **Web Service**.

3.  **Conecte seu repositório:** Conecte sua conta do GitHub e selecione o repositório `Curriculum-Vitae_DiegoBernardes`.

4.  **Configure o serviço:**
    - **Name:** Escolha um nome para sua aplicação (ex: `portfolio-diego`).
    - **Build Command:** `pip install -r requirements.txt`
    - **Start Command:** `gunicorn app:app`

5.  **Clique em "Create Web Service":** O Render irá construir e implantar sua aplicação. Após alguns minutos, seu site estará disponível em uma URL como `https://nome-da-sua-app.onrender.com`.

### Adicionando um Domínio Personalizado

1.  No seu serviço web no Render, vá para a aba **Settings**.
2.  Role para baixo até a seção **Custom Domains** e adicione seu domínio (ex: `www.seusite.com`).
3.  O Render fornecerá um valor para um registro `CNAME`. Copie esse valor.
4.  No painel de controle do seu provedor de domínio (Cloudflare, etc.), crie um registro `CNAME` apontando para o valor fornecido pelo Render.
5.  Aguarde a verificação e a propagação do DNS. O Render cuidará automaticamente do certificado SSL.

**Project URL: https://github.com/diegobernardessv/Curriculum-Vitae_DiegoBernardes**

## ⚡ Deploy na Vercel

1.  **Crie um projeto no Vercel** e conecte seu repositório.
2.  **Framework Preset:** selecione **Other**.
3.  **Deploy:** o Vercel vai detectar o `vercel.json` automaticamente.

### Domínio com Cloudflare (www principal)

Crie os seguintes registros DNS:

- **A** `@` → `216.198.79.1` (DNS only)
- **CNAME** `www` → `cname.vercel-dns.com` (DNS only)

No Vercel, adicione `dbsolutions.dev.br` e `www.dbsolutions.dev.br`, e defina **www** como principal.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3:** Estilização e design responsivo.
- **Bootstrap:** Framework de frontend para componentes de UI.
- **Python:** Linguagem de programação do backend.
- **Flask:** Microframework web para o servidor.

## 📬 Contato

- **LinkedIn:** [Diego Bernardes Silva](https://www.linkedin.com/in/diegobernardessv/)
- **GitHub:** [diegobernardessv](https://github.com/diegobernardessv)
- **GitLab:** [diegobernardessv](https://gitlab.com/diegobernardessv)
- **Email:** diegobernardessv@gmail.com