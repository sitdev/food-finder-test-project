# Food Finder Test Project

Build a REST API microservice that proxies data from the Food Finder API and 
provides additional address search capabilities by pairing with the Google Maps Geocode API.

## Requirements

- Build out a response for the existing route http://localhost:3000/api/food-finder (`server/api/food-finder.get.ts`).
This route accepts a `query` parameter that contains a full address search query.
- Convert the address search query into geo-coordinate bounds using the Google Maps Geocode API, 
then use those bounds in the Food Finder API's coordinate parameters (`min_lat`, `max_lat`, `min_lon`, `max_lon`).
- In the JSON response from the route, include both the geocoding data from the address search 
and the list of matching Food Finder locations:
  - Convert the geocoding data into a simpler and more user-friendly structure.
  - Simplify the location data by removing properties that don't seem useful.
  - Improve the usability and consistency of the location `operating_days` property.
- To save on API bandwidth, devise a simple file-based caching system for both geocode responses 
and location results for a given search. The geocode cache does not need to expire, 
but the locations should expire after 1 day.
- Filter out locations that may be within the rectangular geofence but don't actually match the address search.


## External API Usage

Food Finder API format:

```
https://api-v2-prod-dot-foodfinder-183216.uc.r.appspot.com/partners/providers?min_lat={south}max_lat={north}&min_lon={west}&max_lon={east}key={key}&limit=1000
```

Google Maps Geocode API format: 
```
https://maps.googleapis.com/maps/api/geocode/json?address={search}&key={key}
```

API keys are included in the provided `.env` file and can be accessed in the application from the Runtime Config:

```javascript
const { foodFinderApiKey, googleMapsApiKey } = useRuntimeConfig()
```

Use the global `$fetch` function to fetch external URLs within server routes:

```javascript
const response = await $fetch('https://maps.googleapis.com/maps/api/geocode/json')
```

[$fetch Documentation](https://nuxt.com/docs/api/utils/dollarfetch)

## Setup

```bash
yarn install
```

Copy the provided `env` file into the project root and rename it to `.env`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

A minimal front end is provided to aid in testing responses from `/api/food-finder`.


[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)
