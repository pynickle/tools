<template>
  <div>
    <main>
      <p class="title is-1 is-spaced">Color Converter</p>
      <hr class="bd-hr" />
      <div class="columns is-multiline">
        <div class="column is-three-fifths-desktop">
          <div class="field is-horizontal">
            <div class="field-label is-normal is-flex-grow-0 has-text-left">
              <label class="label">Hex</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-right">
                  <input
                    id="hex-input"
                    class="input is-rounded"
                    type="text"
                    placeholder="Hex"
                    v-model="hex"
                    @input="onHexInput"
                  />
                  <div
                    class="icon is-small is-right copy-icon"
                    @click="copyToClipboard('hex-input')"
                  >
                    <ClipboardCopy />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal is-flex-grow-0 has-text-left">
              <label class="label">RGB</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-right">
                  <input
                    id="rgb-input"
                    class="input is-rounded"
                    type="text"
                    placeholder="RGB"
                    v-model="rgb"
                    @input="onRgbInput"
                  />
                  <div
                    class="icon is-small is-right copy-icon"
                    @click="copyToClipboard('rgb-input')"
                  >
                    <ClipboardCopy />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal is-flex-grow-0 has-text-left">
              <label class="label">HSL</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-right">
                  <input
                    id="hsl-input"
                    class="input is-rounded"
                    type="text"
                    placeholder="HSL"
                    v-model="hsl"
                    @input="onHslInput"
                  />
                  <div
                    class="icon is-small is-right copy-icon"
                    @click="copyToClipboard('hsl-input')"
                  >
                    <ClipboardCopy />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ClipboardCopy } from 'lucide-vue-next';

import { ref } from 'vue';

// Reactive data
const hex = ref('');
const rgb = ref('');
const hsl = ref('');

// Color conversion functions
function hexToRgb(hexVal: string): { r: number; g: number; b: number } | null {
  const cleanHex = hexVal.replace(/^#/, '');
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hexVal = Math.max(0, Math.min(255, n)).toString(16);
    return hexVal.length === 1 ? '0' + hexVal : hexVal;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Input validation
function isValidRgb(rgbStr: string): boolean {
  const match = rgbStr.match(/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/);
  if (!match) return false;
  const [_, r = '', g = '', b = ''] = match;
  return [r, g, b].every((n) => {
    const num = parseInt(n);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}

function isValidHsl(hslStr: string): boolean {
  const match = hslStr.match(/^(\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%$/);
  if (!match) return false;
  const [_, h = '', s = '', l = ''] = match;
  const hNum = parseInt(h);
  const sNum = parseInt(s);
  const lNum = parseInt(l);
  return !isNaN(hNum) && !isNaN(sNum) && !isNaN(lNum) && hNum <= 360 && sNum <= 100 && lNum <= 100;
}

// Input handling functions
function onHexInput() {
  const hexVal = hex.value.trim();
  if (!hexVal) {
    rgb.value = '';
    hsl.value = '';
    return;
  }

  const rgbObj = hexToRgb(hexVal);
  if (rgbObj) {
    rgb.value = `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`;
    const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
    hsl.value = `${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%`;
  } else {
    rgb.value = 'Invalid Hex';
    hsl.value = 'Invalid Hex';
  }
}

function onRgbInput() {
  const rgbVal = rgb.value.trim();
  if (!rgbVal) {
    hex.value = '';
    hsl.value = '';
    return;
  }

  if (isValidRgb(rgbVal)) {
    const parts = rgbVal.split(',').map((n) => parseInt(n.trim()));
    const r = parts[0] || 0;
    const g = parts[1] || 0;
    const b = parts[2] || 0;
    hex.value = rgbToHex(r, g, b);
    const hslObj = rgbToHsl(r, g, b);
    hsl.value = `${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%`;
  } else {
    hex.value = 'Invalid RGB';
    hsl.value = 'Invalid RGB';
  }
}

function onHslInput() {
  const hslVal = hsl.value.trim();
  if (!hslVal) {
    hex.value = '';
    rgb.value = '';
    return;
  }

  if (isValidHsl(hslVal)) {
    const parts = hslVal
      .replace(/%/g, '')
      .split(',')
      .map((n) => parseInt(n.trim()));
    const h = parts[0] || 0;
    const s = parts[1] || 0;
    const l = parts[2] || 0;
    const rgbObj = hslToRgb(h, s, l);
    rgb.value = `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`;
    hex.value = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
  } else {
    hex.value = 'Invalid HSL';
    rgb.value = 'Invalid HSL';
  }
}

// Copy to clipboard functionality
async function copyToClipboard(inputId: string) {
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (!input || !input.value) return;

  const originalPlaceholder = input.placeholder;
  const originalValue = input.value;

  try {
    await navigator.clipboard.writeText(originalValue);

    // Visual feedback
    input.value = '';
    input.placeholder = 'Copied!';
    input.classList.add('is-success');

    setTimeout(() => {
      input.placeholder = originalPlaceholder;
      input.value = originalValue;
      input.classList.remove('is-success');
    }, 1000);
  } catch (err) {
    console.error('Failed to copy: ', err);
    input.placeholder = 'Copy failed!';

    setTimeout(() => {
      input.placeholder = originalPlaceholder;
    }, 1000);
  }
}
</script>
