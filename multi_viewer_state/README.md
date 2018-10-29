# Multi-Viewer State

This example shows how an admin user can set extension-wide state for multiple users in a single request.

The state for each viewer is sent as a JSON blob to the server. This is formatted such that each top-level field of the payload is a viewer's Opaque ID which contains the viewers intended state.

```json
{
  "U12345": {
    "favorite_color": "red",
    "favorite_season": "autumn"
  },
  "U23456": {
    "favorite_color": "blue",
    "favorite_season": "summer"
  },
  "U98765": {
    "favorite_song": "Mary Had a Little Lamb",
    "favorite_animal": "Honey Badger"
  }
}
```
