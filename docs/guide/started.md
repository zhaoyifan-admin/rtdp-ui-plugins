# 快速上手

<BackTop />
<Watermark fullscreen content="Tool Plugins" />

## Install

::: code-group

```sh [npm]
$ npm install rtdp-ui-plugins
```

```sh [pnpm]
$ pnpm add rtdp-ui-plugins
```

```sh [yarn]
$ yarn add rtdp-ui-plugins
```

```sh [bun]
$ bun add rtdp-ui-plugins
```

:::

## Use Components

> **Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import VueAmazingUI from 'rtdp-ui-plugins'
import 'rtdp-ui-plugins/css'

const app = createApp(App)
app.use(VueAmazingUI)

app.mount('#app')
```

> **Local**

```vue
<script setup lang="ts">
import { Button } from 'rtdp-ui-plugins'
import 'rtdp-ui-plugins/css'
</script>

<template>
  <Button></Button>
</template>
```

### Use Functions

```vue
<script setup lang="ts">
import {
  dateFormat,
  requestAnimationFrame,
  cancelAnimationFrame,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  formatNumber,
  toggleDark,
  useEventListener
} from 'rtdp-ui-plugins'
</script>
```
