<template>
  <div>
    <main>
      <p class="title is-1 is-spaced">Tools For Developer</p>
      <hr class="bd-hr" />
      <div class="grid is-col-min-12">
        <div class="cell">
          <a href="./regex_tester">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left icon is-large">
                    <Regex />
                  </div>
                  <div class="media-content">
                    <p class="title is-4">Regex Tester</p>
                    <p class="subtitle is-6">Test your regular expressions with sample text.</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="cell">
          <a href="./color_converter">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left icon is-large">
                    <Palette />
                  </div>
                  <div class="media-content">
                    <p class="title is-4">Color Converter</p>
                    <p class="subtitle is-6">Convert between different color formats.</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Regex, Palette } from 'lucide-vue-next';
</script>
