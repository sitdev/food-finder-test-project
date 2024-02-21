import { getQuery } from 'h3'
import { FoodFinderResult } from '~/types/food-finder'
import GeocoderResult = google.maps.GeocoderResult;

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event)
  return { query }
})
