# HNG-stage-0

A simple Node.js REST API that classifies names by gender using the [Genderize.io](https://genderize.io) API.
 
## Tech Stack
 
- Node.js
- Express
- CORS

## Endpoint
 
### `GET /api/classify?name={name}`
 
Classifies a name by gender and returns a confidence assessment.
 
**Example Request**
```
GET /api/classify?name=john
```
