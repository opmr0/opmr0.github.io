<script>
  import { onMount } from 'svelte'

  const lines = [
    { prompt: true,  text: 'whoami' },
    { prompt: false, text: 'omar' },
    { prompt: true,  text: 'cat about.txt' },
    { prompt: false, text: "16yo self-taught dev. Started with Arduino," },
    { prompt: false, text: "ended up deep in Rust. I build things I'd" },
    { prompt: false, text: "actually use, CLI tools, backend systems." },
    { prompt: true,  text: 'cat goals.txt' },
    { prompt: false, text: "backend engineer with a security background" },
    { prompt: false, text: "ship more, break more, learn more." },
    { prompt: true,  text: '█' },
  ]

  let visible = []
  let cursor = true

  onMount(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < lines.length) {
        visible = [...visible, lines[i]]
        i++
      } else {
        clearInterval(interval)
      }
    }, 120)

    const blink = setInterval(() => { cursor = !cursor }, 530)

    return () => {
      clearInterval(interval)
      clearInterval(blink)
    }
  })
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">~/about</span>
  <div class="cell-body flex flex-col justify-start gap-0 overflow-hidden" style="padding-top: 28px;">
    {#each visible as line, i}
      <div class="flex items-start gap-2" style="line-height: 1.7;">
        {#if line.prompt}
          <span class="font-mono" style="font-size: 11px; color: #e8e8e6; user-select: none; flex-shrink: 0;">$</span>
          <span class="font-mono" style="font-size: 11px; color: #e8e8e6;">
            {#if line.text === '█'}
              <span style="opacity: {cursor ? 1 : 0}; transition: opacity 0.1s;">▋</span>
            {:else}
              {line.text}
            {/if}
          </span>
        {:else}
          <span class="font-mono" style="font-size: 11px; color: #4a4a4a; padding-left: 14px;">{line.text}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
