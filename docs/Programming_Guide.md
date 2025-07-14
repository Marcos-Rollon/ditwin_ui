# DiTwin Library Programming Guide

This library provides synchronous functions to control the digital twin over the websocket interface. It was made with students in mind, so there is not parallelism. If you want to implement parallel operations, use the websocket interface directly.

## How to run the library

If you want to use it with the DiTwin visual interface, just go to the “Code” screen and start programming, everything is bundled for you. 
If you prefer to use your own IDE, download the associated files for the project files and install all the dependencies with npm install. Then run it as any other normal nodejs project. 

### A simple use example

``` js
async function main() {
 dtwin.CONNECT();
 dtwin.MOVEJ(homePoint);
 dtwin.MOVEJ(
   dtwin.APPRO(
     pickupPoint,
     -45
   )
 );
 dtwin.CLOSE();
}
```

This small program connects to the digital twin, sends a couple of movement orders, and closes the connection. It shows the general way of using this library, where you need to open the connection, send whatever order you want to the digital twin, and close the connection.

## Custom Data Types

This library implements two custom datatypes to be used with. They are a representation of a transform, a 3D rigid body transformation in space (rotation and translation). They both could represent the same information, but is often useful to have the two, to make it easier to work with and to follow the robotics conventions.

## Classes

### `Transform`

Represents a 3D transformation (translation + rotation).

#### Constructor

```js
new Transform(x, y, z, rxDeg, ryDeg, rzDeg)
````
x, y, z: translation components.

rxDeg, ryDeg, rzDeg: rotation angles (degrees) around X, Y, Z axes.

#### Static Methods
``` js
Transform.fromMatrix4x4(matrix: Matrix4x4): Transform
```
Converts a matrix to a transform.
``` js
Transform.compose(a: Transform, b: Transform): Transform
```
Composes two transforms (a ∘ b).
``` js
Transform.inverse(a: Transform): Transform
``` 
Returns the inverse of a transform.
``` js
Transform.zDisplacement(z: number): Transform
``` 
Returns a pure Z-axis translation.

#### Instance Methods
``` js
toMatrix4x4(): Matrix4x4
``` 
Converts this transform to a matrix.

#### Example

```js
const transform = new Transform(1, 2, 3, 45, 90, 0);
const matrix = transform.toMatrix4x4();
```

### `Matrix4x4`

Represents a 4x4 matrix for transformations in 3D space.

#### Constructor

```js
new Matrix4x4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
```

Creates a new matrix from the given values.

#### Static Methods

``` js
Matrix4x4.fromRows(row1: Array<number>, row2: Array<number>, row3: Array<number>, row4: Array<number>): Matrix4x4
```
Creates a matrix from four rows.

``` js
Matrix4x4.fromColumns(column1: Array<number>, column2: Array<number>, column3: Array<number>, column4: Array<number>): Matrix4x4
```
Creates a matrix from four columns.

``` js
Matrix4x4.identity(): Matrix4x4
```
Creates an identity matrix.

``` js
Matrix4x4.translationMatrix(x: number, y: number, z: number): Matrix4x4
```
Creates a translation matrix.

``` js
Matrix4x4.rotationMatrixFromEulerZYX(rx: number, ry: number, rz: number): Matrix4x4
```
Creates a rotation matrix from ZYX Euler angles.

``` js
Matrix4x4.fromTransform(x: number, y: number, z: number, rxDeg: number, ryDeg: number, rzDeg: number): Matrix4x4
```
Creates a matrix from a Transform data.

#### Instance Methods

``` js
toTransform(): Transform
```
Converts this matrix to a Transform instance.

``` js
createTransformMatrix(x: number, y: number, z: number, rx: number, ry: number, rz: number): Array<Array<number>>
```
Creates a matrix from Transform data.

``` js
transformMatrixToComponents(matrix: Array<Array<number>>): { x: number, y: number, z: number, rx: number, ry: number, rz: number }
```
Extracts the position and rotation from a matrix.

``` js
multiplyMatrices4x4(A: Array<Array<number>>, B: Array<Array<number>>): Array<Array<number>>
```
Multiplies two matrices.

#### Simple Example

```js
const matrix = Matrix4x4.fromRows([1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]);
const transform = Matrix4x4.fromTransform(1, 2, 3, 45, 90, 0);
```

#### Another example
```js

let T1 = new Transform(0, 0, 200, 0, 0, 0);
let T2 = new Transform(0, 0, 0, 90, 0, 0);
let composed = Transform.compose(T1, T2);

dtwin.MOVEL(composed);
```

## Dtwin API

These are the methods avaliable to be used in the code. All of then are synchronous, so they block until the operation is finished. There is a timeout of 10 seconds for each operation, so if you want to do something that takes a long time, you can use the `DELAY` function to pause the execution for a while. If the operation takes longer than 10 seconds, but is still a valid operation, change the value of the constant `TIMEOUT_MS` in the file `blocking_ws.js` to a higher value. This is only possible to do if you use the library directly, not the visual interface.

### `CONNECT()`

Connects to the digital twin.

### `CHECK_EXTERNAL_CONTROL_ALLOWED()`

Checks if the external control is allowed on the digital twin. This is a legacy function and is not needed in most applications.

### `CLOSE()`

Closes the connection to the digital twin.

### `USE_SIMULATION_MODE()`

Sets the digital twin to use simulation mode. This only makes sense when you are connecting with the real robot.

### `USE_REAL_ROBOT()`

Sets the digital twin to use the real robot. If you are running the version of the digital twin that is only a simulation, this will not do anything.

### `IS_REAL_ROBOT_ONLINE()`

Checks if the real robot is online. If you are running the version of the digital twin that is only a simulation, this will not do anything.

### `RESET_ENVIROMENT()`

Resets the environment of the digital twin.

### `WRITE(port, value)`

Writes a value to a digital port.

port: the port number.
value: the value to write.

#### Example

```js
// Here the conveyor starts to move
dtwin.WRITE(0, 1);
```

| Digital Output | Description |
| --- | --- |
| 0 | Conveyor ON signal |
| 1 | Conveyor direction |

### `READ(port)`

Reads a value from a digital port.

port: the port number.


| Digital Input | Description |
| --- | --- |
| 0 | Proximity sensor |

#### Example

```js
const value = dtwin.READ(0);
if (value === 1) {
  console.log("Proximity sensor high, piece detected");
}
```

### `WAIT(port, value)`

Waits until a digital port has a certain value.

port: the port number.

value: the value to wait for.

#### Example

```js
dtwin.WRITE(0, 1); // Starts the conveyor
dtwin.WAIT(0, 1); // Waits until there is a pice in the proximity sensor
dtwin.WRITE(0, 0); // Stops the conveyor
```

### `DELAY(milliseconds)`

Pauses the execution for a certain amount of milliseconds.

milliseconds: the amount of milliseconds to pause.

### `MOVEJ(theta1, theta2, theta3, theta4, theta5, theta6)`

Moves the robot in joint space.

theta1, theta2, theta3, theta4, theta5, theta6: the joint angles in degrees.

For convenience, the inputs can be given as an array of 6 elements or as 6 separate elements.

#### Example

```js
// Moves the robot to the home position
dtwin.MOVEJ(0, -90, 0, -90, 0, 0);
dtwin.MOVEJ([0, -90, 0, -90, 0, 0]); // the same as above, but using an array
```

### `MOVEL(x, y, z, rx, ry, rz)`

Moves the robot in cartesian space.

x, y, z: the translation components in mm.

rx, ry, rz: the rotation angles in degrees.

The inputs can be given as an instance of the Transform class, or as 6 separate elements.

#### Example

```js
dtwin.MOVEL(230, -220, 330, 0, -90, 0); // Position as 6 elements
const transform = new Transform(230, -220, 330, 0, -90, 0); 
dtwin.MOVEL(transform); // Position as Transform instance
```

### `OPEN_GRIP()`

Opens the gripper.

### `CLOSE_GRIP()`

Closes the gripper.

### `RIGHTY()`, `LEFTY()`, `UP()`, `DOWN()`, `POSITIVE()`, `NEGATIVE()`

Sets the robot to the corresponding configuration.

#### Example

```js
dtwin.RIGHTY();
dtwin.UP();
dtwin.POSITIVE();
```

## FAQ

### How do I use the library with the visual interface?

Just go to the “Code” screen and start programming, everything is bundled for you. 

### How do I use the library with my own IDE?

Download the associated files for the project files and install all the dependencies with npm install. Then run it as any other normal nodejs project.

### Do I need to write my code on the main function?
Yes. The main function is the entry point of the program. But you can also write your own functions and call them from the main function.

### Can I use asynchronous programming (promises, async/await, etc.)?
No. The library is synchronous, so you can only use synchronous programming. If you want to use asynchronous programming, use the websocket interface directly.

### Are other URScript commands supported?
No. Use the websocket interface directly if you want to use other URScript commands.

### Can I use this library to program complex/time sensitive control flows?
Yes. But you need to remember that the library is synchronous, so you can only use synchronous programming. Also, to each function has a pulling time, so the fastest that they can be executed is 100ms. You can reduce this time by changing the value of the constant `PULLING_TIME_MS` in the file 'blocking_ws.js' to a higher value. But if you want to create a complex control flow, you should use the websocket interface directly.



## License
 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.