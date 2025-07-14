<script>
  import SliderWithInput from '../../components/slider-with-input/SliderWithInput.svelte'
  import ToggleSwitch from '../../components/toggle-switch/ToggleSwitch.svelte'
  import AngleDisplay from '../../components/angle-display/AngleDisplay.svelte'

  let rx = $state(90)
  let ry = $state(90)
  let xAxisRotation = $state(0)
  let largeArcFlag = $state(0)
  let sweepFlag = $state(0)
  let endX = $state(100)
  let endY = $state(100)

  let angle = $state(0)

  $effect(() => {
    let endPt = polarToCartesian(center, center, radius, angle)
    endX = endPt.x
    endY = endPt.y
  })

  let size = 200
  let center = size / 2
  let radius = 90

  let startPt = polarToCartesian(center, center, radius, 0)

  let pathD = $derived(
    `M ${startPt.x} ${startPt.y}
    A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag ? '1' : '0'} ${sweepFlag ? '1' : '0'} ${endX} ${endY}`
  )

  // Update dot position to show the end point of the arc
  let dot = $derived({ x: endX, y: endY })

  const backgroundColor = '#2e2e2e'
  const arcColor = '#d14f3f'
  const dotColor = '#f87e6a'
  const strokeWidth = 16

  function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    }
  }
</script>

<div class="arc-test-screen">
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <circle
      cx={center}
      cy={center}
      r={radius}
      stroke={backgroundColor}
      stroke-width={strokeWidth}
      fill="none"
    />
    <path
      d={pathD}
      stroke={arcColor}
      stroke-width={strokeWidth}
      fill="none"
      stroke-linecap="round"
    />
    <circle cx={startPt.x} cy={startPt.y} r="6" fill="#4a90e2" />
    <circle cx={dot.x} cy={dot.y} r="6" fill={dotColor} />
  </svg>

  <SliderWithInput label="Rx (radius)" unit="px" min={10} max={150} step={1} bind:value={rx} />
  <SliderWithInput label="Ry (radius)" unit="px" min={10} max={150} step={1} bind:value={ry} />
  <SliderWithInput
    label="X-axis rotation"
    unit="deg"
    min={-180}
    max={180}
    step={1}
    bind:value={xAxisRotation}
  />
  <ToggleSwitch label="Large arc flag" design="slider" bind:checked={largeArcFlag} />
  <ToggleSwitch label="Sweep flag" design="slider" bind:checked={sweepFlag} />
  <SliderWithInput label="End X" unit="px" min={0} max={200} step={1} bind:value={endX} />
  <SliderWithInput label="End Y" unit="px" min={0} max={200} step={1} bind:value={endY} />
  <SliderWithInput label="Angle" unit="deg" min={-360} max={360} step={1} bind:value={angle} />
</div>

<style>
  .arc-test-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
  }
</style>
