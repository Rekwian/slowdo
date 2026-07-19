<template lang="pug">
nuxt-layout(name="home")
  // HERO
  section(:class="[$style.hero, $style.section]")
    div
      h1 {{ $t('page.home.hero.title') }}

      i18n-t(keypath="page.home.hero.description.text" tag="p")
        strong {{ $t('page.home.hero.description.strong1') }}
        strong {{ $t('page.home.hero.description.strong2') }}

      block-cta

    div(:class="$style.card")
      div {{ $t('page.home.hero.cardTitle') }}
      div(:class="$style.task") {{ $t('page.home.hero.taskTitle') }}

  // HOW IT WORK
  section(:class="[$style.howItWork, $style.section]")
    div(:class="$style.head")
      h2 {{ $t('page.home.howItWork.title') }}
      p {{ $t('page.home.howItWork.description') }}
    ol(:class="$style.list")
      li
        p(:class="$style.item") {{ $t('page.home.howItWork.list.1.title') }}
        p {{ $t('page.home.howItWork.list.1.description') }}
      li
        p(:class="$style.item") {{ $t('page.home.howItWork.list.2.title') }}
        p {{ $t('page.home.howItWork.list.2.description') }}
      li
        p(:class="$style.item") {{ $t('page.home.howItWork.list.3.title') }}
        p {{ $t('page.home.howItWork.list.3.description') }}

  // WHY IT WORK
  section(:class="[$style.whyItWork, $style.section]")
      div(:class="$style.head")
        h2 {{ $t('page.home.whyItWork.title') }}

        i18n-t(keypath="page.home.whyItWork.description.text" tag="p")
          strong {{ $t('page.home.whyItWork.description.strong1') }}
          strong {{ $t('page.home.whyItWork.description.strong2') }}

      div(:class="$style.cards")
        ul(:class="$style.card")
          li {{ $t('page.home.whyItWork.list.1') }}
          li {{ $t('page.home.whyItWork.list.2') }}
          li {{ $t('page.home.whyItWork.list.3') }}
          li {{ $t('page.home.whyItWork.list.4') }}
        div(:class="[$style.card, $style.thought]")
          h3 {{ $t('page.home.whyItWork.aside.title') }}
          p
            em {{ $t('page.home.whyItWork.aside.content') }}

  // DO IT SLOWLY
  section(:class="[$style.section]")
    div(:class="$style.head")
      h2 {{ $t('page.home.doItSlowly.title') }}
      p {{ $t('page.home.doItSlowly.description') }}

    block-cta

  footer(:class="$style.footer")
    p
      em Slowdo n'est pas une application de productivité. <br/>
      | C'est une application d'accompagnement du quotidien, pensée pour avancer un pas à la fois. <br/>
      | Remettre l'humain avant la performance.
</template>

<style module>
.section {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  margin: auto;
  max-width: 1000px;
  min-height: 100dvh;
  padding: 0 2rem;
}

.card {
  /* background-color: var(--color-background); */
  background: linear-gradient(
    155deg,
    light-dark(hsl(from var(--color-background) h s 90%), hsl(from var(--color-background) h s 5%)),
    var(--color-background)
  );
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  box-shadow: 0 0 20px -7px black;
  padding: 2rem;

  .task {
    border-radius: 1rem;
    padding: 0.5rem 2rem;
  }
}

.head {
  margin: 0 auto;
  margin-bottom: 3rem;
  text-align: center;
}

.hero {
  min-height: calc(100dvh - 4rem);
  text-align: center;

  .card {
    min-width: 300px;
  }
}

.howItWork {
  .head {
    margin: 0 auto;
    margin-bottom: 3rem;
    text-align: center;
  }

  .list {
    margin: 0 auto;
  }

  .item {
    color: var(--color-background-text);
    font-size: 1.5rem;
    margin-top: 3rem
  }
}

.whyItWork {
  .cards {
    display: grid;
    gap: 4rem;
    justify-content: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
}

.footer {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  height: 300px;
  justify-content: center;
  text-align: center;

  &::before, &::after {
    content: '---'
  }
}

@media(min-width: 700px) {
  .whyItWork {
    width: 100%;

    .cards {
      grid-template-columns: max-content minmax(200px, 300px);
      width: 100%;
    }

    .card {
      max-width: initial;
    }
  }
}

@media(min-width: 960px) {
  .mainPage {
    h1 {
      line-height: 4rem;
      margin: 0;
    }
  }

  .hero {
    flex-direction: row;
    text-align: left;
  }

  .cta {
    justify-content: flex-start;
  }
}
</style>
