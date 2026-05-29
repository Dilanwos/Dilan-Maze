# 🎮 DEMOSTRACIÓN VISUAL - PAC-MAN GAME

## 📺 Pantalla Principal del Juego

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│              🌈 P A C - M A N - A R C A D E 🌈                    │
│                         Arcade Classic                             │
│                                                                    │
│                  ┌──────────────────────────┐                     │
│                  │    ▶ JUGAR                 │                     │
│                  ├──────────────────────────┤                     │
│                  │    ⚡ MODO DIFÍCIL          │                     │
│                  ├──────────────────────────┤                     │
│                  │    🏆 RÉCORDS              │                     │
│                  └──────────────────────────┘                     │
│                                                                    │
│                        CONTROLES                                   │
│              ⬆️ ⬅️ ⬇️ ➡️  o  WASD - Movimiento                    │
│               ESPACIO - Pausa/Reanudar                             │
│                    R - Reiniciar                                   │
│                                                                    │
│          🔴 👻    💗 👻    🔵 👻    🟠 👻                         │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🎮 Pantalla de Juego en Acción

```
SCORE: 2840        LEVEL: 1        VIDAS: ●●●

┌───────────────────────────────────────────────────────┐
│ ║ • • • • • • • ║ • • • • • • • ║ • • • • • • • ║     │
│ ║ • ┌─┐ • ┌─────┘       ┌─────┘ • ┌─┐ • ┌─ • ║     │
│ ║ • │ │ • │           │       │ • │ │ • │  • ║     │
│ ║ • └─┘ • └─────┐ ┌───┘ ┌─────┘ • └─┘ • └─ • ║     │
│ ║ • • • • • • • │ │ • • │ • • • • • • • • • • ║     │
│ ║ • ┌──┐ • ┌─ ┌─┘ └─ • │ • ┌──┐ • ┌──┐ • ┌─ ║     │
│ ║ • │  │ • │ │       • │ • │  │ • │  │ • │  ║     │
│ ║ • └──┘ • │ └───────┘ └─┘ └──┘ • └──┘ • └─ ║     │
│ ║ • • • • • │ ● ● ●           • • • • • • • ║     │
│ ║ • ┌────┐ │ ● 👻 ●           ┌─────────┐ • ║     │
│ ║ • │ 🟡 │ │ ● ● ●           │ 👻 👻 👻 │ • ║  ← Score
│ ║ • └────┘ │ •  •  •           └─────────┘ • ║     │
│ ║ • • • • • │ • • • • • • • •   • • • • • • • ║     │
│ ║ • ┌─────┘ └─────┐   ┌─────┘ • ┌────────── ║     │
│ ║ • │             │   │       • │          ║     │
│ ║ • └─────┐ ┌─────┘   └─────┐ • │ ┌──────── ║     │
│ ║ • • • • │ │ • • • • • • • │ • │ │ • • • • ║     │
│ ║ • ┌─┐ • │ │ • ┌─────────┘ └─┘ │ • ┌────── ║     │
│ ║ • │ │ • │ │ • │               │ • │      ║     │
│ ║ • └─┘ • │ │ • │               │ • └────── ║     │
│ ║ • • • • │ │ • │               │ • • • • • ║     │
│ ║ ║ • • • └─┘ • └───────────────┘ • • • • • ║ ║    │
│ ║ • • • • • • • ║ • • • • • • • ║ • • • • • • ║     │
└───────────────────────────────────────────────────────┘

Legend:
  🟡 = Pac-Man
  👻 = Fantasmas (rojo, rosa, cian, naranja)
  • = Puntos pequeños
  ● = Poder-up (esquinas)
  ║ = Paredes
```

---

## 💛 Animación de Pac-Man

```
Frame 1:         Frame 2:         Frame 3:
    ◄>                ◄           ◄>
   /   \            /   \        /   \
  |  ◯  |          |  ◯  |      |  ◯  |
   \   /            \   /        \   /
    ◄>                ◄>          ◄>

Boca: Abierta → Cerrada → Abierta (ciclo)
```

---

## 👻 Estados de los Fantasmas

### Normal (Persiguiendo)
```
Rojo:      Rosa:      Cian:      Naranja:
┌────┐    ┌────┐    ┌────┐    ┌────┐
│ ◯◯ │    │ ◯◯ │    │ ◯◯ │    │ ◯◯ │
├────┤    ├────┤    ├────┤    ├────┤
│ ▓▓▓ │    │ ▓▓▓ │    │ ▓▓▓ │    │ ▓▓▓ │
└────┘    └────┘    └────┘    └────┘
 Rojo     Rosa      Cian      Naranja
```

### Asustados (Poder-up activo)
```
Todos azules:
┌────┐
│ ◯◯ │
├────┤
│ ▓▓▓ │  ← Huyendo
└────┘
 Azul
```

---

## 🏪 Tabla de Récords

```
┌──────────────────────────────────────────┐
│            🏆 TABLA DE RÉCORDS 🏆        │
├──┬──────────┬───────┬──────────────────┤
│ # │ Putuación │ Nivel │ Fecha           │
├──┼──────────┼───────┼──────────────────┤
│🥇│   8520   │   4   │ 28/05/2024       │
│🥈│   6340   │   3   │ 28/05/2024       │
│🥉│   5120   │   3   │ 27/05/2024       │
│ 4│   4200   │   2   │ 26/05/2024       │
│ 5│   3150   │   2   │ 25/05/2024       │
└──┴──────────┴───────┴──────────────────┘

🗑️ Limpiar Récords     Cerrar ✕
```

---

## ⏸️ Pantalla de Pausa

```
┌────────────────────────────────────┐
│                                    │
│            ⏸ PAUSADO               │
│                                    │
│  Presiona ESPACIO para continuar   │
│                                    │
│    ┌──────────────────────────┐   │
│    │   ▶ CONTINUAR              │   │
│    ├──────────────────────────┤   │
│    │   ⟲ REINICIAR              │   │
│    ├──────────────────────────┤   │
│    │   ← MENÚ                   │   │
│    └──────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

---

## 💀 Pantalla Game Over

```
┌────────────────────────────────────┐
│                                    │
│         GAME OVER                  │
│      (Parpadea en rojo)            │
│                                    │
│      Puntuación: 5420              │
│    Nivel alcanzado: 3              │
│                                    │
│    ┌──────────────────────────┐   │
│    │   🔄 REINTENTAR           │   │
│    ├──────────────────────────┤   │
│    │   ← MENÚ                  │   │
│    └──────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

---

## 📱 Controles Móviles

```
┌─────────────────────────────┐
│  JUEGO                      │
│                             │
│  Canvas aquí                │
│                             │
│        ▲                    │
│      ◀ ● ▶                  │
│        ▼                    │
│                             │
│     ⏸        ⟲             │
│   Pausa    Reiniciar       │
└─────────────────────────────┘

D-Pad responsivo al toque
Botones de acción táctiles
```

---

## 🎨 Efectos Visuales

### Glow Effects
```
Paredes:
  ▓▓▓    Normal
  ∞∞∞    Con glow (aura)

Pac-Man:
  ●      Normal
  ◆      Con glow/brillo

Poder-ups:
  ●      Normal (amarillo)
  ★      Con pulsación
```

### Animaciones
```
Título:
  P → Rojo
  A → Naranja
  C → Cian
  M → Amarillo
  A → Verde
  N → Magenta

Efecto: Cambian color + pulse continuo
```

---

## 🎯 Sistema de Puntuación en Acción

```
ACCIONES:                    PUNTOS GANADOS:

Comer punto         ●              +10 pts
Comer fruta         ◆              +100 pts
Recoger poder-up    ★              +50 pts
Comer fantasma      👻→💨          +200 pts
Completar nivel     ✓              +1000 pts bonus

Score total:
0 → 10 → 20 → 120 → 220 → 270 → ...
(Se actualiza en tiempo real)
```

---

## 🎮 Flujo de Juego Completo

```
INICIO
  ↓
┌─────────────────┐
│  MENÚ PRINCIPAL │
└────────┬────────┘
         │ Click "JUGAR"
         ↓
    ┌─────────────┐
    │ JUEGO INICIO│
    └────────┬────┘
             │ Jugar
             ↓
    ┌──────────────────┐
    │ EN JUEGO (Loop)  │
    │ - Mover Pac-Man  │
    │ - Fantasmas se   │
    │   mueven         │
    │ - Recolectar     │
    │   puntos         │
    │ - Detectar       │
    │   colisiones     │
    └────┬─────────────┘
         │
    ┌────┴──────────────────────┐
    │                           │
    ↓ ESPACIO                   ↓ Muere / Gana
┌──────────────┐          ┌─────────────────┐
│  PAUSA       │          │  GAME OVER      │
│ - Mostrar    │          │ - Mostrar score │
│   opciones   │          │ - Mostrar nivel │
│ - Reanudar   │          │ - Opciones:     │
│   o Menú     │          │   Reintentar    │
└──────┬───────┘          │   o Menú        │
       │                  └────────┬────────┘
       ↓                           │
    EN JUEGO ←─────────────────────┘
```

---

## 📊 Estadísticas Visuales

```
Mapa:
  █████████████████████  
  █ • • • ║ • • • • • █  21x21 celdas
  █ • ┌─┐ ║ ┌─┐ • • █  630x630 px
  █ █ │█│ █ █ │█│ • █  30px por celda
  █████████████████████

Items:
  Puntos pequeños: ~175 (85% del mapa)
  Frutas: 5 (distribuidas)
  Power-ups: 4 (esquinas)
  Total recogible: ~184 items

Personajes:
  Pac-Man: 1 (controlable)
  Fantasmas: 4 (IA automática)
  Total: 5 entidades

Niveles:
  Inicial: Velocidad base
  +1: Velocidad × 1.2
  +2: Velocidad × 1.4
  ... progresión continua
```

---

## 🎬 Ejemplo de Partida

```
Inicio: Score = 0, Vidas = 3, Nivel = 1

[1] Comer punto → Score = 10 ✓
[2] Comer punto → Score = 20 ✓
[3] Fantasma intenta atrapar
[4] Comer punto → Score = 30 ✓
[5] Llegar a esquina, comer poder-up
    → Score = 80
    → Fantamas azules (asustados)
[6] Comer fantasma → Score = 280 ✓
[7] Comer más puntos → Score = 350
[8] Fantasma toca → Pierde vida (Vidas = 2)
[9] Reinicia posición, continúa
[10] Completa el mapa → Score = 1350 + Bonus

LEVEL UP → Velocidad aumenta
Nueva partida nivel 2 con Score = 1350
```

---

## 🎵 Sonidos (Representación)

```
Punto:          ◆──   (beep corto agudo)
Poder-up:       ◆──◆──◆───   (tonos ascendentes)
Muerte:         ◆═══─────   (tono descendente)
Inicio:         ◆─   ◆──   ( 2 notas)
Fantasma:       ◆─◆─◆─◆   (4 notas rápidas)
```

---

## 🏅 Logros en Tabla de Récords

```
🥇 ORO    - Score > 5000
🥈 PLATA  - Score > 3000
🥉 BRONCE - Score > 1000

Medallas mostradas en tabla de top 3
```

---

## ⚡ Modo Difícil

```
NORMAL                    DIFÍCIL
────────────────────────────────────
Fantasmas: 1 px/frame     1.2x más rápido
Pac-Man: 2 px/frame       (mismo)
Duración: Normal          Más corta

Resultado:
┌─────────────────────────┐
│ DESAFÍO MAYOR           │
│ • Fantasmas más ágiles  │
│ • Menos tiempo reacción │
│ • Mayor dificultad      │
│ • Mejor recompensa      │
└─────────────────────────┘
```

---

## ✨ CONCLUSIÓN VISUAL

```
Un juego completo, visualmente atractivo y altamente funcional.

  ╔═══════════════════════════════════════════════════════════╗
  ║                  PAC-MAN ARCADE GAME                      ║
  ║                                                           ║
  ║  HTML5 • CSS3 • JavaScript • Web Audio API               ║
  ║  Sin librerías externas • 100% Vanilla Code              ║
  ║                                                           ║
  ║  ✓ Totalmente Responsivo                                 ║
  ║  ✓ Sonidos Procedurales                                  ║
  ║  ✓ IA Inteligente                                        ║
  ║  ✓ Tabla de Récords                                      ║
  ║  ✓ Múltiples Niveles                                     ║
  ║  ✓ Diseño Retro Neon                                     ║
  ║                                                           ║
  ║            ¡LISTO PARA JUGAR! 👾                        ║
  ╚═══════════════════════════════════════════════════════════╝
```

---

**Demostración visual completada**
**Proyecto: PAC-MAN Game v1.0**
**Estado: ✅ FUNCIONAL**
