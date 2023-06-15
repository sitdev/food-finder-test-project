import { getQuery } from 'h3'

export default defineEventHandler((event) => {
  const {query} = getQuery(event)
  const {foodFinderApiKey, googleMapsApiKey} = useRuntimeConfig()
})
