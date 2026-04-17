<script>
  import { onMount } from "svelte";

  const lines = [
    { prompt: true, text: "whoami" },
    { prompt: false, text: "omar" },
    { prompt: true, text: "neofetch" },
    { prompt: false, text: "                              ___  ", ascii: true },
    {
      prompt: false,
      text: "   ___  _ __  _ __ ___  _ __ / _ \\ ",
      ascii: true,
    },
    {
      prompt: false,
      text: "  / _ \\| '_ \\| '_ ` _ \\| '__| | | |",
      ascii: true,
    },
    { prompt: false, text: " | (_) | |_) | | | | | | |  | |_| |", ascii: true },
    {
      prompt: false,
      text: "  \\___/| .__/|_| |_| |_|_|   \\___/ ",
      ascii: true,
    },
    { prompt: false, text: "       |_|                         ", ascii: true },
    { prompt: false, text: "OS: Fedora Linux" },
    { prompt: false, text: "UPTIME: 17 years" },
    { prompt: false, text: "SHELL: zsh" },
    { prompt: false, text: "LANG: Rust (primary)" },
    { prompt: false, text: "EDITOR: neovim" },
    { prompt: false, text: "FOCUS: backend / security" },
    { prompt: true, text: "cat about.txt" },
    {
      prompt: false,
      text: "self-taught developer focused on systems and security.",
    },
    { prompt: false, text: "I write in Rust. CLI tools, backend services," },
    { prompt: true, text: "cat goals.md" },
    { prompt: false, text: "# goals" },
    {
      prompt: false,
      text: "- [x] writing production-grade CLI tooling in Rust",
    },
    { prompt: false, text: "- [x] studying exploits and CTFs" },
    { prompt: false, text: "- [x] shipping open source work that lasts" },
    { prompt: false, text: "- [ ] contribute to security and systems tooling" },
    { prompt: false, text: "- [ ] low-level protocol and binary analysis" },
    {
      prompt: false,
      text: "- [ ] land a backend or security engineering role",
    },
    { prompt: true, text: "█" },
  ];

  let visible = [];
  let cursor = true;

  onMount(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        visible = [...visible, lines[i]];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const blink = setInterval(() => {
      cursor = !cursor;
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(blink);
    };
  });
</script>

<div class="cell h-full flex flex-col">
  <span class="cell-label">~/about</span>
  <div
    class="cell-body flex flex-col justify-start gap-0 overflow-hidden"
    style="padding-top: 28px;"
  >
    {#each visible as line, i}
      <div class="flex items-start gap-2" style="line-height: 1.7;">
        {#if line.prompt}
          <span
            class="font-mono"
            style="font-size: 11px; color: #e8e8e6; user-select: none; flex-shrink: 0;"
            >$</span
          >
          <span class="font-mono" style="font-size: 11px; color: #e8e8e6;">
            {#if line.text === "█"}
              <span style="opacity: {cursor ? 1 : 0}; transition: opacity 0.1s;"
                >▋</span
              >
            {:else}
              {line.text}
            {/if}
          </span>
        {:else}
          <span
            class="font-mono whitespace-pre"
            style="
      font-size: 11px;
      padding-left: 14px;
      line-height: {line.ascii ? '1' : '1.7'};
      color: {line.ascii
              ? '#4a4a4a'
              : line.text.startsWith('# ')
                ? '#e8e8e6'
                : line.text.startsWith('- [x]')
                  ? '#3a6'
                  : line.text.startsWith('- [ ]')
                    ? '#555'
                      : '#4a4a4a'};
      font-weight: {line.text.startsWith('#') ? '600' : '400'};
    ">{line.text}</span
          >
        {/if}
      </div>
    {/each}
  </div>
</div>
