<script setup>
import '../../src/style/FormInput.scss'
defineProps({
  label: {
    Type: String
  },
  placeholder: {
    Type: String
  },
  type: {
    Type: String
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>
<template>
  <label>{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="placeholder"
    class="form-input"
    :value="modelValue"
    :type="type"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
