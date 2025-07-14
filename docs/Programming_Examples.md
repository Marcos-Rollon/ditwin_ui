Pick and place explained

```js
let firstCube = new Transform(-389.3343, 66.64413, -142.1046, -180, -0.0007847458, 90.00047)
let secondCube = new Transform(-464.5116, 2.664313, -142.8955, 179.6321, -0.0009711869, -0.1692289)
let thirdCube = new Transform(-332.5606, 2.672118, -144.8162, 179.632, -0.001077059, -0.1690943)
let releasePoint = new Transform(-285.2255, 243.447, -123.9432, 179.7958, -0.0004550728, 90.00119)

let upDisplacement = new Transform(0, 0, -80, 0, 0, 0) // Transform.zDisplacement(-80)

// Make sure the envrioment is reset
RESET_ENVIROMENT()

MOVEJ([0, -90, 0, -90, 0, 0])
CLOSE_GRIP()

// Grab first cube
MOVEL(APPRO(firstCube, upDisplacement))
OPEN_GRIP()
MOVEL(firstCube)
CLOSE_GRIP()
// Release first cube
MOVEL(APPRO(releasePoint, upDisplacement))
MOVEL(releasePoint)
OPEN_GRIP()
MOVEL(APPRO(releasePoint, upDisplacement))
CLOSE_GRIP()

// Grab second cube
MOVEL(APPRO(secondCube, upDisplacement))
OPEN_GRIP()
MOVEL(secondCube)
CLOSE_GRIP()
// Release Second cube
MOVEL(APPRO(releasePoint, new Transform(0, 0, -80 * 2, 0, 0, 0)))
MOVEL(APPRO(releasePoint, upDisplacement))
OPEN_GRIP()
MOVEL(APPRO(releasePoint, new Transform(0, 0, -80 * 2, 0, 0, 0)))

// Grab third cube
MOVEL(APPRO(thirdCube, upDisplacement))
OPEN_GRIP()
MOVEL(thirdCube)
CLOSE_GRIP()
// Release third cube
MOVEL(APPRO(releasePoint, new Transform(0, 0, -80 * 3, 0, 0, 0)))
MOVEL(APPRO(releasePoint, new Transform(0, 0, -80 * 2, 0, 0, 0)))
OPEN_GRIP()
MOVEL(APPRO(releasePoint, new Transform(0, 0, -80 * 3, 0, 0, 0)))

// Go back home
MOVEJ([0, -90, 0, -90, 0, 0])
CLOSE_GRIP()
```
