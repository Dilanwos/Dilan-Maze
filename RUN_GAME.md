# 🎮 PAC-MAN - CÓMO EJECUTAR

## Opción 1: Abrir directamente (RECOMENDADO)
1. Abre la carpeta del juego
2. Haz doble clic en **`index.html`**
3. El juego se abrirá en tu navegador

## Opción 2: Usando un servidor local
Si el juego no abre correctamente, ejecuta un servidor HTTP:

### Con Python (si lo tienes instalado):
```bash
cd C:\Users\USER\Documents\Proyectos_GitHub\Pacman
python -m http.server 8000
```
Luego abre: **http://localhost:8000**

### Con Node.js:
```bash
npm install -g http-server
cd C:\Users\USER\Documents\Proyectos_GitHub\Pacman
http-server
```

## 🎮 Controles del Juego

### Teclado:
- **WASD** o **Flechas** = Mover Pac-Man
- **Espacio** = Pausa
- **R** = Reiniciar

### Móvil:
- **Botones D-Pad** = Movimiento
- **Pausa** = Botón PAUSA
- **Reiniciar** = Botón REINICIAR

## 🎯 Cómo Jugar

1. **Menú Inicial**: Haz clic en:
   - 👾 **JUGAR** = Modo normal
   - ⚡ **MODO DIFÍCIL** = Mayor velocidad
   - 🏆 **RÉCORDS** = Ver tabla de puntuaciones

2. **Durante el Juego**:
   - Come todos los puntos pequeños para ganar puntos
   - Evita los fantasmas (pierdes una vida si te tocan)
   - Come los puntos AMARILLOS grandes para activar power-up
   - Con power-up activo: los fantasmas se vuelven azules y puedes comerlos
   - Come frutas para ganar bonus de puntos
   - Completa el nivel comiendo todos los puntos

3. **Game Over**:
   - Pierdes todas tus vidas = Fin del juego
   - Puedes reintentar o volver al menú

## ✅ Características Incluidas

✅ Controles fluidos (WASD + Flechas)
✅ 4 fantasmas con IA inteligente
✅ Sistema de power-ups
✅ Tabla de récords (LocalStorage)
✅ Modo difícil con aumento de velocidad
✅ Efectos de sonido
✅ Diseño retro neon
✅ Responsive (desktop + móvil)
✅ Pausa y reinicio
✅ Sistemas de vidas y puntuación

## 🐛 Si Algo No Funciona

1. **Los botones no responden**:
   - Abre la consola del navegador (F12)
   - Busca mensajes de error
   - Intenta refrescar la página (Ctrl+R)

2. **Sin sonido**:
   - Los sonidos requieren interacción con la página
   - El primer sonido se reproduce después de tu primera acción

3. **Juego lento**:
   - Cierra otras pestañas/aplicaciones
   - Usa un navegador moderno (Chrome, Firefox, Edge)

## 📁 Archivos del Proyecto

- **index.html** = Estructura y UI
- **style.css** = Diseño visual (neon, responsive)
- **game_final.js** = Lógica completa del juego
- **audio.js** = Sistema de sonidos

## 🎊 ¡Disfruta el juego!

Creado con ❤️ usando HTML5, CSS3 y JavaScript puro.
