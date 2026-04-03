<script>
  import { onMount } from "svelte";

  const USERNAME = "opmr0";
  const PINNED = ["xeq", "fyr", "sinbo", "todoit"];
  const EXCLUDE = ["opmr0", "opmr0.github.io", "portfolio"];

  let repos = [];
  let loading = true;
  let error = null;
  let now = new Date().getFullYear();
  let rest = [];

  onMount(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const all = await res.json();
      const pinned = PINNED.map((name) =>
        all.find((r) => r.name === name),
      ).filter(Boolean);
      const others = all
        .filter(
          (r) =>
            !PINNED.includes(r.name) && !r.fork && !EXCLUDE.includes(r.name),
        )
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
      repos = [...pinned, ...others];
      rest = repos;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  function fmtDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  // Official brand colors
  const LANG_COLORS = {
    Rust: "#CE422B",
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Svelte: "#FF3E00",
    Python: "#3572A5",
    Go: "#00ADD8",
    C: "#A8B9CC",
    "C++": "#F34B7D",
    Shell: "#89E051",
    HTML: "#E34F26",
    CSS: "#264DE4",
    Ruby: "#CC342D",
    Zig: "#F7A41D",
  };
  const langColor = (l) => LANG_COLORS[l] || "#555";

  const SKILLS = [
    {
      name: "Rust",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
      bg: "#1a0a08",
      border: "#CE422B",
    },
    {
      name: "Svelte",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
      bg: "#1a0900",
      border: "#FF3E00",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      bg: "#1a1800",
      border: "#F7DF1E",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      bg: "#04081a",
      border: "#264DE4",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      bg: "#1a0d04",
      border: "#E34F26",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      bg: "#031018",
      border: "#2496ED",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      bg: "#1a0d04",
      border: "#F05032",
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      bg: "#111",
      border: "#e8e8e8",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      bg: "#050f18",
      border: "#336791",
    },
    {
      name: "Bash",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      bg: "#111",
      border: "#4EAA25",
    },
    {
      name: "Tailwind",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      bg: "#010f12",
      border: "#06B6D4",
    },
  ];
</script>

<svelte:head>
  <title>Omar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="page">
  <div class="col-left">
    <!-- IDENTITY -->
    <div class="card identity-card">
      <div class="avatar-row">
        <div class="avatar">
          <img src="https://github.com/{USERNAME}.png" alt="Omar" />
        </div>
        <div class="identity-text">
          <h1>Omar</h1>
          <p class="handle">@{USERNAME}</p>
          <p class="role">Backend Developer</p>
        </div>
      </div>
      <p class="bio-text">
        Self-taught. Building CLI tools &amp; backend systems in
        <span class="rust">Rust</span>. Into cybersecurity and shipping real
        software.
      </p>
      <div class="card-links">
        <a
          href="https://github.com/{USERNAME}"
          target="_blank"
          rel="noopener"
          class="link-btn">GitHub ↗</a
        >
      </div>
    </div>

    <!-- STATS -->
    <div class="card stats-card">
      <span class="card-label">now</span>
      <div class="now-list">
        <div>Shipping CIL tools</div>
        <div>Learning backend in Rust (Axum)</div>
        <div>Exploring cybersecurity & low-level</div>
      </div>
    </div>

    <!-- SKILLS -->
    <div class="card skills-card">
      <span class="card-label">languages &amp; tools</span>
      <div class="skills-grid">
        {#each SKILLS as s}
          <div class="skill-wrap" title={s.name}>
            <div
              class="skill-bg"
              style="background:{s.bg}; border-color:{s.border}30;"
            >
              <img src={s.icon} alt={s.name} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="col-right">
    <!-- PROJECTS -->
    <div class="card projects-card">
      <span class="card-label">projects</span>

      {#if loading}
        <div class="loading-state">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </div>
      {:else if error}
        <p class="err-text">error: {error}</p>
      {:else}
        <div class="proj-scroll">
          {#each rest as repo}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener"
              class="proj-row"
            >
              <div class="proj-row-left">
                <span class="proj-name">{repo.name}</span>
                <p class="proj-row-desc">
                  {repo.description || "No description."}
                </p>
              </div>
              <div class="proj-row-right">
                {#if repo.language}
                  <span class="proj-lang">
                    <span
                      class="dot"
                      style="background:{langColor(repo.language)}"
                    ></span>
                    {repo.language}
                  </span>
                {/if}
                <span class="proj-stars">★ {repo.stargazers_count}</span>
                <span class="proj-date">{fmtDate(repo.updated_at)}</span>
                <span class="proj-arrow">↗</span>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <!-- FOCUS -->
    <div class="card focus-card">
      <span class="card-label">focus areas</span>
      <div class="focus-pills">
        {#each ["CLI Tooling", "Backend APIs", "Systems Programming", "Cybersecurity", "Open Source"] as f}
          <span class="focus-pill">{f}</span>
        {/each}
      </div>
    </div>
  </div>

  <footer class="page-footer">
    <span>© {now} Omar / opmr0</span>
    <span>built with Svelte · data from GitHub API</span>
  </footer>
</div>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: #111;
    color: #f0f0f0;
    font-family: "Inter", sans-serif;
    min-height: 100vh;
  }

  .page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
    display: grid;
    grid-template-columns: minmax(260px, 320px) 1fr;
    gap: 1.25rem;
  }

  .col-left {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .col-right {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .page-footer {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px;
    color: #2a2a2a;
    border-top: 1px solid #1e1e1e;
    letter-spacing: 0.06em;
  }

  /* CARD */
  .card {
    background: #161616;
    border: 1px solid #242424;
    border-radius: 16px;
    padding: 1.75rem;
  }
  .card-label {
    display: block;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px;
    color: #3a3a3a;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  /* IDENTITY */
  .avatar-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #2a2a2a;
    flex-shrink: 0;
    background: #1e1e1e;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .identity-text h1 {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #fff;
    line-height: 1.1;
  }
  .handle {
    font-family: "IBM Plex Mono", monospace;
    font-size: 11px;
    color: #3a3a3a;
    margin-top: 3px;
  }
  .role {
    font-size: 12px;
    color: #555;
    margin-top: 4px;
  }
  .now-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 12px;
    color: #666;
    line-height: 1.6;
  }
  .bio-text {
    font-size: 13px;
    line-height: 1.75;
    color: #666;
    margin-bottom: 1.25rem;
  }
  .rust {
    color: #ce422b;
    font-weight: 500;
  }
  .card-links {
    display: flex;
  }
  .link-btn {
    font-family: "IBM Plex Mono", monospace;
    font-size: 11px;
    padding: 6px 18px;
    border-radius: 999px;
    text-decoration: none;
    background: #f0f0f0;
    color: #111;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: background 0.15s;
  }
  .link-btn:hover {
    background: #fff;
  }

  /* STATS */
  .stats-card {
    padding: 1.25rem 1.75rem;
  }

  /* SKILLS */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }
  .skill-bg {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    transition:
      transform 0.15s,
      filter 0.15s;
    filter: brightness(0.85);
  }
  .skill-bg:hover {
    transform: scale(1.12);
    filter: brightness(1.15);
  }
  .skill-bg img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }

  /* PROJECTS */
  .projects-card {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .proj-scroll {
    overflow-y: auto;
    max-height: 420px;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding-right: 4px;
  }
  /* custom scrollbar */
  .proj-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .proj-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .proj-scroll::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 2px;
  }
  .proj-scroll::-webkit-scrollbar-thumb:hover {
    background: #444;
  }

  .proj-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 10px;
    border: 1px solid #1e1e1e;
    text-decoration: none;
    color: inherit;
    background: #111;
    flex-shrink: 0;
    transition:
      border-color 0.15s,
      background 0.12s;
  }
  .proj-row:hover {
    border-color: #3a3a3a;
    background: #141414;
  }
  .proj-row-left {
    flex: 1;
    min-width: 0;
  }
  .proj-name {
    font-family: "IBM Plex Mono", monospace;
    font-size: 13px;
    font-weight: 500;
    color: #e0e0e0;
    display: block;
    margin-bottom: 3px;
  }
  .proj-row-desc {
    font-size: 12px;
    color: #444;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .proj-row-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }
  .proj-lang {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .proj-stars {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px;
    color: #333;
  }
  .proj-date {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px;
    color: #2a2a2a;
  }
  .proj-arrow {
    font-size: 13px;
    color: #2a2a2a;
    transition:
      color 0.15s,
      transform 0.15s;
  }
  .proj-row:hover .proj-arrow {
    color: #888;
    transform: translate(2px, -2px);
  }

  /* FOCUS */
  .focus-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .focus-pill {
    font-family: "IBM Plex Mono", monospace;
    font-size: 11px;
    border: 1px solid #222;
    color: #444;
    padding: 5px 14px;
    border-radius: 999px;
    letter-spacing: 0.04em;
    cursor: default;
    transition:
      border-color 0.15s,
      color 0.15s;
  }
  .focus-pill:hover {
    border-color: #555;
    color: #bbb;
  }

  /* LOADING */
  .loading-state {
    display: flex;
    gap: 6px;
    padding: 2rem 0;
    justify-content: center;
  }
  .loading-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #333;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .loading-dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loading-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes pulse {
    0%,
    80%,
    100% {
      opacity: 0.2;
    }
    40% {
      opacity: 1;
    }
  }
  .err-text {
    font-family: "IBM Plex Mono", monospace;
    font-size: 12px;
    color: #ce422b;
  }

  @media (max-width: 800px) {
    .page {
      grid-template-columns: 1fr;
      max-width: 520px;
      padding: 2rem 1rem;
      margin: 0 auto;
    }
    .col-left,
.col-right {
width: 100%;
}
    .proj-scroll {
      max-height: 360px;
    }
  }
</style>
