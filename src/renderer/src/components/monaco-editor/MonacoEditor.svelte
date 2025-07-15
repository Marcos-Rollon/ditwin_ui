<script>
  import * as monaco from 'monaco-editor'
  import LoadingIndicator from '../loading-indicator/LoadingIndicator.svelte'
  import { onMount } from 'svelte'
  //import { clipboard } from 'electron'
  // Import workers as URLs using Vite's worker handling
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  self.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
      switch (label) {
        case 'json':
          return new jsonWorker()
        case 'css':
        case 'scss':
        case 'less':
          return new cssWorker()
        case 'html':
        case 'handlebars':
        case 'razor':
          return new htmlWorker()
        case 'typescript':
        case 'javascript':
          return new tsWorker()
        default:
          return new editorWorker()
      }
    }
  }

  let container
  let editor

  let { currentCode = $bindable(''), isBussy = false } = $props()

  // Helper function to check if it's Mac
  const isMac = () => {
    return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  }

  const handleEditorKeyDown = async (e) => {
    const isCtrlOrCmd = isMac() ? e.metaKey : e.ctrlKey
    const key = e.browserEvent.key.toLowerCase()
    if (!isCtrlOrCmd) return

    switch (key) {
      case 'c':
        if (editor.hasTextFocus()) {
          const selection = editor.getSelection()
          if (selection && !selection.isEmpty()) {
            const selectedText = editor.getModel().getValueInRange(selection)
            try {
              navigator.clipboard.writeText(selectedText)
            } catch {
              await navigator.clipboard.writeText(selectedText)
            }
            console.log('Copying text to clipboard', selectedText)
            e.preventDefault()
          }
        }
        break

      case 'v':
        if (editor.hasTextFocus()) {
          e.preventDefault()
          let pasted = ''

          pasted = await navigator.clipboard.readText()

          if (pasted) {
            console.log('Pasting text from clipboard', pasted)
            const selection = editor.getSelection()
            editor.executeEdits('paste', [
              {
                range: selection,
                text: pasted,
                forceMoveMarkers: true
              }
            ])
            currentCode = editor.getValue()
          }
        }
        break
    }
  }

  export function getCode() {
    return currentCode
  }

  export function setCode(code) {
    currentCode = code
    if (editor) {
      editor.setValue(code)
    }
  }

  onMount(() => {
    editor = monaco.editor.create(container, {
      value: currentCode, // Use the persistent state instead of defaultInitialCode
      language: 'javascript',
      theme: 'vs-dark',
      scrollbar: {
        vertical: 'hidden'
      }
    })

    // Listen for content changes and update the persistent state
    editor.onDidChangeModelContent(() => {
      currentCode = editor.getValue()
    })
    // Add keyboard event listener to the document
    // Attach Monaco-native keydown handler
    editor.onKeyDown(handleEditorKeyDown)

    // Cleanup on destroy
    return () => {
      editor.dispose()
    }
  })
</script>

<div class="container">
  <div class="bussy-indicator {isBussy ? '' : 'hidden'}">
    <LoadingIndicator />
    <h2>Your code is running...</h2>
    <p>You can stop the execution at any time by clicking the "Stop" button.</p>
  </div>
  <div bind:this={container} style="height: 100%; width: 100%; position:absolute;"></div>
</div>

<!-- <script>
  import * as monaco from 'monaco-editor'
  import LoadingIndicator from '../loading-indicator/LoadingIndicator.svelte'
  import { onMount } from 'svelte'

  // Import workers as URLs using Vite's worker handling
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  self.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
      switch (label) {
        case 'json':
          return new jsonWorker()
        case 'css':
        case 'scss':
        case 'less':
          return new cssWorker()
        case 'html':
        case 'handlebars':
        case 'razor':
          return new htmlWorker()
        case 'typescript':
        case 'javascript':
          return new tsWorker()
        default:
          return new editorWorker()
      }
    }
  }

  let container
  let editor
  //   let defaultInitialCode = `
  // let homeJoints = [0,-90,0,-90,0,0]
  // let turnRightJoints = [-90,-90,0,-90,0,0]
  // let perpendicularWithTableJoints = [-180,-135,-45,-90,90,0]
  // LOG("Moving home")
  // MOVEJ(homeJoints)
  // LOG("Moving right")
  // MOVEJ(turnRightJoints)
  // LOG("Moving back home")
  // MOVEJ(homeJoints)
  // `
  let defaultInitialCode = `let firstCube = new Transform(-389.3343, 66.64413, -142.1046, -180, -0.0007847458, 90.00047)
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
`

  let { isBussy = false } = $props()

  export function getCode() {
    return editor.getValue() ?? ''
  }
  export function setCode(code) {
    //TODO;
    console.log(code)
  }

  onMount(() => {
    editor = monaco.editor.create(container, {
      value: defaultInitialCode,
      language: 'javascript',
      theme: 'vs-dark',
      scrollbar: {
        vertical: 'hidden'
      }
    })

    // Cleanup on destroy
    return () => {
      editor.dispose()
    }
  })
</script>

<div class="container">
  <div class="bussy-indicator {isBussy ? '' : 'hidden'}">
    <LoadingIndicator />
    <h2>Your code is running...</h2>
    <p>You can stop the execution at any time by clicking the "Stop" button.</p>
  </div>
  <div bind:this={container} style="height: 100%; width: 100%; position:absolute;"></div>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
  }

  .bussy-indicator {
    height: 100%;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #7d7d7d87;
    position: absolute;
    z-index: 10;
  }
  .bussy-indicator p {
    text-align: center;
  }

  .hidden {
    display: none;
  }
</style> -->

<style>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
  }

  .bussy-indicator {
    height: 100%;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #7d7d7d87;
    position: absolute;
    z-index: 10;
  }
  .bussy-indicator p {
    text-align: center;
  }

  .hidden {
    display: none;
  }
</style>
