<script>
  import MonacoEditor from '../../components/monaco-editor/MonacoEditor.svelte'
  import ConsoleOutput from '../../components/console-output/ConsoleOutput.svelte'
  import { onMount, onDestroy } from 'svelte'
  const { ipcRenderer } = require('electron')
  const { ws } = $props()

  let monacoEditor
  let isBussy = $state(false)
  let logs = $state([])

  isBussy = false

  function log(message, level = 'info') {
    logs = [...logs, { message, level }]
  }

  async function stopCode() {
    await ipcRenderer.invoke('kill-user-code')
    log('Execution forcibly stopped', 'warning')
    isBussy = false
    ws.send('EMERGENCY_STOP', {})
  }

  async function runCode() {
    isBussy = true
    logs = []
    log('Code execution started', 'success')

    const code = monacoEditor.getCode()

    try {
      await ipcRenderer.invoke('run-user-code', code)
      log('Code execution finished', 'success')
    } catch (e) {
      log('Execution error: ' + e.message, 'error')
    } finally {
      isBussy = false
    }
  }

  function cleanConsole() {
    logs = []
  }

  onMount(() => {
    const { ipcRenderer } = require('electron')
    const handler = (e, msg) => handleLogEvent({ detail: msg })

    ipcRenderer.on('user-code-log', handler)

    onDestroy(() => {
      ipcRenderer.removeListener('user-code-log', handler)
    })
  })

  const handleLogEvent = (e) => {
    console.log('Log event received', e)
    logs = [...logs, { message: e.detail.data, level: e.detail.level || 'info' }]
  }
</script>

<div class="code-screen">
  <MonacoEditor bind:this={monacoEditor} bind:isBussy />
  <ConsoleOutput bind:logs />
  <div class="button-container">
    <div style="display: flex; gap: 1rem;">
      <button class="button-primary" onclick={runCode}>Run</button>
      <button class="button-error" onclick={stopCode}>Stop</button>
      <button class="button-secondary" onclick={cleanConsole}>Clean Console</button>
    </div>
    <div style="display: flex; gap: 1rem; flex-direction: column;">
      <button class="button-secondary">Save</button>
      <button class="button-secondary">Load</button>
    </div>
  </div>
</div>

<style>
  .code-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
</style>
