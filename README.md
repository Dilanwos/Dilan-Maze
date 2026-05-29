# 🎮 PAC-MAN - Juego Arcade Completo

Un juego Pac-Man completo, moderno y visualmente atractivo desarrollado con **HTML5, CSS3 y JavaScript puro** (sin librerías externas).

## ✨ Características Principales

### Jugabilidad
- ✅ **Personaje controlable** - Pac-Man amarillo con animación de boca
- ✅ **Laberinto clásico** - 21x21 con diseño arcade retro
- ✅ **Sistema de puntuación** - Puntos pequeños (10 pts), frutas (100 pts), power-ups (50 pts)
- ✅ **3 Vidas** - Sistema de vidas progresivo
- ✅ **Sistema de Niveles** - Dificultad aumenta automáticamente
- ✅ **4 Fantasmas Enemigos** - Con IA mejorada y movimiento autónomo:
  - 🔴 Rojo (persecución directa suave)
  - 💗 Rosa (movimiento inteligente)
  - 🔵 Cian (navegación natural)
  - 🟠 Naranja (búsqueda adaptativa)
  - Velocidad escalable por nivel (1.6x a 5x más rápido)

### Power-ups y Mecánicas
- ✅ **Power-ups (4 esquinas)** - Activan modo invulnerable por 10 segundos
- ✅ **Modo Invulnerable** - Fantasmas huyen y pueden ser comidos (+200 pts)
- ✅ **Cambio de color de fantasmas** - Visual cuando son asustados

### Interfaz y Controles
- ✅ **Menú inicial** - Con opciones Normal/Difícil
- ✅ **HUD en tiempo real** - Puntuación, Vidas, Nivel
- ✅ **Sistema de pausa** - Espacio para pausar/reanudar
- ✅ **Game Over screen** - Con reintentos y menú
- ✅ **Tabla de Récords** - Top 10 guardado con LocalStorage
- ✅ **Controles múltiples**:
  - ⌨️ Flechas del teclado o WASD
  - 📱 Controles táctiles (móvil)
  - 🎮 Botones de pausa/reinicio

### Diseño Visual
- 🎨 **Estilo Arcade Retro Neon** - Colores vibrantes con glow effects
- 🌈 **Fondos dinámicos** - Gradientes animados
- ✨ **Efectos visuales**:
  - Glow azul en paredes
  - Pulso en power-ups
  - Animaciones suaves
  - Letras del título con efecto arcoíris
- 📱 **Fully Responsive** - Desktop, tablet y móvil

### Audio
- 🔊 **Web Audio API**:
  - Beep al comer puntos
  - Tono ascendente en power-ups
  - Tono descendente en muerte
  - Accorde de victoria
  - Sonidos de fantasma comido

### Extras
- ✅ **Modo Difícil** - Mayor velocidad de fantasmas
- ✅ **Tabla de Récords** - LocalStorage para persistencia
- ✅ **Reinicio dinámico** - Nueva mapa en cada nivel
- ✅ **Código limpio y comentado** - Arquitectura modular (clases)

## 📂 Estructura de Archivos

```
Pacman/
├── index.html          # Estructura HTML + Menús
├── style.css           # Estilos retro neon
├── game.js             # Lógica principal (Game, Player, Ghost)
├── audio.js            # Sistema de audio Web Audio API
└── README.md           # Este archivo
```

## 🎮 Cómo Jugar

### Inicio
1. Abre `index.html` en tu navegador web
2. Haz clic en **JUGAR** para modo normal o **MODO DIFÍCIL** para dificultad aumentada
3. Usa las teclas para moverte

### Controles

| Acción | Teclas |
|--------|---------|
| Arriba | ⬆️ / W |
| Abajo | ⬇️ / S |
| Izquierda | ⬅️ / A |
| Derecha | ➡️ / D |
| Pausa/Reanudar | ESPACIO |
| Reiniciar | R |
| Móvil | Botones táctiles |

### Objetivo
- 🎯 **Recolecta todos los puntos** del mapa sin que los fantasmas te atrapen
- 💛 **Come power-ups** en las esquinas para asustar a los fantasmas (10 segundos)
- 👻 **Come fantasmas** mientras están asustados para ganar puntos
- 📈 **Progresa niveles** - Completa el mapa para pasar al siguiente

### Puntuación
- 🔹 Punto pequeño: 10 pts
- 🔸 Fruta: 100 pts
- 💛 Power-up: 50 pts
- 👻 Fantasma comido: 200 pts
- 🏆 Nivel completado: 1000 pts bonus

## 🎮 Modos de Dificultad

### Normal
- **Nivel 1-2**: Fantasmas lentos (20 FPS) - Muy controlable
- **Nivel 3-4**: Fantasmas medianos (30 FPS) - Moderado
- **Nivel 5+**: Fantasmas rápidos (60 FPS) - Muy desafiante
- Velocidad Pac-Man: 12 FPS (constante)
- Ideal para principiantes y progresión

### Difícil ⚡
- Todos los fantasmas significativamente más rápidos
- Nivel 1 Hard ≈ Nivel 2 Normal
- Velocidad Pac-Man: 12 FPS (igual)
- Ideal para veteranos de arcade
- Requiere estrategia y reflejos

## 💾 Características de Guardado

- **Tabla de Récords** - Se guarda automáticamente en LocalStorage
- **Top 10** - Tus mejores 10 puntuaciones se muestran en el modal
- **Información** - Puntuación, Nivel alcanzado, Fecha

## 🎨 Paleta de Colores

| Elemento | Color | Hex |
|----------|-------|-----|
| Fondo | Negro Profundo | #000000 |
| Texto Principal | Cian Neon | #00ffff |
| Paredes | Azul | #0066ff |
| Pac-Man | Amarillo | #ffff00 |
| Fantasma Rojo | Rojo | #ff0000 |
| Fantasma Rosa | Rosa | #ffb897 |
| Fantasma Cian | Cian | #00ffff |
| Fantasma Naranja | Naranja | #ffa500 |
| Puntos | Rosa | #ffb897 |
| Power-ups | Amarillo | #ffff00 |

## 🔧 Detalles Técnicos

- **Resolución Canvas**: 630x630 (21x21 celdas de 30px)
- **FPS**: 60 frames por segundo (renderizado constante)
- **IA Fantasmas**: Sistema de scoring inteligente
  - Base: Distancia Manhattan (persecución/escape)
  - Preferencia de dirección: Movimiento suave
  - Penalización de reversión: Evita bouncing
  - Velocidad por nivel: Escalable 1.6x-5x
- **Detección Colisiones**: Triple validación (límites + mapa + movimiento)
- **Persistencia**: LocalStorage (Records)
- **Compatibilidad**: Chrome, Firefox, Safari, Edge (Navegadores modernos)
- **Movimiento**: Autónomo e independiente de entrada del jugador

## 📱 Dispositivos Soportados

✅ Desktop (1920x1080 y superior)
✅ Laptop/Tablet (768px - 1024px)
✅ Móvil (320px - 767px)

Controles táctiles disponibles en dispositivos móviles.

## 🚀 Instalación y Ejecución

### Opción 1: Directo (Recomendado)
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡A jugar!

### Opción 2: Servidor Local (Para desarrollo)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 🐛 Solución de Problemas

| Problema | Solución |
|----------|----------|
| Sin audio | Haz clic en el canvas primero (requerimiento del navegador) |
| Controles lentos | Aumenta la velocidad en modo difícil |
| Fantasmas pegados | Es parte de la IA, intenta escapar |
| Records no se guardan | Verifica que LocalStorage esté habilitado |

## 🎯 Futuras Mejoras

- 🤖 IA avanzada: Personalidades de fantasmas (Blinky, Pinky, Inky, Clyde)
- 🎮 Compatibilidad con gamepad/joystick
- 📊 Rankings online
- 🎵 Más sonidos y música
- ⭐ Efectos de partículas avanzados
- 🌍 Múltiples mapas dinámicos
- 🎭 Modos especiales (Scatter, Frightened mejorado)

## 📝 Notas del Desarrollador

Este juego fue creado como un homenaje al clásico Pac-Man con:
- **Código 100% vanilla** - Sin librerías externas
- **Arquitectura limpia** - Fácil de mantener y extender
- **Buenas prácticas** - Comentarios claros, nombres descriptivos
- **Rendimiento optimizado** - 60 FPS sin lag

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Creado con ❤️ en HTML5, CSS3 y JavaScript puro**

¿Disfrutaste el juego? ⭐ Deja tu puntuación en la tabla de récords.

**¡A comer puntos y a vencer a los fantasmas!** 👾
