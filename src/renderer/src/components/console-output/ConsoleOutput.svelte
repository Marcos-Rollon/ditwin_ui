<script>
  let { logs = [], maxEntries = 30 } = $props()

  let displayedLogs = $derived.by(() => {
    return logs.slice(-maxEntries)
  })
  let consoleElement

  let emojiForLevel = {
    info: '',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }

  $effect(() => {
    if (consoleElement && displayedLogs.length > 0) {
      consoleElement.scrollTop = consoleElement.scrollHeight
    }
  })
</script>

<div class="console-output" bind:this={consoleElement}>
  <!-- eslint-disable-next-line svelte/require-each-key -->
  {#each displayedLogs as log}
    <div class="line {log.level}">
      {emojiForLevel[log.level]}
      {log.message}
    </div>
  {/each}
</div>

<style>
  .console-output {
    background-color: #1e1e1e;
    color: #d4d4d4;
    font-family: monospace;
    font-size: 0.9rem;
    padding: 1rem;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #444;
    border-radius: 0.5rem;
    white-space: pre-wrap;
  }

  .line {
    line-height: 1.4;
  }

  .info {
    color: #03ed51;
  }

  .success {
    color: #6a9955;
  }

  .error {
    color: #f44747;
  }

  .warning {
    color: #ff8800;
  }
</style>
