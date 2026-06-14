<template>
  <div :class="$style.layout">
    <header :class="$style.header">
      <ui-menu />
    </header>
    <main :class="$style.main">
      <slot></slot>
    </main>
    <footer :class="$style.footer">
      <slot name="actions"></slot>
    </footer>
  </div>
</template>

<style module>
.layout {
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: 1rem;
}

.header {
  box-sizing: border-box;
  display: flex;
  grid-area: header;
  justify-content: flex-end;
  width: 100%;
}
.main {
  align-items: center;
  box-sizing: border-box;
  color: var(--color-background-text);
  display: flex;
  flex-direction: column;
  grid-area: main;
  justify-content: center;
  padding: 1rem;
}

.footer {
  position: sticky;
  bottom: 1rem;
  display: flex;
  grid-area: footer;
  justify-content: flex-end;
}
</style>
