
const cloud_url = `https://api.glassball.app`
const local_url = `http://localhost:8080`
const host_url = `${cloud_url}`

const api_url = `${host_url}/api/v1`
const media_url = `${host_url}/media`


export default  {
  "server": {
    "files": `${api_url}/dms/files`,

    "media": `${media_url}`
  },

  "auth": {
    "token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNTc3NjM2LCJqdGkiOiIxZWIxMWRmYTdkZjk0NmIwOTkwMGI2Y2FiNDJkNGUzMyIsInVzZXJfaWQiOiIyMDA1ZTE2OC0wZmUwLTRiMWItYTc4YS1kODBiODA3MGE3OTMifQ.FrvlYxpIkw_MgMh9o2gnf_1UGYKQJx9-O3PCbCg_WDc`
  }
}
