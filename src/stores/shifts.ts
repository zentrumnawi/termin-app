import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchShifts } from '@/api/shifts'
import type { Shift } from './types'

export const useShiftsStore = defineStore('shifts', () => {
  const shifts = ref<Shift[]>([])

  async function getShifts() {
    shifts.value = await fetchShifts()
  }

  return {
    shifts,
    getShifts,
  }
})
