import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'

export const useEventsStore = defineStore('events', () => {
  async function getEvents() {
    try {
      const events = []
      const eventRes = await useApiStore().get(true, 'users/190/events')
      for (const event of eventRes.data) {
        const roomId = event.id
        const rooms = await useApiStore().get(true, `events/${roomId}/microlocations`)
        const roomsData = []
        for (const room of Object(rooms.data)) {
          roomsData.push({
            id: room.id,
            name: room.attributes.name
          })
        }
        events.push({
          id: event.id,
          name: event.attributes.name,
          rooms: roomsData
        })
      }
      return events
    } catch (error) {
      throw error
    }
  }

  async function getEventName(eventId) {
    try {
      const event = await useApiStore().get(true, `events/${eventId}`)
      return event.data.attributes.name
    } catch (error) {
      throw error
    }
  }

  return { getEvents, getEventName }
})
