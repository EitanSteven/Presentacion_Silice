# Presentación Web: Silicio, Sílice, Cuarzo & Industria

Presentación web interactiva estilo PowerPoint desarrollada con **React**, **Vite**, **Tailwind CSS** y **Framer Motion**.

## Características

- **Diapositiva 00 (Espera & Precarga):** Carrusel en loop con transición suave (`<= 3s` por imagen), efecto iridiscente tipo oblea de silicio y precarga automática en memoria de todas las imágenes de la presentación.
- **Panel Inferior Glassmorphism:** Cada diapositiva exhibe su imagen principal con un panel horizontal translúcido alineado al borde inferior (`<= 45%` de altura).
- **Modo Imagen Limpia (`Enter`):** Presiona `Enter` o utiliza el botón discreto superior derecho para ocultar/mostrar los paneles de información y observar cualquier imagen de fondo completa.
- **Controles de Navegación:**
  - **Avanzar:** `Click Izquierdo`, `Flecha Derecha`, `Barra Espaciadora` o `PageDown`.
  - **Retroceder:** `Click Derecho`, `Flecha Izquierda`, `Backspace` o `PageUp`.
  - **Ocultar/Mostrar Paneles:** Tecla `Enter` (o botón `Enter` en pantalla).
  - **Pausar/Reanudar carruseles:** Tecla `P`.
  - **Pantalla Completa:** Tecla `F`.
  - **Panel de Ayuda:** Tecla `H` o `?`.
  - **Gestos Táctiles:** Deslizar a izquierda o derecha.
- **Preparado para GitHub Pages:** Configurado con rutas relativas (`base: './'`) y script `npm run deploy` con `gh-pages`.

## Inicio Rápido

```bash
npm install
npm run dev
```

## Compilación y Despliegue en GitHub Pages

```bash
npm run build
npm run deploy
```

## Autor
- **Estudiante:** Eitan Steven Gil
- **Profesora:** Natalia Callegaro
