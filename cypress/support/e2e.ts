// Import commands.ts for custom commands
import './commands';

// Hide fetch/XHR requests from command log (cleaner output)
const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}