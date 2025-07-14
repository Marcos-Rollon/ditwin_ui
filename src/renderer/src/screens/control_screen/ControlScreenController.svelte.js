export default class ControlScreenController {
  // STATE
  pose = $state({
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0
  })
  configuration = $state({
    shoulder: true,
    elbow: true,
    wrist: true
  })
  joints = $state({
    theta1: 0,
    theta2: -90,
    theta3: 0,
    theta4: -90,
    theta5: 0,
    theta6: 0
  })
  auto = $state(false)

  digitalInput0 = $state(false)

  digitalOutput0 = $state(false)
  digitalOutput1 = $state(false)

  tool = $state(false)

  enviroments = $state([])

  // Inner vars
  realJoints = {
    theta1: 0,
    theta2: -90,
    theta3: 0,
    theta4: -90,
    theta5: 0,
    theta6: 0
  }
  realPose = {
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0
  }

  // PUBLIC API
  constructor(ws) {
    this.ws = ws
    // this is a trick to get the initial position on creation. Is fragile and should be replaced with a better solution
    this.isMoving = $state(true)
    setTimeout(() => {
      this.isMoving = false
    }, 500)
    this.__assignIOEvents()
  }

  onJointsSendButtonClicked = () => {
    console.log('Sending joints', $state.snapshot(this.joints))
    let data = { ...this.joints, instant: false }
    this.isMoving = true
    this.ws.send('MOVEJ', data)
  }
  onPoseSendButtonClicked = () => {
    this.isMoving = true
    console.log('Sending pose', this.pose)
    this.data = { ...this.pose, instant: false }

    this.ws.send('MOVEL', this.data)
  }
  onHomeButtonClicked = () => {
    this.isMoving = true
    this.ws.send('MOVEJ', {
      theta1: 0,
      theta2: -90,
      theta3: 0,
      theta4: -90,
      theta5: 0,
      theta6: 0,
      instant: false
    })
  }
  onMovementFinished = (joints, pose) => {
    console.log('Movement finished', joints, pose)
    this.isMoving = false
    this.joints = {
      theta1: joints[0],
      theta2: joints[1],
      theta3: joints[2],
      theta4: joints[3],
      theta5: joints[4],
      theta6: joints[5]
    }
    this.pose = pose
  }
  onCurrentPosition = (joints, pose) => {
    // Always save the real values
    this.realJoints = {
      theta1: joints[0],
      theta2: joints[1],
      theta3: joints[2],
      theta4: joints[3],
      theta5: joints[4],
      theta6: joints[5]
    }
    this.realPose = pose
    // If the robot is moving, update the UI
    if (this.isMoving) {
      this.joints = this.realJoints
      this.pose = this.realPose
    }
  }
  onStopButtonClicked = () => {
    this.isMoving = false
    this.ws.send('EMERGENCY_STOP', {})
  }
  onDigitalRead = (port, value) => {
    switch (port) {
      case 0:
        this.digitalInput0 = value
        break
      default:
        console.warn(`Unhandled digital port: ${port}`)
        break
    }
  }
  onPerpendicularButtonClicked = () => {
    this.isMoving = true
    this.ws.send('MOVEJ', {
      theta1: -180,
      theta2: -135,
      theta3: -45,
      theta4: -90,
      theta5: 90,
      theta6: 0,
      instant: false
    })
  }

  onSyncSlidersButtonClicked = () => {
    this.joints = this.realJoints
    this.pose = this.realPose
  }

  onEnviromentSelected = (env) => {
    //console.log('Selected enviroment', env)
    this.ws.send('SET_ENVIROMENT', env.name)
  }

  getEnviromentInfo = () => {
    this.ws.send('ENVIROMENT_INFO', {})
  }

  onSetRobotConfiguration = () => {
    this.ws.send('ROBOT_CONFIG', {
      lefty: this.shoulder,
      righty: !this.shoulder,
      up: this.elbow,
      down: !this.elbow,
      positive: this.wrist,
      negative: !this.wrist
    })
  }

  // PRIVATE METHODS
  __assignIOEvents = () => {
    // When the grip button changes, send the new value to the server
    $effect(() => {
      console.log('Sending grip', this.tool)
      if (this.ws.isConnected) this.ws.send('GRIP', this.tool)
    })
    // When the digital outputs change, send the new value to the server
    $effect(() => {
      console.log(this.digitalOutput0)
      if (this.ws.isConnected)
        this.ws.send('DIGITAL_WRITE', { port: 0, value: this.digitalOutput0 })
    })
    $effect(() => {
      console.log(this.digitalOutput1)
      if (this.ws.isConnected)
        this.ws.send('DIGITAL_WRITE', { port: 1, value: this.digitalOutput1 })
    })

    // To do this we should debounce or it will trigger too many times
    // $effect(()=>{
    //     if(this.auto){
    //         let data = { ...this.joints, instant: true };
    //         this.ws.send("MOVEJ", data);
    //     }
    // })
  }
}
