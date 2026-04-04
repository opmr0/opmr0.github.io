<script>
  import { onMount } from 'svelte'

  const items = [
    { label: 'Rust · Advanced',  pct: 68 },
    { label: 'Cybersecurity',    pct: 28 },
    { label: 'Backend',     pct: 55 },
    { label: 'PostgreSQL',       pct: 42 },
    { label: 'Python',           pct: 20 },
  ]

  let visible = false
  onMount(() => { setTimeout(() => visible = true, 80) })
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">learning</span>
  <div class="cell-body flex flex-col justify-between h-full overflow-hidden">
    {#each items as item, i}
      <div class="flex flex-col gap-1.5">
        <div class="flex items-baseline justify-between">
          <span class="text-subtle" style="font-size: 12px; font-family: 'Geist', sans-serif; font-weight: 500;">{item.label}</span>
          <span class="font-mono text-dim" style="font-size: 9px;">{item.pct}%</span>
        </div>
        <div class="learn-bar-track">
          <div
            class="learn-bar-fill"
            style="width: {visible ? item.pct : 0}%; transition-delay: {i * 80}ms;"
          ></div>
        </div>
      </div>
    {/each}
  </div>
</div>
