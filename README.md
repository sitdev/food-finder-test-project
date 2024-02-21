# Food Finder Test Project

Build a REST API microservice that proxies data from the Food Finder API and 
provides additional address search capabilities by pairing with the Google Maps Geocode API.

## Requirements

- Build out a response for the existing route http://localhost:3000/api/food-finder (`server/api/food-finder.get.ts`).
This route accepts a `query` parameter that contains a zip code search query.
- Convert the zip code search query into geo-coordinate bounds using the Google Maps Geocode API, 
then use those bounds in the Food Finder API's coordinate parameters (`min_lat`, `max_lat`, `min_lon`, `max_lon`).
- In the JSON response from the route, include both the geocoding data from the zip code search 
and the list of matching Food Finder providers:
  - Simplify the geocoding data into a more readable format for end users.
  - Simplify the location data by removing properties that don't seem useful to the end user.
  - Improve the data structure of the location `operating_days` property.
- To save on API bandwidth, leverage the built-in `useStorage()` to implement a simple caching system for both geocode responses 
and location results for a given search. The cache for both should expire after 1 hour. 

## External API Usage

### Food Finder API

Request Format:

```
GET https://api-v2-prod-dot-foodfinder-183216.uc.r.appspot.com/partners/providers?min_lat={south}max_lat={north}&min_lon={west}&max_lon={east}key={key}&limit=1000
```

Example JSON Response:

```json
[
  {
    "id": "329149",
    "name": "Turtle Stop",
    "latitude": 41.8108111,
    "longitude": -87.6606988,
    "operating_days": "{\"monday\":{\"notes\":\"\",\"hours\":[],\"checked\":false},\"tuesday\":{\"notes\":\"\",\"hours\":[{\"hoursFrom\":\"09:00\",\"hoursTo\":\"16:00\"}],\"checked\":true},\"wednesday\":{\"notes\":\"\",\"hours\":[{\"hoursFrom\":\"09:00\",\"hoursTo\":\"16:00\"}],\"checked\":true},\"thursday\":{\"notes\":\"\",\"hours\":[],\"checked\":false},\"friday\":{\"notes\":\"\",\"hours\":[{\"hoursFrom\":\"09:00\",\"hoursTo\":\"16:00\"}],\"checked\":true},\"saturday\":{\"notes\":\"\",\"hours\":[],\"checked\":false},\"sunday\":{\"notes\":\"(Only open during events listed on website)\",\"hours\":[{\"hoursFrom\":\"11:00\",\"hoursTo\":\"15:00\"}],\"checked\":true}}",
    "operating_hours": null,
    "address1": "1400 W. 46th St.",
    "address2": null,
    "city": "Chicago",
    "county": null,
    "state": "IL",
    "zip_code": "60609",
    "sourcefrom": "illinois-extension",
    "created": "2024-02-14T01:37:00.171Z",
    "updated": "2024-02-14T02:19:04.378Z",
    "url": "https://www.insidetheplant.com/turtle-stop",
    "phone_number": "773-357-7192",
    "email": "info@bubblydynamics.com",
    "serviceArea": null,
    "requirements": null,
    "services1": "Residents of 60609 receive a 10% discount; payment with cash receives a 3% discount.",
    "languages": null,
    "contact_person": "Justine",
    "currency": "SNAP",
    "internal_notes": null,
    "filter_id": [
      4
    ],
    "portal_id": [
      1
    ]
  }
]
```

### Google Maps Geocode API

Request Format: 
```
GET https://maps.googleapis.com/maps/api/geocode/json?address={search}&key={key}
```

Example Response: 

```json
{
   "results" : 
   [
      {
         "address_components" : 
         [
            {
               "long_name" : "10018",
               "short_name" : "10018",
               "types" : 
               [
                  "postal_code"
               ]
            },
            {
               "long_name" : "Manhattan",
               "short_name" : "Manhattan",
               "types" : 
               [
                  "political",
                  "sublocality",
                  "sublocality_level_1"
               ]
            },
            {
               "long_name" : "New York",
               "short_name" : "New York",
               "types" : 
               [
                  "locality",
                  "political"
               ]
            },
            {
               "long_name" : "New York County",
               "short_name" : "New York County",
               "types" : 
               [
                  "administrative_area_level_2",
                  "political"
               ]
            },
            {
               "long_name" : "New York",
               "short_name" : "NY",
               "types" : 
               [
                  "administrative_area_level_1",
                  "political"
               ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : 
               [
                  "country",
                  "political"
               ]
            }
         ],
         "formatted_address" : "New York, NY 10018, USA",
         "geometry" : 
         {
            "bounds" : 
            {
               "northeast" : 
               {
                  "lat" : 40.7648468,
                  "lng" : -73.98088799999999
               },
               "southwest" : 
               {
                  "lat" : 40.749102,
                  "lng" : -74.01240009999999
               }
            },
            "location" : 
            {
               "lat" : 40.755322,
               "lng" : -73.9932872
            },
            "location_type" : "APPROXIMATE",
            "viewport" : 
            {
               "northeast" : 
               {
                  "lat" : 40.7648468,
                  "lng" : -73.98088799999999
               },
               "southwest" : 
               {
                  "lat" : 40.749102,
                  "lng" : -74.01240009999999
               }
            }
         },
         "place_id" : "ChIJq_e9GK1ZwokRKgCpnuOYxXQ",
         "types" : 
         [
            "postal_code"
         ]
      }
   ],
   "status" : "OK"
}
```

### Implementation

API keys are included in the provided `.env` file and can be accessed in the application from the Runtime Config:

```javascript
const { foodFinderApiKey, googleMapsApiKey } = useRuntimeConfig()
```

Use the global `$fetch` function to fetch external URLs within server routes:

```javascript
const response = await $fetch('https://maps.googleapis.com/maps/api/geocode/json')
```

[$fetch Documentation](https://nuxt.com/docs/api/utils/dollarfetch)

## Cache Usage

Cache files are stored in `.nuxt/cache` by default

```javascript
await useStorage('cache').setItem('example-key', JSON.stringify(exampleValue))
```

[Unstorage Documentation](https://unstorage.unjs.io/getting-started/usage)


## Local Setup

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
