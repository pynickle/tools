<template>
  <!-- Bulma Navbar -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLinkLocale class="navbar-item" to="/">
        <Spool />
        <h1 class="title is-4">{{ $t('navbar_title') }}</h1>
      </NuxtLinkLocale>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/"> {{ $t('home') }} </a>
        <a class="navbar-item" href="https://github.com/pynickle/tools"> {{ $t('github') }} </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <!-- Language Switcher -->
          <div class="dropdown is-right" :class="{ 'is-active': langOpen }">
            <div class="dropdown-trigger">
              <button
                class="button is-small"
                aria-haspopup="true"
                aria-controls="lang-menu"
                @click="langOpen = !langOpen"
              >
                <span>{{ currentLocaleName }}</span>
                <span class="icon is-small">
                  <ChevronDown />
                </span>
              </button>
            </div>

            <div class="dropdown-menu" id="lang-menu" role="menu">
              <div class="dropdown-content">
                <a
                  v-for="lang in locales"
                  :key="lang.code"
                  class="dropdown-item"
                  :class="{ 'is-active': lang.code === locale }"
                  @click="changeLang(lang.code)"
                >
                  {{ lang.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Spool, ChevronDown } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

// Get i18n instance
const { locale, setLocale, locales } = useI18n();

const langOpen = ref(false);

type LocaleCode = (typeof locales.value)[number]['code'];

const changeLang = (code: LocaleCode) => {
  setLocale(code);
  langOpen.value = false;
};

const currentLocaleName = computed(() => {
  return locales.value.find((l) => l.code === locale.value)?.name ?? locale.value;
});

const onClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    langOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>
