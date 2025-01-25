<script setup>
import axios from 'axios'
import { computed, inject, ref } from 'vue'
import CardItemList from './CardItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const { cart, closeDrawer } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://bec8d07c9da99357.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })

    cart.value = []
    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}
const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 z-[1000]" @click.self="$emit('close')"></div>

  <div
    class="bg-white w-full sm:w-96 h-full fixed right-0 top-0 z-[1100] flex flex-col shadow-xl transition-transform transform translate-x-0"
  >
    <div class="flex-shrink-0 p-6 sm:p-8 border-b mb-5">
      <DrawerHead />
    </div>

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />

      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div class="flex-grow overflow-y-auto px-6 sm:px-8">
      <CardItemList v-if="totalPrice" />
    </div>

    <div v-if="totalPrice" class="flex-shrink-0 p-6 sm:p-8 border-t mt-5">
      <div class="flex flex-col gap-4 mb-4">
        <div class="flex items-center gap-2">
          <span>{{ $t('total') }}:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} {{ $t('tenge') }}.</b>
        </div>
        <div class="flex items-center gap-2">
          <span>{{ $t('tax') }} 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} {{ $t('tenge') }}.</b>
        </div>
      </div>

      <button
        :disabled="buttonDisabled"
        @click="createOrder"
        class="w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-400 via-lime-500 to-green-600 rounded-xl shadow-lg hover:from-green-500 hover:via-lime-600 hover:to-green-700 active:scale-95 transition-transform duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {{ $t('place-an-order') }}
      </button>
    </div>
  </div>
</template>
