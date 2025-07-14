//const { sleep } = require('deasync')
const { STATE } = require('./blocking_ws.js')
const { Transform, Matrix4x4 } = require('./Transform.js')
let ws
function sleep(ms) {
  const sab = new SharedArrayBuffer(4)
  const int32 = new Int32Array(sab)
  Atomics.wait(int32, 0, 0, ms)
}

function CONNECT(socket) {
  //ws = new WebsocketBlocking('ws://127.0.0.1:8082')
  ws = socket
  // console.log('Trying to connect')
  // console.log(ws)
  // while (!ws.connected) {
  //   console.log('.')
  //   sleep(STATE.PULLING_TIME_MS * 10)
  // }
  return
}

function CHECK_EXTERNAL_CONTROL_ALLOWED() {
  ws.requestExternalControlState()
  if (STATE.EXTERNAL_CONTROL_ALLOWED) {
    return
  } else {
    console.log('External control not allowed. Check in the Digital Twin and rerun the program.')
    ws.close()
    process.exit(0)
  }
}

function CLOSE() {
  ws.close()
}

function USE_SIMULATION_MODE() {
  // TODO: implement
}

function LOG(params) {
  ws.log(params)
}

function USE_REAL_ROBOT() {
  // TODO: implement
}

function IS_REAL_ROBOT_ONLINE() {
  // TODO: implement
}

function RESET_ENVIROMENT() {
  ws.resetEnviroment()
}

// ##### ROBOT, TODAS BLOQUEANTES #####

function WRITE(port, value) {
  ws.digitalWrite(port, value)
}

function READ(port) {
  ws.digitalRead(port)
  return STATE.DIGITAL_INPUTS[port]
}

function WAIT(port, value) {
  ws.wait(port, value)
}

function DELAY(milliseconds) {
  sleep(milliseconds)
}

function MOVEJ(...joints) {
  // Check if the input is an array of 6 elements or 6 separate elements
  let angles

  if (joints.length === 1 && Array.isArray(joints[0]) && joints[0].length === 6) {
    // If it's a single array with 6 elements, unpack it
    angles = joints[0]
  } else if (joints.length === 6) {
    // If it's 6 separate elements, use them directly
    angles = joints
  } else {
    throw new Error('MOVEJ expects either an array of 6 elements or 6 individual angle values.')
  }

  ws.moveJ(angles[0], angles[1], angles[2], angles[3], angles[4], angles[5])
}

function MOVEL(...position) {
  let x, y, z, rxDeg, ryDeg, rzDeg

  // Check if a single Transform instance is passed
  if (position.length === 1 && position[0] instanceof Transform) {
    const transform = position[0]
    x = transform.x
    y = transform.y
    z = transform.z
    rxDeg = transform.rxDeg
    ryDeg = transform.ryDeg
    rzDeg = transform.rzDeg
  } else if (position.length === 6) {
    // If 6 separate elements are passed
    ;[x, y, z, rxDeg, ryDeg, rzDeg] = position
  } else {
    throw new Error(
      'MOVEL expects either 6 separate parameters or a single instance of the Transform class.'
    )
  }
  ws.moveL(x, y, z, rxDeg, ryDeg, rzDeg)
}

function OPEN_GRIP() {
  ws.grip(true)
}

function CLOSE_GRIP() {
  ws.grip(false)
}

function RIGHTY() {
  ws.robotConfig(true, false, null, null, null, null)
}

function LEFTY() {
  ws.robotConfig(false, true, null, null, null, null)
}

function UP() {
  ws.robotConfig(null, null, true, false, null, null)
}

function DOWN() {
  ws.robotConfig(null, null, false, true, null, null)
}

function POSITIVE() {
  ws.robotConfig(null, null, null, null, true, false)
}

function NEGATIVE() {
  ws.robotConfig(null, null, null, null, false, true)
}

/**
 * Applies a transformation (APPRO) by combining two transforms.
 * @param {Transform} point - The initial point.
 * @param {Transform} transform - The transformation to apply.
 * @returns {Transform} The transformed point.
 */
function APPRO(point, transform) {
  // Sanity check to ensure that the point is an instance of Transform
  if (!(point instanceof Transform)) {
    throw new Error('APPRO expects a Transform instance as the first argument.')
  }

  // Sanity check to ensure that the transform is an instance of Transform
  if (!(transform instanceof Transform)) {
    throw new Error('APPRO expects a Transform instance as the second argument.')
  }
  let pointMatrix = point.toMatrix4x4()
  let transformMatrix = transform.toMatrix4x4()
  let resultMatrix = Matrix4x4.multiply(pointMatrix, transformMatrix)
  return Transform.fromMatrix4x4(resultMatrix)
}

module.exports = {
  CONNECT,
  CHECK_EXTERNAL_CONTROL_ALLOWED,
  CLOSE,
  USE_SIMULATION_MODE,
  LOG,
  USE_REAL_ROBOT,
  IS_REAL_ROBOT_ONLINE,
  RESET_ENVIROMENT,
  WRITE,
  READ,
  WAIT,
  DELAY,
  MOVEJ,
  MOVEL,
  OPEN_GRIP,
  CLOSE_GRIP,
  RIGHTY,
  LEFTY,
  UP,
  DOWN,
  POSITIVE,
  NEGATIVE,
  APPRO
}
