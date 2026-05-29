# 🚀 GUÍA RÁPIDA DE EJECUCIÓN - PAC-MAN GAME

## Opción 1: Ejecución Directa (Más Fácil) ⭐

1. Descarga todos los archivos
2. Abre la carpeta `Pacman`
3. Haz doble clic en `index.html`
4. ¡El juego se abrirá en tu navegador!

**Nota**: Algunos navegadores pueden requerir un servidor local para ciertos features como sonidos. Ver Opción 2.

---

## Opción 2: Con Servidor Local (Recomendado para sonidos)

### Windows - Con Python

```bash
# Abre una terminal (CMD o PowerShell) en la carpeta del juego
# Python 3 (recomendado)
python -m http.server 8000

# O si tienes Python 2
python -m SimpleHTTPServer 8000
```

Luego abre en tu navegador: **http://localhost:8000**

### macOS/Linux - Con Python

```bash
# Terminal
python3 -m http.server 8000
```

Luego abre: **http://localhost:8000**

### Con Node.js (cualquier SO)

```bash
# Instala http-server globalmente (primera vez)
npm install -g http-server

# Navega a la carpeta del juego
cd ruta/a/Pacman

# Inicia el servidor
http-server
```

Luego abre: **http://localhost:8080**

### Con PHP

```bash
# En la carpeta del juego
php -S localhost:8000
```

Luego abre: **http://localhost:8000**

---

## Opción 3: Usar un Editor con Live Server

### VS Code (Visual Studio Code)

1. Abre la carpeta `Pacman` en VS Code
2. Instala la extensión **"Live Server"** (por Ritwick Dey)
3. Haz clic derecho en `index.html`
4. Selecciona "Open with Live Server"

El juego se abrirá automáticamente en tu navegador por defecto.

### Sublime Text / Otros Editores

La mayoría de editores modernos tienen plugins similares. Busca "Live Server" o "Open in Browser".

---

## Requisitos del Sistema

- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Python 3 O Node.js (solo para ejecutar servidor)
- ✅ Sin instalaciones adicionales requeridas

---

## Primeros Pasos en el Juego

1. **En el Menú**
   - Haz clic en **JUGAR** (modo normal) o **MODO DIFÍCIL**
   - O ve a **RÉCORDS** para ver tu tabla de scores

2. **En el Juego**
   - Usa **Flechas** o **WASD** para mover a Pac-Man
   - Recoge **puntos** (círculos pequeños) = +10 pts
   - Busca **poder-ups** (círculos grandes en esquinas) = +50 pts
   - Come **frutas** (puntos de colores) = +100 pts
   - Presiona **ESPACIO** para pausar

3. **Modo Poder-Up**
   - Los fantasmas se vuelven azules y huyen
   - ¡Come fantasmas para +200 pts cada uno!
   - Dura unos 10 segundos

4. **Objetivo**
   - Recoge todos los puntos sin morir
   - Completa el nivel para pasar al siguiente
   - Sube tu puntuación en la tabla de récords

---

## Controles Rápida Referencia

| Acción | Tecla |
|--------|-------|
| Mover Arriba | ⬆️ o W |
| Mover Abajo | ⬇️ o S |
| Mover Izquierda | ⬅️ o A |
| Mover Derecha | ➡️ o D |
| Pausa/Reanudar | ESPACIO |
| Reiniciar | R |
| Menú | ESC o botón Menú |

### Móvil
- **D-Pad**: Botones direccionales en pantalla
- **⏸ Botón**: Pausa
- **⟲ Botón**: Reiniciar

---

## Solución de Problemas

### ❌ "El juego no se ve"
**Solución**: Asegúrate de que todos los archivos (HTML, CSS, JS) estén en la misma carpeta

### ❌ "Sin sonido"
**Solución**: 
- Los sonidos requieren interacción del usuario (hacer clic primero)
- Usa un servidor local (no doble-clic)
- Revisa que los speakers estén encendidos

### ❌ "El juego está muy lento"
**Solución**:
- Cierra otras pestañas/programas
- Usa modo normal en lugar de modo difícil
- Actualiza tu navegador

### ❌ "Los controles no funcionan"
**Solución**:
- Haz clic en el juego primero (enfoca la ventana)
- Prueba usar flechas en lugar de WASD
- Recarga la página (F5)

### ❌ "Error en la consola"
**Solución**:
- Abre DevTools (F12)
- Verifica que no haya errores de archivos faltantes
- Todos los archivos deben estar en la misma carpeta

---

## Características del Juego

✅ **Modo Normal** - Velocidad estándar
✅ **Modo Difícil** - Fantasmas más rápidos  
✅ **Tabla de Récords** - LocalStorage (se guarda automáticamente)
✅ **Múltiples Niveles** - Dificultad progresiva
✅ **Sonidos Retro** - Web Audio API
✅ **Responsive Design** - Desktop, tablet, móvil
✅ **Controles Táctiles** - Para móvil
✅ **Pausa/Reinicio** - Durante el juego

---

## Ayuda y Documentación

Para más información, consulta:
- 📖 **README.md** - Guía completa del juego
- 📋 **TESTING_CHECKLIST.md** - Lista de características
- 💻 **Código comentado** - En game.js, style.css, audio.js

---

## Sugerencias de Juego

🎮 **Principiantes**:
- Comienza en modo normal
- Aprende los patrones de los fantasmas
- Busca los power-ups para defensa

🏆 **Jugadores Experimentados**:
- Intenta modo difícil
- Maximiza puntos comiendo frutas
- Completa niveles rápidamente

---

**¡Disfruta el juego! 👾**

Si encuentras algún bug, asegúrate de que todos los archivos estén presentes:
- ✅ index.html
- ✅ style.css  
- ✅ game.js
- ✅ audio.js
- ✅ README.md

Todos deben estar en la **misma carpeta**.
