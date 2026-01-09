<template>
  <!-- Bulma Navbar -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/tools">
        <Spool />
        <h1 class="title is-4">Tools</h1>
      </a>

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
        <a class="navbar-item" href="/"> Home </a>
        <a class="navbar-item" href="https://github.com/pynickle/tools"> GitHub </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Spool } from 'lucide-vue-next';
// Navbar burger functionality
import { onMounted } from 'vue';

onMounted(() => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target!);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target?.classList.toggle('is-active');
    });
  });
});
</script>
