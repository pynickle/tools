<template>
  <div>
    <main>
      <p class="title is-1 is-spaced">{{ $t('regex_tester.title') }}</p>
      <hr class="bd-hr" />
      <div class="columns is-multiline">
        <div class="column is-three-fifths-desktop">
          <!-- Regex Input -->
          <div class="field">
            <label class="label">{{ $t('regex_tester.fields.regex') }}</label>
            <div class="control">
              <textarea
                class="textarea"
                :placeholder="$t('regex_tester.fields.the_regular_expression')"
                v-model="regex"
                @input="testRegex"
              ></textarea>
            </div>
          </div>

          <!-- Regex Flags -->
          <div class="field">
            <label class="label">{{ $t('regex_tester.fields.flags') }}</label>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-info">Flags:</span>
                <button
                  v-for="flag in availableFlags"
                  :key="flag.name"
                  class="tag"
                  :class="{ 'is-primary': flags[flag.name] }"
                  @click="toggleFlag(flag.name)"
                >
                  {{ flag.name }}
                </button>
              </div>
            </div>

            <!-- Test Text -->
            <div class="field mt-3">
              <label class="label">{{ $t('regex_tester.fields.text') }}</label>
              <div class="control">
                <textarea
                  class="textarea"
                  :placeholder="$t('regex_tester.fields.text_used_for_testing')"
                  v-model="testText"
                  @input="testRegex"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Match Results -->
          <div class="column is-full">
            <div class="field">
              <label class="label">{{ $t('regex_tester.fields.results') }}</label>
              <div class="box" v-if="matches.length > 0">
                <p class="is-size-6 has-text-success">
                  {{ $t('regex_tester.fields.found_matches', { count: matches.length }) }}
                </p>
                <ul class="mt-3">
                  <li v-for="(match, index) in matches" :key="index" class="mb-2">
                    <div class="columns">
                      <div class="column is-one-fifth">
                        <span class="tag is-primary">Match {{ index + 1 }}</span>
                      </div>
                      <div class="column">
                        <span class="has-background-warning has-text-black px-1">{{
                          match.value
                        }}</span>
                        <p class="is-size-7 mt-1">
                          Position: {{ match.index }} -
                          {{ match.index + match.value.length }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="box" v-else-if="regex && testText">
                <p class="is-size-6 has-text-danger">
                  {{ $t('regex_tester.fields.no_matches_found') }}
                </p>
              </div>
              <div class="box" v-else>
                <p class="is-size-6 has-text-grey">
                  {{ $t('regex_tester.fields.enter_regex_text') }}
                </p>
              </div>
            </div>

            <!-- Highlighted Text -->
            <div class="field" v-if="highlightedText">
              <label class="label">{{ $t('regex_tester.fields.highlighted_text') }}</label>
              <div class="box" v-html="highlightedText"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Reactive data
const regex = ref('');
const testText = ref('');

// Define flags with index signature
type RegexFlags = {
  g: boolean;
  i: boolean;
  m: boolean;
  s: boolean;
  u: boolean;
  y: boolean;
  [key: string]: boolean;
};

const flags = ref<RegexFlags>({
  g: true,
  i: false,
  m: false,
  s: false,
  u: false,
  y: false,
});
const matches = ref<Array<{ value: string; index: number }>>([]);
const highlightedText = ref('');

// Define flag type
type RegexFlag = 'g' | 'i' | 'm' | 's' | 'u' | 'y';

// Available flags with descriptions
const availableFlags: Array<{ name: RegexFlag; description: string }> = [
  { name: 'g', description: 'Global search' },
  { name: 'i', description: 'Case insensitive' },
  { name: 'm', description: 'Multiline' },
  { name: 's', description: 'Dot matches newline' },
  { name: 'u', description: 'Unicode' },
  { name: 'y', description: 'Sticky search' },
];

// Toggle flag function
function toggleFlag(flagName: string) {
  // Type assertion to ensure flagName is a valid RegexFlag
  const validFlagName = flagName as RegexFlag;
  flags.value[validFlagName] = !flags.value[validFlagName];
  testRegex();
}

// Test regex function
function testRegex() {
  matches.value = [];
  highlightedText.value = '';

  if (!regex.value || !testText.value) {
    return;
  }

  try {
    // Build regex flags string
    const flagsStr = Object.entries(flags.value)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join('');

    // Create regex object
    const regexObj = new RegExp(regex.value, flagsStr);

    // Find all matches
    if (flags.value.g) {
      let match;
      while ((match = regexObj.exec(testText.value)) !== null) {
        matches.value.push({
          value: match[0],
          index: match.index,
        });

        // Prevent infinite loop for zero-length matches
        if (match.index === regexObj.lastIndex) {
          regexObj.lastIndex++;
        }
      }
    } else {
      const match = regexObj.exec(testText.value);
      if (match) {
        matches.value.push({
          value: match[0],
          index: match.index,
        });
      }
    }

    // Generate highlighted text
    if (matches.value.length > 0) {
      let result = '';
      let lastIndex = 0;

      // Helper function to escape HTML and replace newlines with <br>
      const escapeHtmlAndPreserveNewlines = (text: string) => {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
          .replace(/\n/g, '<br>');
      };

      matches.value.forEach((match) => {
        // Add text before match with proper escaping and newlines
        const textBefore = testText.value.slice(lastIndex, match.index);
        result += escapeHtmlAndPreserveNewlines(textBefore);

        // Add highlighted match with proper escaping and newlines
        result += `<span class="has-background-warning has-text-black px-1">${escapeHtmlAndPreserveNewlines(match.value)}</span>`;

        // Update last index
        lastIndex = match.index + match.value.length;
      });

      // Add remaining text with proper escaping and newlines
      const remainingText = testText.value.slice(lastIndex);
      result += escapeHtmlAndPreserveNewlines(remainingText);

      highlightedText.value = result;
    }
  } catch (error) {
    console.error('Invalid regex:', error);
    // Clear results if regex is invalid
    matches.value = [];
    highlightedText.value = '';
  }
}
</script>
