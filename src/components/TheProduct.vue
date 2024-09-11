<template>
  <div class="flex justify-between overflow-y-auto">
    <div class="flex flex-1 gap-2 max-w-[90%]">
      <img :src="product.imageUrl" :alt="product.productTitle" class="size-[40px] object-contain" />
      <div class="w-full text-left">
        <div :data-product-title="product.productTitle" class="mb-[16px] text-black text-[17px]">
          {{ product.productTitle }}
        </div>
        <div>
          <label for="Quantity" class="sr-only">Quantity</label>
          <div class="inline-flex items-center rounded border border-solid border-gray-200">
            <button
              type="button"
              class="size-[30px] leading-[30px] text-gray-600 transition hover:opacity-75 cursor-pointer text-center"
              @click="() => decreaseQuantity(product)">
              &minus;
            </button>

            <input
              type="number"
              :value="product.quantity"
              class="!h-[30px] !w-[64px] border-transparent text-center [-moz-appearance:_textfield] sm:!text-[14px] sm:leading-[20px] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none outline-none !rounded-none"
              disabled />

            <button
              type="button"
              class="size-[30px] leading-[30px] text-gray-600 transition hover:opacity-75 cursor-pointer text-center"
              @click="() => increaseQuantity(product)">
              &plus;
            </button>
          </div>
        </div>
      </div>
    </div>
    <Trash2 class="text-red-500 w-5 h-5 cursor-pointer" @click="() => removeQuote(product)" />
  </div>
</template>

<script>
import { Trash2 } from 'lucide-vue-next'
export default {
  props: ['product', 'increaseQuantity', 'decreaseQuantity', 'removeQuote'],
  components: {
    Trash2,
  },
}
</script>
