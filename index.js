const { v4: uuid } = require("uuid")
const axios = require("axios")

const ORG_ID = "621a13401aac5a00018169f5"
const API_ID = "199c094405cb44d3497bdfece168cb2c"
const VERSIONS = ["DEFAULT"]

//*   Create Custom Keys via Dashboard API

const newKeyIds = Array.from({ length: 1000 }, () => uuid())

const createKeyURL = "http://localhost:3000/api/keys/"

const client = axios.create({ headers: { authorization: "Bearer 31c8c6b2e0fc433c48fee4aa9fbdcd8b" } })

const data = {
  org_id: ORG_ID,
  expires: 0,
  allowance: 0,
  per: 0,
  quota_max: 0,
  rate: 0,
  access_rights: {
    [API_ID]: {
      api_name: "",
      api_id: API_ID,
      versions: VERSIONS,
    },
  },
}

const run = () => {
  axios
    .all(newKeyIds.map((id) => client.post(`${createKeyURL}${id}`, data)))
    .then(
      axios.spread((...data) => {
        console.log(">> create successful.")
      })
    )
    .catch((error) => {
      console.log(error)
      console.log(">> create error.")
    })
}

run()
