<template>
  <div>
    <main>
      <p class="title is-1 is-spaced">{{ $t('index_title') }}</p>
      <hr class="bd-hr" />
      <div class="grid is-col-min-12">
        <div class="cell">
          <NuxtLinkLocale to="/regex_tester">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left icon is-large">
                    <Regex />
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ $t('regex_tester.title') }}</p>
                    <p class="subtitle is-6">{{ $t('regex_tester.description') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
        <div class="cell">
          <NuxtLinkLocale to="/color_converter">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left icon is-large">
                    <Palette />
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ $t('color_converter.title') }}</p>
                    <p class="subtitle is-6">{{ $t('color_converter.description') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Regex, Palette } from 'lucide-vue-next';
</script>
