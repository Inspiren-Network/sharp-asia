<script setup>
import { computed } from 'vue'
import { DialogTitle } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogTitle
    :class="
      cn(
        'text-[18px] leading-[28px] font-semibold text-foreground',
        props.class
      )
    "
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
