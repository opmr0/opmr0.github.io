<script>
  import { onMount } from 'svelte'

  const items = [
    { label: 'rust        ', pct: 65 },
    { label: 'backend     ', pct: 45 },
    { label: 'postgresql  ', pct: 40 },
    { label: 'cybersec    ', pct: 28 },
    { label: 'python      ', pct: 20 },
  ]

  const BAR_WIDTH = 20

  function bar(pct) {
    const filled = Math.round((pct / 100) * BAR_WIDTH)
    return '█'.repeat(filled) + '░'.repeat(BAR_WIDTH - filled)
  }

  let animated = items.map(i => ({ ...i, current: 0 }))
  let started = false

  onMount(() => {
    setTimeout(() => {
      started = true
      animated = animated.map((item, i) => {
        let frame = 0
        const steps = 30
        const interval = setInterval(() => {
          frame++
          animated[i].current = Math.round((frame / steps) * item.pct)
          animated = [...animated]
          if (frame >= steps) clearInterval(interval)
        }, 20)
        return item
      })
    }, 100)
  })
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">~/learning</span>
  <div class="cell-body flex flex-col justify-between h-full overflow-hidden" style="padding-top: 50px;">
    {#each animated as item, i}
      <div class="flex items-center gap-2" style="line-height: 1.1;">
        <span class="font-mono whitespace-pre" style="font-size: 11px; color: #e8e8e6;">{item.label}</span>
        <span class="font-mono whitespace-pre" style="font-size: 11px; color: #4a4a4a;">[{bar(item.current)}]</span>
        <span class="font-mono" style="font-size: 11px; color: #888;">{item.current}%</span>
      </div>
    {/each}
  </div>
</div>