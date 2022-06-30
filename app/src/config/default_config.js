const host_url = `${process.env.REACT_APP_API_SERVER}`

const api_url = `${host_url}/api/v1`
const media_url = `${host_url}/media`


export default  {
  "server": {
    "documents": `${api_url}/dms/documents`,
    "files": `${api_url}/dms/files`,
    "docTypes": `${api_url}/rms/document_types`,
    "accounts": `${api_url}/rms/accounts`,

    "media": `${media_url}`
  },

  "auth": {
    "create_token_url": `${api_url}/auth/jwt/create`,
    "token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNTg2Mzg2LCJqdGkiOiJjNjhhZTBjNjUxZGU0MTg3OTM2YzYxODMwY2NkYTMzNiIsInVzZXJfaWQiOiIyMDA1ZTE2OC0wZmUwLTRiMWItYTc4YS1kODBiODA3MGE3OTMifQ.HyDO1C427gEuFV_I6do0hefHsRVEg1Sv062uaDmgFpo`
  }
}
