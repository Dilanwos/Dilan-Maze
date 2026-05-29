# Ghost AI Scoring System - Visual Explanation

## How Ghost Movement Decisions Work

### Example Scenario 1: Direct Chase

```
Map:
  . . . . . . .
  . . . . . . .
  . . G . . . .    G = Ghost at (2,2)
  . . . . P . .    P = Player at (4,3)
  . . . . . . .

Available moves from ghost:
- Up:    to (2,1)
- Down:  to (2,3)
- Left:  to (1,2)
- Right: to (3,2)

Current preferredDirection: left (from last move)
```

#### Score Calculation

```
UP:
  - Distance to player: |2-4| + |1-3| = 2 + 2 = 4
  - Score base: -4
  - Continuity bonus: Is up == left? NO → +0
  - Reversal penalty: Is up == opposite(left)? NO → -0
  - TOTAL: -4

DOWN:
  - Distance to player: |2-4| + |3-3| = 2 + 0 = 2  ← MIN DISTANCE!
  - Score base: -2
  - Continuity bonus: Is down == left? NO → +0
  - Reversal penalty: Is down == opposite(left)? YES (down ≠ right) → -0
  - TOTAL: -2  ← BEST!

LEFT:
  - Distance to player: |1-4| + |2-3| = 3 + 1 = 4
  - Score base: -4
  - Continuity bonus: Is left == left? YES → +10
  - Reversal penalty: Is left == opposite(left)? NO → -0
  - TOTAL: -4 + 10 = +6

RIGHT:
  - Distance to player: |3-4| + |2-3| = 1 + 1 = 2  ← MIN DISTANCE!
  - Score base: -2
  - Continuity bonus: Is right == left? NO → +0
  - Reversal penalty: Is right == opposite(left)? YES (right = opposite left) → -8
  - TOTAL: -2 - 8 = -10

DECISION:
  Best score: DOWN (-2) > UP (-4) > RIGHT (-10) > LEFT (+6)
  MOVE: DOWN (closest to player, breaking continuity to catch prey)
```

**Result**: Ghost moves down toward player (natural chase behavior)

---

### Example Scenario 2: Smooth Direction Continuation

```
Ghost moving RIGHT toward player (same row):

Moves from ghost:
- Up:    Far away, different row → Score: -distance
- Down:  Far away, different row → Score: -distance  
- Left:  Wrong direction, wall ahead → Can't move
- Right: Continue direction, get closer → BEST

preferredDirection: right (from last move)

Scoring:
RIGHT:
  - Distance minimized: -small_distance
  - Continuity BONUS: right == right? YES → +10
  - No reversal
  - TOTAL: Best score
  
RESULT: Ghost naturally continues right
```

**Why?** The +10 bonus for continuity means:
- If ghost is already moving right toward player
- It will keep moving right (smooth)
- Only change direction if much better option (reversal is penalized -8)

---

### Example Scenario 3: Avoiding Reversal (No Bouncing)

```
Ghost at dead end, moving LEFT:

         WALL
    . . P . .    
  G . . . .      
    W . . .      
    A . . .      
    L . . .      
    L . . .

Available moves:
- Up:    distance = 3, can move
- Down:  distance = 5, can move
- Left:  WALL, can't move
- Right: reversal! (opposite of current left)

Scoring:
UP:
  - Distance: 3
  - Score base: -3
  - Continuity: up vs left? NO → +0
  - Reversal: up vs right (opposite left)? NO → -0
  - TOTAL: -3  ← BEST

DOWN:
  - Distance: 5
  - Score base: -5
  - Continuity: down vs left? NO → +0
  - Reversal: down vs right? NO → -0
  - TOTAL: -5

RIGHT:
  - Score base: -distance
  - Continuity: NO → +0
  - Reversal: YES (right = opposite left) → -8
  - TOTAL: -distance - 8  ← WORST!

DECISION: UP
```

**Result**: Ghost turns UP (logical), doesn't bounce back (reversal penalized)

---

### Example Scenario 4: Power-Up Escape (Scared Mode)

```
Player getting power-up, ghosts flee:

  . . . . P .
  . . . G . .
  . . . . . .

Scared mode: moveAwayFromPlayer() [MAXIMIZE distance]

Available moves:
- Up:    distance = |2-0| + |3-1| = 2 + 2 = 4
- Down:  distance = |2-2| + |3-1| = 0 + 2 = 2
- Left:  distance = |1-0| + |3-1| = 1 + 2 = 3
- Right: distance = |3-0| + |3-1| = 3 + 2 = 5  ← MAX DISTANCE!

Scared Scoring (maximize distance):
RIGHT:
  - Distance: 5
  - Score base: +5  ← MAXIMIZE
  - Continuity: (if going right already) +5 else +0
  - Reversal: -3 (less aggressive than chase)
  - TOTAL: Likely best

DECISION: RIGHT (flee away from player)
```

**Result**: Ghost flees naturally away, not random

---

## Scoring Formula Summary

### Chase Mode (Normal)
```
score = -distance + continuity_bonus - reversal_penalty

where:
  distance = |newX - playerX| + |newY - playerY|  [Manhattan]
  continuity_bonus = (direction == preferredDirection) ? 10 : 0
  reversal_penalty = (direction == opposite(preferredDirection)) ? 8 : 0
  
GOAL: MAXIMIZE score (which minimizes distance due to negative)
```

### Flee Mode (Power-Up)
```
score = distance + continuity_bonus - reversal_penalty

where:
  distance = |newX - playerX| + |newY - playerY|  [Manhattan]
  continuity_bonus = (direction == preferredDirection) ? 5 : 0
  reversal_penalty = (direction == opposite(preferredDirection)) ? 3 : 0
  
GOAL: MAXIMIZE score (which maximizes distance)
```

**Key Differences**:
- Chase: Negative distance (want small)
- Flee: Positive distance (want large)
- Chase bonuses larger: Pursuit > Escape
- Both penalize reversals (prevent bouncing)

---

## Movement Patterns This Creates

### Pattern 1: Direct Pursuit
```
Initial: Ghost moving right toward player
Result: Continues right until blocked
        Then chooses next best option (usually up/down toward player)
Visual: Smooth diagonal pursuit
```

### Pattern 2: Corner Navigation
```
Initial: Ghost reaching dead end while going left
Result: Turns up (away from reversal penalty)
        Continues up until able to pursue again
Visual: Natural navigation around obstacles
```

### Pattern 3: Smooth Escape
```
Initial: Power-up active, ghost scared
Result: Ghost continuously maximizes distance
        Prefers continuing same direction when possible
        Never bounces back
Visual: Coherent escape, not random flailing
```

### Pattern 4: Balanced Chase
```
Initial: Multiple paths equally distance to player
Result: If currently going same direction: STAY (inertia)
        If blocked: Pick non-reversal direction
        Never wastes move going backward
Visual: Efficient, thoughtful pursuit
```

---

## Why This Works Better

### Before (Pure Greedy)
```javascript
for each direction:
    calculate distance
    pick one with MIN distance
```
Problems:
- No memory of previous direction
- Multiple equal distances → random selection → bouncing
- No preference continuity → erratic changes
- Gets stuck oscillating in corners

### After (Scoring System)
```javascript
for each direction:
    calculate distance
    ADD bonus for continuity
    SUBTRACT penalty for reversal
    pick one with MAX score
```
Benefits:
- Remembers previous direction
- Ties broken by continuity (natural movement)
- Reversals penalized (no bouncing)
- Stays in flow until must change
- Professional, arcade-like feel

---

## Tuning the Scores

Current values (can be adjusted):
```javascript
// Chase mode
continuity_bonus_chase = 10      // Prefer staying on course
reversal_penalty_chase = 8       // Strongly avoid bouncing

// Flee mode  
continuity_bonus_flee = 5        // Prefer staying on course (less)
reversal_penalty_flee = 3        // Avoid bouncing (less)
```

If you want to adjust behavior:
- **Increase continuity bonus**: More inertia, straighter paths
- **Decrease continuity bonus**: More responsive, more direction changes
- **Increase reversal penalty**: No bouncing (very stable)
- **Decrease reversal penalty**: Can bounce back (more tactical)

---

## Real-World Examples

### Example: Ghost Chasing You Down a Corridor
```
Ghost: moving RIGHT toward you
You: in same corridor, 3 cells to the right

Frame 1: Ghost calculates scores
  RIGHT: -3 distance -8 reversal = BEST
  Move RIGHT
  
Frame 2: Ghost calculates scores  
  RIGHT: -2 distance +10 continuity = BEST
  Move RIGHT (continuing smoothly)
  
Frame 3: Ghost calculates scores
  RIGHT: -1 distance +10 continuity = BEST
  Move RIGHT (continuing smoothly)

Result: Ghost pursues straight down corridor (natural!)
```

### Example: Ghost Navigating Maze
```
Ghost: at corner, moving UP toward player

Corner has 3 valid moves: left, right, continue up

Scoring:
  UP:    -distance + 10 (continuity)  = BEST (continue)
  LEFT:  -distance + 0 (not preferred) = OK
  RIGHT: -distance - 8 (reversal)    = WORST

Result: Ghost continues UP naturally
        Only changes direction when necessary
Visual: Smooth maze navigation
```

---

## Conclusion

The scoring system ensures ghosts:
1. **Chase effectively** - Minimize distance to player
2. **Move smoothly** - Continuity bonus prevents erratic changes  
3. **Never bounce** - Reversal penalty prevents oscillation
4. **Navigate corners** - Intelligent direction selection
5. **Feel natural** - Like arcade Pac-Man ghosts

This combination creates professional, arcade-quality ghost movement! 🎮
