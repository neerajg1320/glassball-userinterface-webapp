
const cloud_url = `http://23.236.53.153:8000`
const local_url = `http://localhost:8080`
const host_url = `${local_url}`

const api_url = `${host_url}/api/v1`
const media_url = `${host_url}/media`


export default  {
  "server": {
    "files": `${api_url}/dms/files`,

    "media": `${media_url}`
  },

  "auth": {
    "token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNDgyOTUzLCJqdGkiOiI1MWQ0NDkyZGFkOGQ0MjQ3OTVmNTRkZjBkYzhmNDAwMSIsInVzZXJfaWQiOiJjYzYxYzdjYy00MjIyLTRmYTUtYjJiOC0xODg2Njc2NzQxOGMifQ.9kCiS3xDlPtF5h50Xyrg6xd8ra4PKY2NfRbkzwAQImE`
  }
}
