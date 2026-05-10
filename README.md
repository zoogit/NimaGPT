# Ask My AI Assistant

MVP portfolio chat section for a Next.js app. It uses a reusable React component, a local JSON knowledge base, and a secure server-side API route for OpenAI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

3. Start the app:

```bash
npm run dev
```

## Key Files

- `components/PortfolioAssistant.jsx` - reusable chat component
- `components/PortfolioAssistant.module.css` - responsive component styles
- `data/profileKnowledge.json` - local portfolio knowledge base
- `app/api/portfolio-chat/route.js` - secure server-side chat API route

The assistant is intentionally knowledge-base-only for this MVP. The local JSON file can later be replaced or supplemented with retrieval when the project grows into a fuller RAG system.

## Deploy to Netlify

This project should be deployed as a Next.js app, not a static export, because `/api/portfolio-chat` needs a server-side route.

Recommended Netlify settings:

```bash
Build command: npm run build
Publish directory: .next
```

Add this environment variable in Netlify before deploying:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

Do not commit `.env.local`. It is only for local development.
