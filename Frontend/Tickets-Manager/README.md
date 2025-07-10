# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run locally:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
   The production-ready files will be in the `dist` folder.
4. **Preview production build locally:**
   ```sh
   npm install -g serve
   serve -s dist
   ```

## Deployment

- Deploy the contents of the `dist` folder to your static hosting provider (Netlify, Vercel, GitHub Pages, etc).
- For SPA routing, add a `_redirects` file in `public/` with:
  ```
  /*    /index.html   200
  ```
- Set environment variables in a `.env` file at the project root (see Vite docs for details).
