<script>
  const interests = [
    'Cybersecurity',
    'Systems Programming',
    'CLI Tooling',
    'Open Source',
    'Backend',
    'Gaming',
    'Self-hosting',
    'CTF / Hacking',
  ]
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">interests</span>
  <div class="cell-body flex flex-wrap gap-1.5 content-start overflow-hidden">
    {#each interests as item}
      <div class="interest-tag">{item}</div>
    {/each}
  </div>
</div>
