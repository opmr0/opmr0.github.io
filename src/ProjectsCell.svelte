<script>
  import { onMount } from 'svelte'

  const GITHUB_USER = 'opmr0'
  const EXCLUDED = ['opmr0', 'opmr0.github.io']

  let repos = []
  let loading = true
  let error = false

  const langColors = {
    Rust:       '#ce422b',
    JavaScript: '#f0db4f',
    TypeScript: '#3178c6',
    Python:     '#3572a5',
    CSS:        '#563d7c',
    HTML:       '#e34c26',
    Shell:      '#89e051',
    Svelte:     '#ff3e00',
    Go:         '#00add8',
  }

  onMount(async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      repos = data
        .filter(r => !r.fork && !EXCLUDED.includes(r.name))
        .slice(0, 12)
    } catch {
      error = true
    } finally {
      loading = false
    }
  })
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">~/projects/github</span>

  {#if loading}
    <div class="flex-1 flex items-center justify-center">
      <span class="font-mono text-dim" style="font-size: 10px; letter-spacing: 0.1em;">fetching repos...</span>
    </div>

  {:else if error}
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="text-center">
        <p class="font-mono text-dim" style="font-size: 10px;">couldn't reach github api.</p>
        <a href="https://github.com/{GITHUB_USER}" target="_blank" class="font-mono text-muted hover:text-subtle transition-colors" style="font-size: 10px;">
          github.com/{GITHUB_USER} ↗
        </a>
      </div>
    </div>

  {:else}
    <div class="scrollable-inner flex-1 pt-8 px-4 pb-4 flex flex-col gap-2">
      {#each repos as repo}
        <a href={repo.html_url} target="_blank" rel="noopener" class="project-card group">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-display text-paper" style="font-size: 14px;">{repo.name}</span>
              {#if repo.language}
                <span class="tag flex items-center gap-1">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:{langColors[repo.language] || '#555'};flex-shrink:0;"></span>
                  {repo.language}
                </span>
              {/if}
              {#if repo.stargazers_count > 0}
                <span class="tag">★ {repo.stargazers_count}</span>
              {/if}
            </div>
            <svg width="10" height="10" fill="none" stroke="#2a2a2a" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 mt-0.5 group-hover:stroke-muted transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15"/>
            </svg>
          </div>
          {#if repo.description}
            <p class="text-dim leading-relaxed" style="font-size: 11px; font-family: 'Geist Mono', monospace; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              {repo.description}
            </p>
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</div>
