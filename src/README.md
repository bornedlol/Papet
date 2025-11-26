# Papet

Sistema completo de gerenciamento de pets, planos de saúde e consultas veterinárias.

## Funcionalidades

- 🐾 **CRUD de Pets**: Cadastre, edite e gerencie seus pets
- 💚 **Planos de Saúde**: Explore e vincule planos de saúde aos seus pets
- 📅 **Agendamento de Consultas**: Marque e gerencie consultas veterinárias
- 👥 **Comunidade**: Sistema de grupos e chat em tempo real
- 🏢 **Autenticação Dupla**: Login separado para usuários e empresas (clínicas, provedoras de planos, profissionais)

## Paleta de Cores

- **Marrom Claro**: Elementos neutros e texto
- **Verde**: Ações principais e destaques
- **Bege**: Fundos secundários e detalhes

## Deploy na Vercel

### Opção 1: Deploy via Git

1. Faça push do código para um repositório Git (GitHub, GitLab ou Bitbucket)
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. A Vercel detectará automaticamente as configurações do Vite
6. Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

```bash
# Instale a Vercel CLI
npm i -g vercel

# Execute o deploy
vercel

# Para deploy em produção
vercel --prod
```

## Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## Estrutura do Projeto

```
/
├── App.tsx                 # Componente principal
├── components/            # Componentes React
│   ├── HomePage.tsx
│   ├── PetsPage.tsx
│   ├── PlansPage.tsx
│   ├── AppointmentsPage.tsx
│   ├── CommunityPage.tsx
│   └── ui/               # Componentes UI (shadcn)
├── lib/                  # Utilitários e dados mock
├── styles/               # Estilos globais
├── types/               # Definições TypeScript
└── vercel.json          # Configuração Vercel

```

## Tecnologias

- **React 18**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Estilização
- **Vite**: Build tool
- **shadcn/ui**: Componentes UI
- **Lucide React**: Ícones
- **Sonner**: Notificações toast

## Licença

MIT
