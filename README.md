# Quali Obras — site institucional (handoff para o Claude Code)

Site institucional de uma construtora (construção, reformas e gerenciamento de obras), em **pt-BR**.
Este pacote é a exportação estática do protótipo feito no canvas de design. Funciona abrindo `index.html` direto no navegador.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial (hero, números, diferenciais, serviços, portfólio, como trabalhamos, FAQ, formulário) |
| `servicos.html` | Seletor de serviços (troca imagem/descrição/itens) + etapas Pré-obra / Obra / Pós-obra |
| `obras.html` | Portfólio com filtros por tipo e por método construtivo |
| `obra-1.html` … `obra-7.html` | Página de cada obra (ficha técnica, imagem, descrição, galeria, anterior/próxima) |
| `sobre.html` | História, números, pilares, missão/visão/valores |

## Estrutura

```
quali-obras-site/
├── index.html, servicos.html, obras.html, sobre.html, obra-1..7.html
├── js/
│   ├── main.js             # página inicial: acordeões, formulário, vídeo + animações GSAP
│   ├── site.js             # páginas internas: seletor de serviços, filtros de obras + animações
│   └── vendor/             # gsap.min.js e ScrollTrigger.min.js (GSAP 3.15)
└── assets/
    ├── img/                # fotos (algumas geradas por IA — trocar por reais)
    └── video/              # vídeo de fundo da seção "O problema" (sem áudio) + poster
```

## Identidade visual

- Paleta azul e branco: primário `#163A8C`, azul-escuro `#0B1E4D` / `#0A1838`, destaque `#3B74E0`, azul-claro `#9CC0EC`, fundo claro `#F5F7FB`, texto `#141B2D`, texto secundário `#5B6577`, linhas `#DCE2EC`.
- Fontes (Google Fonts): **Manrope** (títulos, 700–800), **Inter** (texto), **Space Grotesk** (links do menu).
- Botões arredondados (pílula) e títulos pequenos em maiúsculas precedidos de uma linha azul.

## Seções (em ordem)

1. **Header** fixo: transparente sobre o hero, ganha fundo azul ao rolar. Logo à esquerda, menu central, Instagram/LinkedIn e botão WhatsApp à direita.
2. **Hero**: foto de fundo (`hero-canteiro.jpg`), slogan "Sua obra pronta, no prazo combinado.", CTA "Solicite um orçamento".
3. **Números**: +40 obras, +100 mil m², +10 anos (contadores animados).
4. **Faixa "Soluções construtivas para…"**: palavra final rotativa em loop.
5. **Por que famílias e empresas escolhem a Quali Obras**: 3 compromissos. A linha divisória fica azul no hover.
6. **O problema que resolvemos**: vídeo de fundo + texto.
7. **Serviços**: acordeão (4 serviços) que troca a imagem à direita com crossfade.
8. **Portfólio**: 1 obra em destaque + 2 obras ao lado.
9. **Como trabalhamos**: linha do tempo de 4 etapas com animação automática em loop (contorna o círculo → preenche → avança).
10. **Perguntas frequentes**: acordeão.
11. **Orçamento**: formulário completo + contatos.
12. **Rodapé** e botão flutuante "Posso ajudar?" (WhatsApp).

## Animações (js/main.js)

GSAP + ScrollTrigger. Usam atributos `data-*` como gancho: `data-hero`, `data-reveal`, `data-stagger`, `data-parallax`, `data-count`, `data-words`, `data-hdot`/`data-hring`/`data-hfill` (linha do tempo), `data-svc-*` (serviços), `data-faq-*`, `data-magnet` (botões que seguem o cursor), `data-item`/`data-divider`, `data-work`.
O script respeita `prefers-reduced-motion`.

## Pendências (TODO)

- [ ] **Formulário**: hoje só mostra a confirmação. Integrar o envio em `js/main.js` (procure `TODO`): backend próprio, Formspree, EmailJS ou similar. Também enviar o e-mail de confirmação ao cliente, que o texto da página promete.
- [ ] **Dados reais** no lugar dos colchetes `[...]`: telefone, WhatsApp (`https://wa.me/550000000000`), e-mail, endereço, CNPJ, horário de atendimento, links de Instagram/LinkedIn, nomes e descrições das obras, prazo do orçamento e anos de garantia no FAQ, porte mínimo de obra.
- [ ] **Imagens**: `hero-canteiro.jpg`, `obra-escola.jpg`, `obra-escritorio.jpg`, `obra-farmacia.jpg` e o vídeo foram gerados por IA. A farmácia tem um nome fictício na fachada. Trocar por fotos reais da empresa.
- [ ] `obra-guindaste.jpg` tem baixa resolução (610×327): substituir por uma versão maior.
- [ ] Revisar a responsividade no celular: a linha do tempo de "Como trabalhamos" pressupõe 4 colunas.
- [ ] **Obras**: dados de exemplo (nome, local, área, método, status, galeria) em `obras.html` (atributos `data-cat`/`data-method`) e em `obra-N.html`. Ideal: gerar as páginas de obra a partir de um único arquivo de dados (JSON/CMS) em vez de 7 HTMLs.
- [ ] `sobre-por-do-sol.jpg` parece ser foto do site de referência (obra de outra empresa): **substituir antes de publicar**.
- [ ] Header/rodapé repetidos em todas as páginas: extrair para componentes/partials.
- [ ] Opcional: migrar para um framework (ex.: Next.js + Tailwind), extraindo os estilos inline para CSS/componentes. Também otimizar as imagens (WebP/AVIF, `srcset`) e adicionar SEO (Open Graph, schema `LocalBusiness`) e favicon.

## Prompt sugerido para o Claude Code

> Este é o site estático (multipáginas) da construtora Quali Obras (veja o README.md). Organize o projeto como [Next.js + Tailwind / HTML+CSS separado], mantendo visual e animações GSAP idênticos, com header/rodapé como componentes compartilhados e as obras vindas de um arquivo de dados. Extraia os estilos inline para classes, deixe responsivo no celular e integre o formulário de orçamento a [serviço de e-mail]. Liste os textos entre colchetes que ainda precisam de dados reais.
