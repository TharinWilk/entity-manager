<template>
  <div>
    <h1 class="primary">Hello</h1>
    <h1 class="secondary">Hello</h1>
    <h1 class="test">Hello</h1>
    <div style="width: 100%; display: grid; place-items: center">
      <BaseButton size="xs">
        <span class="sr-only">Add</span>
        <Icon name="mdi:plus" size="24" color="white"></Icon>
      </BaseButton>

      <BaseButton>Hello</BaseButton>
    </div>
  </div>
</template>

<style>
.primary {
  color: var(--text-primary);
  font-size: 64px;
}
.secondary {
  color: var(--text-secondary);
  font-size: 64px;
}
.test {
  color: var(--text-accent);
  font-size: 64px;
}
</style>
