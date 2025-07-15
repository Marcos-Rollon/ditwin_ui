Pick and place explained

```js
let homeJoints = [0, -90, 0, -90, 0, 0]
let perpendicularJoints = [-180, -135, -45, -90, 90, 0]
let firstCube = new Transform(-389.3343, 66.64413, -142.1046, -180, -0.0007847458, 90.00047)
let secondCube = new Transform(-464.5116, 2.664313, -142.8955, 179.6321, -0.0009711869, -0.1692289)
let thirdCube = new Transform(-332.5606, 2.672118, -144.8162, 179.632, -0.001077059, -0.1690943)
let releasePoint = new Transform(-286.9491, 251.1293, -136.6218, 179.9999, 8.569278e-5, 89.53667)

let cubes = [firstCube, secondCube, thirdCube]

let verticalDistance = -60
let cubeHeight = -42

// Make sure the envrioment is reset
RESET_ENVIROMENT()

CLOSE_GRIP()
MOVEJ(homeJoints)
MOVEJ(perpendicularJoints)

function GRAB(point, separation) {
  MOVEL(APPRO(point, Transform.zDisplacement(separation)))
  OPEN_GRIP()
  MOVEL(point)
  CLOSE_GRIP()
  MOVEL(APPRO(point, Transform.zDisplacement(separation)))
}

function RELEASE(point, separation) {
  MOVEL(APPRO(point, Transform.zDisplacement(separation)))
  MOVEL(point)
  OPEN_GRIP()
  MOVEL(APPRO(point, Transform.zDisplacement(separation)))
}

for (let i = 0; i <= 2; i++) {
  let cube = cubes[i]
  GRAB(cube, verticalDistance)
  RELEASE(APPRO(releasePoint, Transform.zDisplacement(cubeHeight * i)), verticalDistance)
}

// Go back home
MOVEJ([0, -90, 0, -90, 0, 0])
CLOSE_GRIP()
```

Pick and place movej only

```js
let homeJoints = [0, -90, 0, -90, 0, 0]
let perpendicularJoints = [-180, -135, -45, -90, 90, 0]

function GRAB(point, appro) {
  MOVEJ(appro)
  OPEN_GRIP()
  MOVEJ(point)
  CLOSE_GRIP()
  MOVEJ(appro)
}
function RELEASE(point, appro) {
  MOVEJ(appro)
  MOVEJ(point)
  OPEN_GRIP()
  MOVEJ(appro)
}
MOVEJ(homeJoints)
MOVEJ(perpendicularJoints)

GRAB(
  [-159.36, -140.07, -79.54, -50.28, 90.45, -70.94],
  [-159.49, -131.12, -73.18, -65.59, 90.42, -71.16]
)
RELEASE(
  [-201.07, -136.99, -83.51, -49.47, 90.67, -201.35],
  [-201.1, -127.89, -78.51, -63.58, 90.62, -201.46]
)

GRAB(
  [-150.21, -120.2, -122.32, -27.57, 90.39, -235.7],
  [-150.16, -101.44, -114.46, -54.19, 90.32, -235.73]
)
RELEASE(
  [-200.7, -131.22, -79.93, -58.82, 90.65, -198.91],
  [-200.68, -127.81, -74.05, -68.1, 90.64, -198.93]
)

GRAB(
  [-164.97, -128.86, -103.52, -37.44, 90.58, -163.13],
  [-164.95, -115.59, -97.85, -56.38, 90.52, -163.19]
)
RELEASE(
  [-200.87, -125.22, -75.92, -68.83, 90.61, -199.13],
  [-201.06, -123.77, -64.68, -81.52, 90.61, -199.37]
)

// Go back home
MOVEJ(homeJoints)
CLOSE_GRIP()
```
