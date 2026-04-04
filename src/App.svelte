<script>
  import ProfileCell from "./ProfileCell.svelte";
  import ProjectsCell from "./ProjectsCell.svelte";
  import LearningCell from "./LearningCell.svelte";
  import SkillsCell from "./SkillsCell.svelte";
  import InterestsCell from "./InterestsCell.svelte";
  import TerminalCell from "./TerminalCell.svelte";
</script>

<main>
  <div class="portfolio-grid">
    <div class="area-profile"><ProfileCell /></div>
    <div class="area-projects"><ProjectsCell /></div>
    <div class="area-terminal"><TerminalCell /></div>
    <div class="area-skills"><SkillsCell /></div>
    <div class="area-interests"><InterestsCell /></div>
    <div class="area-learning"><LearningCell /></div>
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: #0c0c0c;
  }

  @media (min-width: 1281px) {
    .portfolio-grid {
      display: grid;
      width: 100%;
      height: 100%;
      gap: 5px;
      grid-template-columns: 1fr 1.4fr 1.4fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
        "profile   projects  projects"
        "terminal  projects  projects"
        "skills    interests learning";
    }
  }
  .area-profile {
    grid-area: profile;
    min-height: 0;
  }
  .area-projects {
    grid-area: projects;
    min-height: 0;
  }
  .area-terminal {
    grid-area: terminal;
    min-height: 0;
  }
  .area-skills {
    grid-area: skills;
    min-height: 0;
  }
  .area-interests {
    grid-area: interests;
    min-height: 0;
  }
  .area-learning {
    grid-area: learning;
    min-height: 0;
  }

  @media (max-width: 1280px) and (min-width: 640px) {
    .portfolio-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1.6fr 1fr 1fr;
      grid-template-areas:
        "profile   terminal"
        "projects  projects"
        "skills    interests"
        "learning  learning";
    }
    main {
      height: auto;
      min-height: 100vh;
      overflow: auto;
      padding: 8px;
    }
  }

  @media (max-width: 639px) {
    main {
      height: auto;
      min-height: 100vh;
      overflow: auto;
      padding: 8px;
    }
    .portfolio-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 220px 220px 380px 180px 160px 260px;
      grid-template-areas:
        "profile"
        "terminal"
        "projects"
        "skills"
        "interests"
        "learning";
    }
  }
</style>
