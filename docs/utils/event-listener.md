# 监听事件<BackTop />

<br/>

*添加和清除 `DOM` 事件监听器的组合式函数*

::: details Show Source Code

```ts
function useEventListener (target: any, event: string, callback: Function) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'rtdp-ui-plugins'

const scrollDown = ref(false) // 是否向下滚动
let lastScrollPosition = 0 // 保存上一次滚动的位置

function scrollEvent () {
  // 获取当前滚动条的位置
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  // 比较当前位置和上一次记录的位置
  scrollDown.value = currentScrollPosition > lastScrollPosition
  // 更新上一次滚动的位置
  lastScrollPosition = currentScrollPosition
}
const throttleScroll = throttle(scrollEvent, 100)
useEventListener(window, 'scroll', throttleScroll)
</script>

## 基本使用

<h3>滚动方向：{{ scrollDown ? '向下':'向上' }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'rtdp-ui-plugins'

const scrollDown = ref(false) // 是否向下滚动
let lastScrollPosition = 0 // 保存上一次滚动的位置

function scrollEvent () {
  // 获取当前滚动条的位置
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  // 比较当前位置和上一次记录的位置
  scrollDown.value = currentScrollPosition > lastScrollPosition
  // 更新上一次滚动的位置
  lastScrollPosition = currentScrollPosition
}
const throttleScroll = throttle(scrollEvent, 100)
useEventListener(window, 'scroll', throttleScroll)
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
target | 要添加监听事件的目标元素 | any | - | true
event | 监听的事件类型（大小写敏感） | string | - | true
callback | 监听事件触发时的回调函数 | Function | - | true
