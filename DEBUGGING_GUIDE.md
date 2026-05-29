# 🎮 INSTRUCCIONES - CÓMO EJECUTAR Y VERIFICAR

## PASO 1: Abre el juego
1. **Abre el archivo `index.html`** en tu navegador (doble clic o arrastra al navegador)
2. Deberías ver el menú de inicio con 3 botones: JUGAR, MODO DIFÍCIL, RÉCORDS

## PASO 2: Verifica que está funcionando (IMPORTANTE)
1. **Presiona F12** para abrir la consola del navegador
2. Deberías ver estos mensajes:
   ```
   [INIT] window.onload disparado
   [GAME] Adjuntando listeners a botones...
   [BTN] playBtn: ENCONTRADO
   [BTN] hardBtn: ENCONTRADO
   [BTN] scoresBtn: ENCONTRADO
   [✓] onclick adjuntado a JUGAR
   [✓] onclick adjuntado a MODO DIFÍCIL
   [✓] onclick adjuntado a RÉCORDS
   [✓] Todos los listeners adjuntados
   ```

## PASO 3: Prueba los botones
- Haz clic en **JUGAR** → Deberías ver:
  ```
  [CLICK] JUGAR presionado
  [GAME] startGame() llamado con hardMode= false
  [GAME] Iniciando game loop...
  ```
  Y el juego debe iniciarse

- Haz clic en **MODO DIFÍCIL** → Deberías ver:
  ```
  [CLICK] MODO DIFÍCIL presionado
  [GAME] startGame() llamado con hardMode= true
  [GAME] Iniciando game loop...
  ```

- Haz clic en **RÉCORDS** → Deberías ver:
  ```
  [CLICK] RÉCORDS presionado
  [SCORES] Mostrando tabla de récords
  ```

## PASO 4: Juega
### Controles:
- **WASD** o **Flechas** = Mover Pac-Man
- **Espacio** = Pausa
- **R** = Reiniciar

### Objetivo:
- Come todos los puntos blancos pequeños
- Evita los 4 fantasmas (pierdes una vida si te tocan)
- Come los puntos AMARILLOS grandes (power-up = puedes comer fantasmas)
- Come las frutas para bonus de puntos
- Completa el nivel comiendo todos los puntos

## 🐛 Si Algo No Funciona

### Los botones no responden
1. Abre F12 y mira la consola
2. Si no ves los mensajes `[INIT]`, recarga la página (Ctrl+R)
3. Si ves errores en rojo, cópialo y reporúta

### Si ves errores en la consola
- **Copiar el texto del error completo**
- Los errores rojos son importantes para diagnosticar

### El juego inicia pero no se ve nada
- Busca en la consola errores relacionados a "canvas" o "gameCanvas"
- Si ves un mensaje gris `[GAME] Iniciando game loop...` sin errores, es un problema de renderizado

### Sin sonido
- Es normal al principio (navegador lo bloquea)
- El primer sonido se reproduce después de tu primer click

## 📋 Archivos Actuales

- **game_fixed.js** ← ESTE ES EL CORRECTO (el que ahora usa el juego)
- game_final.js ← Versión anterior
- game_new.js ← Versión anterior
- game.js ← Versión inicial

## ✅ Confirmación Visual

Si todo está bien, cuando hagas clic en JUGAR deberías ver:

1. **El menú desaparece**
2. **Un canvas negro aparece** con:
   - Un laberinto azul con paredes
   - Un círculo amarillo (Pac-Man) en la esquina superior izquierda
   - 4 fantasmas en el centro (rojo, rosa, cyan, naranja)
   - Muchos puntos pequeños blancos esparcidos
   - Números grandes amarillos en 4 esquinas (power-ups)
3. **HUD en la parte superior** mostrando:
   - Puntuación
   - Nivel
   - Vidas

---

**¡Si ves TODO esto, el juego funciona correctamente! 🎊**

---

## 💡 Tips de Depuración

Si necesitas más información en la consola:

Abre `game_fixed.js` y busca las líneas con `console.log`:
- `[INIT]` = Inicialización
- `[GAME]` = Lógica del juego
- `[BTN]` = Botones
- `[CLICK]` = Clics en botones
- `[SCORES]` = Récords
- `[✓]` = Éxito

Todos estos mensajes te ayudan a entender qué está pasando.
