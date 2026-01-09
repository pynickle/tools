<template>
  <div>
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <section class="section">
      <div class="container">
        <NuxtPage />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Import Header Component
import Header from '../components/Header.vue';
</script>
