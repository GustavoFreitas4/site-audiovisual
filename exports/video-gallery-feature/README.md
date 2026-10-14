# Video Gallery Feature

Pacote reutilizável extraído da seção de Serviços. Ele inclui:

- cards de Eventos, Marcas e Negócios e Imóveis com navegação para rotas próprias;
- galeria responsiva em grid 9:16, com numeração e placeholders;
- destaque centralizado do vídeo;
- play/pause, retroceder e avançar 10 segundos;
- barra de progresso interativa e tempos atual/duração;
- controle compacto de som;
- botão X sempre visível;
- auto-hide dos controles após 2 segundos sem interação;
- lazy loading com `IntersectionObserver` e tentativas de recuperação de carregamento;
- suporte opcional a loop parcial por `loopEndSeconds`.

Os arquivos `.mp4` **não estão incluídos**.

## Dependências

O código usa React, TypeScript, Tailwind CSS e `lucide-react`:

```bash
npm install lucide-react
```

Configure Tailwind CSS no projeto de destino. As classes usam apenas utilitários padrão e cores arbitrárias, sem exigir o tema original do site.

## Instalação manual

1. Copie a pasta `video-gallery-feature/` para o projeto.
2. Importe `styles/video-gallery.css` uma vez no CSS global ou no layout raiz.
3. Coloque seus vídeos em `public/videos/<categoria>/` ou altere os caminhos em `data/video-galleries.ts`.
4. Renderize `ServiceGalleryCards` na página de serviços.
5. Crie uma rota para cada categoria usando `ServiceGalleryPage`.

## Cards de Serviços

Navegação normal por links:

```tsx
import { ServiceGalleryCards } from "./video-gallery-feature";

export function ServicesSection() {
  return <ServiceGalleryCards />;
}
```

Com um roteador SPA, passe a função de navegação:

```tsx
<ServiceGalleryCards onNavigate={(href) => router.push(href)} />
```

Sem `onNavigate`, os elementos `<a>` usam os caminhos declarados em `serviceGalleries`.

## Exemplo de rota no Next.js App Router

Arquivo `app/servicos/eventos/page.tsx`:

```tsx
import { ServiceGalleryPage } from "@/video-gallery-feature";
import { eventosVideos } from "@/video-gallery-feature/data/video-galleries";

export default function EventosPage() {
  return <ServiceGalleryPage title="Eventos" videos={eventosVideos} />;
}
```

Repita para `marcasVideos` e `imoveisVideos`.

## Estrutura dos dados

```ts
type GalleryVideo = {
  id: string;
  label: string;
  src?: string;
  thumbnail?: string;
  loopEndSeconds?: number;
};
```

- Sem `src`, o card mostra “Vídeo em breve”.
- `thumbnail` é opcional.
- `loopEndSeconds: 60` reproduz somente de `00:00` até `01:00` e reinicia.
- Sem `loopEndSeconds`, o vídeo usa o loop completo padrão.

## CSS

Importe o arquivo uma única vez:

```css
@import "./video-gallery-feature/styles/video-gallery.css";
```

Para mudar a cor principal:

```css
:root {
  --video-gallery-accent: #0d5c63;
}
```

## Observações

- O componente começa mudo para permitir autoplay nos navegadores.
- O som só é ativado após interação do usuário.
- O player limpa timers, observadores e fonte de vídeo ao desmontar.
- O botão de voltar usa `/#servicos` por padrão; altere `backHref` conforme o projeto.
