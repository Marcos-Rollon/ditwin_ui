<script>
  import Header from './components/header/Header.svelte'
  import ControlScreen from './screens/control_screen/ControlScreen.svelte'
  import CodeScreen from './screens/code_screen/CodeScreen.svelte'
  import ControlScreenController from './screens/control_screen/ControlScreenController.svelte.js'
  import AboutScreen from './screens/about_screen/AboutScreen.svelte'

  import { WebSocketClient } from './features/websocket_manager/WebsocketClient.js'

  const ws = new WebSocketClient('ws://127.0.0.1:8082')
  ws.connect()

  ws.onConnected = () => {
    console.log('Connected')
    online = true
    // Request enviroment info on connection
    ws.send('ENVIROMENT_INFO', {})
  }
  ws.onDisconnected = () => {
    console.log('Disconnected')
    online = false
  }
  ws.onError = (err) => {
    console.error('Error:', err)
    online = false
  }
  ws.on('MOVEMENT_FINISHED', (json) => {
    console.log('Movement finished', json)
    controlScreenController.onMovementFinished(json.angles, json.pose)
  })
  ws.on('CURRENT_POSITION', (json) => {
    controlScreenController.onCurrentPosition(json.angles, json.pose)
  })
  ws.on('DIGITAL_READ', (json) => {
    console.log('Digital read', json)
    controlScreenController.onDigitalRead(json.port, json.value)
  })
  ws.on('ENVIROMENT_INFO', (json) => {
    console.log('Enviroment info', json)
    controlScreenController.enviroments = json
  })

  const defaultInitialCode = `RESET_ENVIROMENT()
WRITE(0,true)
WAIT(0,true)
WRITE(0,false)
  `

  // State
  let selectedTabIndex = $state(0)
  let online = $state(false)
  const controlScreenController = new ControlScreenController(ws)
  let currentCode = $state(defaultInitialCode)
</script>

<Header bind:online />
<div class="tabs-container">
  <div class="tab-buttons">
    <button
      class="tab-button {selectedTabIndex === 0 ? 'active' : ''}"
      onclick={() => (selectedTabIndex = 0)}
    >
      Control
    </button>
    <button
      class="tab-button {selectedTabIndex === 1 ? 'active' : ''}"
      onclick={() => (selectedTabIndex = 1)}
    >
      Code
    </button>
    <button
      class="tab-button {selectedTabIndex === 2 ? 'active' : ''}"
      onclick={() => (selectedTabIndex = 2)}
    >
      About
    </button>
  </div>
  <div class="box">
    {#if selectedTabIndex === 0}
      <ControlScreen controller={controlScreenController} />
    {/if}
    {#if selectedTabIndex === 1}
      <CodeScreen {ws} bind:currentCode />
    {/if}
    {#if selectedTabIndex === 2}
      <AboutScreen />
    {/if}
  </div>
  ⚠︎ This is a demo for the Transnational Training Course. Not the finish version.
</div>

<style>
  :root {
    padding: 8px;
  }
  .tabs-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .tab-buttons {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-shrink: 0;
  }
  .tab-button {
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #2c3e50;
    color: #bdc3c7;
    transition:
      background-color 0.2s,
      color 0.2s;
  }

  .tab-button.active {
    background-color: #4caf84;
    color: #ffffff;
  }
  .box {
    flex: 1;
    padding: 8px;
    margin-top: 8px;
    border-radius: 4px;
    background-color: #384253;
    overflow: auto;
  }
</style>
