import { createRoot, Root } from 'react-dom/client';
import { App } from './components/app/app';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  const reactRoot: Root = createRoot(root);
  reactRoot.render(<App />);
}

