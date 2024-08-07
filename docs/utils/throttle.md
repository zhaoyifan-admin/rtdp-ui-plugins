# 节流<BackTop />

<br/>

*如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间 `delay` 期限内不再工作，直至过了这段时间才重新生效*

::: details Show Source Code

```ts
function throttle (fn: Function, delay = 300): any {
  let valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
    return false // valid为false时，函数不执行
  }
}
```

:::

## 何时使用

- 短时间内大量触发同一事件时，每 `delay` `ms` 内函数只执行一次

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle, useEventListener } from 'rtdp-ui-plugins'

const scrollTop = ref(0)
useEventListener(window, 'scroll', throttle(showPosition, 100))
function showPosition () {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>

## 基本使用

<h3>滚动条位置：{{ scrollTop }}</h3>

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle, useEventListener } from 'rtdp-ui-plugins'

const scrollTop = ref(0)
useEventListener(window, 'scroll', throttle(showPosition, 100))
function showPosition () {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
fn | 要执行的函数 | Function | - | true
delay | 函数失效时长，单位`ms` | number | 300 | false
