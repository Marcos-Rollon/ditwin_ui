const path = require('path')
const testLibrary = require(path.join(__dirname, 'user-modules', 'test_library.js'))
const { WebsocketBlocking, STATE } = require(path.join(__dirname, 'user-modules', 'blocking_ws.js'))
const { Transform } = require(path.join(__dirname, 'user-modules', 'Transform.js'))
const {
  CONNECT,
  CHECK_EXTERNAL_CONTROL_ALLOWED,
  CLOSE,
  LOG,
  USE_SIMULATION_MODE,
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
} = require(path.join(__dirname, 'user-modules', 'dtwin.js'))

let hasRun = false

process.on('message', async (msg) => {
  // Guard against multiple executions
  if (hasRun) {
    console.error('Code already running')
    return
  }
  hasRun = true

  const { code } = msg

  const send = (type, data, level) => {
    if (process.send) {
      process.send({ type, data, level })
    }
  }

  const sandbox = {
    console: {
      log: (...args) => send('log', args.join(' ')),
      error: (...args) => send('log', args.join(' '), 'error'),
      warn: (...args) => send('log', args.join(' '), 'warning')
    },
    require,
    testLibrary,
    WebsocketBlocking,
    Transform,
    STATE,
    CONNECT,
    CHECK_EXTERNAL_CONTROL_ALLOWED,
    CLOSE,
    LOG,
    USE_SIMULATION_MODE,
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

  try {
    const wrappedCode = `
      return (async () => {
        try {
            const ws = new WebsocketBlocking('ws://127.0.0.1:8082', ()=>{
              main(ws)
            });
            async function main(ws){
              CONNECT(ws);
              try{
                ${code}
                await ws.waitUntilIdle();
                
              }catch(e){
                send('error', e.message);
              }finally{
                CLOSE();
              }
              
              send('done', 'Execution complete');
            }
        } catch (e) {
          send('error', e.message);
        }
      })();
    `

    sandbox.send = send
    const fn = new Function(...Object.keys(sandbox), wrappedCode)
    //console.log('Executing code', fn)
    await fn(...Object.values(sandbox))
  } catch (err) {
    send('error', err.message)
  }
})

process.on('SIGTERM', () => {
  process.send?.({ type: 'log', data: 'Terminated by user', level: 'warning' })
  process.exit(0)
})
