<template>
  <Sheet>
    <SheetTrigger asChild>
      <div
        v-if="totalProducts"
        class="w-[50px] h-[50px] rounded-full bg-[#ea1c24] fixed bottom-[150px] right-[10px] cursor-pointer inline-flex items-center justify-center z-10">
        <span
          class="absolute top-[17.5%] left-1/2 bg-black text-white size-[17px] inline-flex justify-center items-center rounded-full text-[12px]">
          {{ totalProducts }}
        </span>
        <i class="fa-solid fa-receipt text-white text-[20px]"></i>
      </div>
    </SheetTrigger>
    <SheetContent class="box-border flex">
      <SheetHeader class="w-full justify-between">
        <ScrollArea class="max-h-[75vh]">
          <SheetTitle>Quotation</SheetTitle>
          <SheetDescription class="flex flex-col gap-y-[24px] pr-[12px]">
            <TheProduct
              v-for="product in localStorageProducts"
              :key="product.productTitle"
              :product="product"
              :increaseQuantity="increaseQuantity"
              :decreaseQuantity="decreaseQuantity"
              :removeQuote="removeQuote" />
          </SheetDescription>
        </ScrollArea>
        <div class="justify-end">
          <p>
            Total
            {{ totalProducts > 1 ? 'products' : 'product' }}:
            {{ totalProducts }}
          </p>
          <SheetClose asChild>
            <Button class="popmake-1867 w-full cursor-pointer" @click="handleGetQuote" :disabled="totalProducts === 0">
              Get Quotation
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import TheProduct from './components/TheProduct.vue'
export default {
  data() {
    return {
      products: [],
      localStorageProducts: [],
    }
  },
  components: {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    Button,
    TheProduct,
    ScrollArea,
  },
  computed: {
    totalProducts() {
      return this.localStorageProducts.reduce((total, currentProduct) => total + currentProduct.quantity, 0)
    },
  },
  methods: {
    addQuote(product) {
      const checkProduct = this.localStorageProducts.filter(
        (storageProduct) => storageProduct.productTitle === product.productTitle
      )
      if (!checkProduct.length) {
        this.localStorageProducts.push(product)
        localStorage.setItem('oks-vue', JSON.stringify(this.localStorageProducts))
        toast('Product added to quotation.', {
          type: 'success',
          position: 'top-right',
        })
      } else {
        toast('This product is added before.', {
          type: 'error',
          position: 'top-right',
        })
      }
    },
    removeQuote(product) {
      const filterProducts = this.localStorageProducts.filter(
        (localProduct) => localProduct.productTitle !== product.productTitle
      )
      this.localStorageProducts = filterProducts
      localStorage.setItem('oks-vue', JSON.stringify(filterProducts))
    },
    handleGetQuote() {
      document.addEventListener('click', (event) => {
        if (event.target.matches('.forminator-custom-form .forminator-button-submit')) {
          this.localStorageProducts = []
          localStorage.setItem('oks-vue', JSON.stringify(this.localStorageProducts))
        }
      })
    },
    increaseQuantity(product) {
      const newLocalStorageProducts = this.localStorageProducts.map((p) => {
        if (p.productTitle === product.productTitle) {
          p.quantity++
        }
        return p
      })
      this.localStorageProducts = newLocalStorageProducts
      localStorage.setItem('oks-vue', JSON.stringify(this.localStorageProducts))
    },
    decreaseQuantity(product) {
      if (product.quantity <= 1) {
        this.removeQuote(product)
      } else {
        const newLocalStorageProducts = this.localStorageProducts.map((p) => {
          if (p.productTitle === product.productTitle) {
            p.quantity--
          }
          return p
        })
        this.localStorageProducts = newLocalStorageProducts
        localStorage.setItem('oks-vue', JSON.stringify(this.localStorageProducts))
      }
    },
  },
  mounted() {
    const allProducts = document.querySelectorAll('.solution-product-row .vc_row.vc_inner')

    const productCategory = document.querySelector(
      '#header ul[role="menubar"] > li[class*="current"] > ul.sub-menu > li[class*="current"] > a'
    )?.innerText

    allProducts.forEach((product) => {
      const productTitle = product.querySelector('.wpb_raw_code h5').innerText
      const imageUrl = product.querySelector('.wpb_single_image img').getAttribute('src')

      const quoteButton = product.querySelector('.quotation-btn')

      if (quoteButton) {
        quoteButton.addEventListener('click', () =>
          this.addQuote({
            productTitle,
            productCategory,
            imageUrl,
            quantity: 1,
          })
        )
      }

      this.products.push({ productTitle, productCategory, imageUrl })
    })

    const productDetail = document.querySelectorAll('.nec-product-desc')

    productDetail.forEach((product) => {
      const productTitle = product.querySelector('.info-title').innerText
      const imageUrl = product.querySelector('.product-image:first-child img').getAttribute('src')

      const quoteButton = product.querySelector('.quotation-btn')

      if (quoteButton) {
        quoteButton.addEventListener('click', () =>
          this.addQuote({
            productTitle,
            productCategory,
            imageUrl,
            quantity: 1,
          })
        )
      }
    })

    const localStorageProducts = localStorage.getItem('oks-vue')

    if (!localStorageProducts) {
      localStorage.setItem('oks-vue', JSON.stringify([]))
    } else {
      const newLocalStorageProducts = JSON.parse(localStorageProducts).map((product) => {
        if (!product.quantity) {
          product.quantity = 1
        }

        if (!product.productCategory) {
          product.productCategory = null
        }

        return product
      })

      this.localStorageProducts = newLocalStorageProducts
      localStorage.setItem('oks-vue', JSON.stringify(newLocalStorageProducts))
    }
  },
}
</script>
