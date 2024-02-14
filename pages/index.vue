<script setup lang="ts">
const handleClick = (e: MouseEvent) => {
  const activePanel = (e.target as HTMLElement)?.closest(".accordion-panel");
  if (!activePanel) return;
  toggleAccordion(activePanel);
};

function toggleAccordion(panelToActivate: any) {
  const activeButton = panelToActivate.querySelector("button");
  const activePanel = panelToActivate.querySelector(".accordion-content");
  const activePanelIsOpened = activeButton.getAttribute("aria-expanded");

  if (activePanelIsOpened === "true") {
    panelToActivate
      .querySelector("button")
      .setAttribute("aria-expanded", false);

    panelToActivate
      .querySelector(".accordion-content")
      .setAttribute("aria-hidden", true);
  } else {
    panelToActivate.querySelector("button").setAttribute("aria-expanded", true);

    panelToActivate
      .querySelector(".accordion-content")
      .setAttribute("aria-hidden", false);
  }
}
</script>

<template>
  <main class="grid place-items-center gap-10">
    <h1 class="text-white text-4xl">Main Content</h1>

    <div class="accordion-panel">
      <h2 id="panel1-title">
        <button
          class="accordion-trigger"
          aria-expanded="true"
          aria-controls="accordion1-content"
          @click="handleClick"
        >
          Grid is awesome
        </button>
      </h2>
      <div
        class="accordion-content bg-green-700"
        role="region"
        aria-labelledby="panel1-title"
        aria-hidden="false"
        id="panel1-content"
      >
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto,
            amet!
          </p>
        </div>
      </div>
      <div>
        <p>Hello</p>
      </div>
    </div>
  </main>
</template>

<style>
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 500ms;
}

.accordion-content[aria-hidden="false"] {
  grid-template-rows: 1fr;
}

.accordion-content > div {
  overflow: hidden;
}
</style>
