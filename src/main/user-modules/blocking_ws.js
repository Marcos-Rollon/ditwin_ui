const WebSocket = require('ws')

const TIMEOUT_MS = 100_000

let STATE = {
  EXTERNAL_CONTROL_ALLOWED: false,
  EMERGENCY_STOP: false,
  ROBOT_IS_MOVING: false,
  MOVEMENT_FINISHED: false,
  GRIPPER_MOVEMENT_FINISHED: true,
  DIGITAL_READ_IN_PROGRESS: false,
  DIGITAL_WRITE_IN_PROGRESS: false,
  DIGITAL_INPUTS: Object.fromEntries([...Array(9).keys()].map((k) => [k, false])),
  PULLING_TIME_MS: 100
}

class WebsocketBlocking {
  constructor(url, onConnect) {
    this.ws = new WebSocket(url)
    this.connected = false
    this._queue = Promise.resolve()

    this.ws.on('open', () => {
      this.connected = true
      onConnect?.()
    })

    this.ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg)
        switch (data.type) {
          case 'MOVEMENT_FINISHED':
            STATE.MOVEMENT_FINISHED = true
            break
          case 'GRIPPER_MOVEMENT_FINISHED':
            STATE.GRIPPER_MOVEMENT_FINISHED = true
            break
          case 'DIGITAL_WRITE':
            STATE.DIGITAL_WRITE_IN_PROGRESS = false
            break
          case 'DIGITAL_READ':
            STATE.DIGITAL_INPUTS[data.data.port] = data.data.value
            STATE.DIGITAL_READ_IN_PROGRESS = false
            break
          case 'EXTERNAL_CONTROL':
            STATE.EXTERNAL_CONTROL_ALLOWED = data.data.state
            break
          case 'EMERGENCY_STOP':
            STATE.EMERGENCY_STOP = true
            console.error('Emergency stop triggered. Exiting.')
            process.exit(0)
        }
      } catch (e) {
        console.error('Malformed WebSocket message:', e)
      }
    })
  }

  _enqueue(fn) {
    this._queue = this._queue.then(() => fn()).catch(console.error)
  }

  _sendCommand(type, data) {
    const message = JSON.stringify({ type, data })
    this.ws.send(message)
  }

  async _waitUntilAsync(conditionFn, timeoutMs = TIMEOUT_MS, errorMsg = 'Timeout') {
    const start = Date.now()
    while (!conditionFn()) {
      if (Date.now() - start > timeoutMs) throw new Error(errorMsg)
      await new Promise((r) => setTimeout(r, STATE.PULLING_TIME_MS))
    }
  }

  moveJ(theta1, theta2, theta3, theta4, theta5, theta6, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      STATE.MOVEMENT_FINISHED = false
      this._sendCommand('MOVEJ', { theta1, theta2, theta3, theta4, theta5, theta6 })
      await this._waitUntilAsync(() => STATE.MOVEMENT_FINISHED, timeoutMs, 'MOVEJ timeout')
    })
  }

  moveL(x, y, z, rx, ry, rz, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      STATE.MOVEMENT_FINISHED = false
      this._sendCommand('MOVEL', { x, y, z, rx, ry, rz })
      await this._waitUntilAsync(() => STATE.MOVEMENT_FINISHED, timeoutMs, 'MOVEL timeout')
    })
  }

  grip(open, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      STATE.GRIPPER_MOVEMENT_FINISHED = false
      this._sendCommand('GRIP', open)
      await this._waitUntilAsync(() => STATE.GRIPPER_MOVEMENT_FINISHED, timeoutMs, 'GRIP timeout')
    })
  }

  robotConfig(lefty, righty, up, down, positive, negative) {
    this._enqueue(() => {
      this._sendCommand('ROBOT_CONFIG', { lefty, righty, up, down, positive, negative })
    })
  }

  digitalWrite(port, value, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      STATE.DIGITAL_WRITE_IN_PROGRESS = true
      this._sendCommand('DIGITAL_WRITE', { port, value })
      await this._waitUntilAsync(
        () => !STATE.DIGITAL_WRITE_IN_PROGRESS,
        timeoutMs,
        'DIGITAL_WRITE timeout'
      )
    })
  }

  log(params) {
    this._enqueue(() => {
      console.log(params)
    })
  }

  digitalRead(port, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      STATE.DIGITAL_READ_IN_PROGRESS = true
      this._sendCommand('DIGITAL_READ', { port })
      await this._waitUntilAsync(
        () => !STATE.DIGITAL_READ_IN_PROGRESS,
        timeoutMs,
        'DIGITAL_READ timeout'
      )
    })
  }

  wait(port, value, timeoutMs = TIMEOUT_MS) {
    this._enqueue(async () => {
      await this._waitUntilAsync(
        () => STATE.DIGITAL_INPUTS[port] === value,
        timeoutMs,
        `Wait on port ${port} timed out`
      )
    })
  }

  requestExternalControlState() {
    this._enqueue(async () => {
      this._sendCommand('EXTERNAL_CONTROL', {})
      await new Promise((r) => setTimeout(r, STATE.PULLING_TIME_MS * 3))
    })
  }

  resetEnviroment() {
    this._enqueue(() => {
      this._sendCommand('RESET_ENVIROMENT', {})
    })
  }

  close() {
    this.ws.close()
  }

  waitUntilIdle() {
    return this._queue
  }
}

module.exports = {
  WebsocketBlocking,
  STATE
}

// const WebSocket = require('ws')

// const TIMEOUT_MS = 10_000 // default timeout for blocking operations

// let STATE = {
//   EXTERNAL_CONTROL_ALLOWED: false,
//   EMERGENCY_STOP: false,
//   ROBOT_IS_MOVING: false,
//   GRIPPER_MOVEMENT_FINISHED: true,
//   DIGITAL_READ_IN_PROGRESS: false,
//   DIGITAL_WRITE_IN_PROGRESS: false,
//   DIGITAL_INPUTS: Object.fromEntries([...Array(9).keys()].map((k) => [k, false])),
//   PULLING_TIME_MS: 100
// }

// function sleep(ms) {
//   const sab = new SharedArrayBuffer(4)
//   const int32 = new Int32Array(sab)
//   Atomics.wait(int32, 0, 0, ms)
// }

// class WebsocketBlocking {
//   constructor(url, onConnect) {
//     this.ws = new WebSocket(url)
//     this.connected = false

//     this.ws.on('open', () => {
//       this.connected = true
//       if (onConnect) onConnect()
//     })

//     this.ws.on('message', (msg) => {
//       try {
//         const data = JSON.parse(msg)
//         switch (data.type) {
//           case 'MOVEMENT_FINISHED':
//             STATE.MOVEMENT_FINISHED = true
//             break
//           case 'GRIPPER_MOVEMENT_FINISHED':
//             STATE.GRIPPER_MOVEMENT_FINISHED = true
//             break
//           case 'DIGITAL_WRITE':
//             STATE.DIGITAL_WRITE_IN_PROGRESS = false
//             break
//           case 'DIGITAL_READ':
//             STATE.DIGITAL_INPUTS[data.data.port] = data.data.value
//             STATE.DIGITAL_READ_IN_PROGRESS = false
//             break
//           case 'EXTERNAL_CONTROL':
//             STATE.EXTERNAL_CONTROL_ALLOWED = data.data.state
//             break
//           case 'EMERGENCY_STOP':
//             STATE.EMERGENCY_STOP = true
//             console.error('Emergency stop triggered. Exiting.')
//             process.exit(0)
//         }
//       } catch (e) {
//         console.error('Malformed WebSocket message:', msg)
//       }
//     })
//   }

//   close() {
//     this.ws.close()
//   }

//   _sendCommand(type, data) {
//     const message = JSON.stringify({ type, data })
//     this.ws.send(message)
//   }

//   _waitUntil(conditionFn, timeoutMs = TIMEOUT_MS, errorMsg = 'Timeout waiting for condition') {
//     const start = Date.now()
//     while (!conditionFn()) {
//       if (Date.now() - start > timeoutMs) {
//         throw new Error(errorMsg)
//       }
//       sleep(STATE.PULLING_TIME_MS)
//     }
//   }

//   requestExternalControlState(timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('EXTERNAL_CONTROL', {})
//     sleep(STATE.PULLING_TIME_MS * 3)
//     return STATE.EXTERNAL_CONTROL_ALLOWED
//   }

//   moveJ(theta1, theta2, theta3, theta4, theta5, theta6, timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('MOVEJ', { theta1, theta2, theta3, theta4, theta5, theta6 })
//     STATE.MOVEMENT_FINISHED = false
//     this._waitUntil(() => STATE.MOVEMENT_FINISHED, timeoutMs, 'MOVEJ timeout')
//   }

//   moveL(x, y, z, rx, ry, rz, timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('MOVEL', { x, y, z, rx, ry, rz })
//     STATE.MOVEMENT_FINISHED = false
//     this._waitUntil(() => STATE.MOVEMENT_FINISHED, timeoutMs, 'MOVEL timeout')
//   }

//   grip(open, timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('GRIP', open)
//     STATE.GRIPPER_MOVEMENT_FINISHED = false
//     this._waitUntil(() => STATE.GRIPPER_MOVEMENT_FINISHED, timeoutMs, 'GRIP timeout')
//   }

//   robotConfig(lefty, righty, up, down, positive, negative) {
//     this._sendCommand('ROBOT_CONFIG', {
//       lefty,
//       righty,
//       up,
//       down,
//       positive,
//       negative
//     })
//   }

//   digitalWrite(port, value, timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('DIGITAL_WRITE', { port, value })
//     STATE.DIGITAL_WRITE_IN_PROGRESS = true
//     this._waitUntil(() => !STATE.DIGITAL_WRITE_IN_PROGRESS, timeoutMs, 'DIGITAL_WRITE timeout')
//   }

//   digitalRead(port, timeoutMs = TIMEOUT_MS) {
//     this._sendCommand('DIGITAL_READ', { port })
//     STATE.DIGITAL_READ_IN_PROGRESS = true
//     this._waitUntil(() => !STATE.DIGITAL_READ_IN_PROGRESS, timeoutMs, 'DIGITAL_READ timeout')
//     return STATE.DIGITAL_INPUTS[port]
//   }

//   resetEnviroment() {
//     this._sendCommand('RESET_ENVIROMENT', {})
//     sleep(STATE.PULLING_TIME_MS)
//   }

//   wait(port, value, timeoutMs = TIMEOUT_MS) {
//     this._waitUntil(
//       () => STATE.DIGITAL_INPUTS[port] === value,
//       timeoutMs,
//       `Wait on port ${port} timed out`
//     )
//   }
// }

// module.exports = {
//   WebsocketBlocking,
//   STATE
// }
