import axios from 'axios'
// used for hitting different endpoints
export default () => {
  return axios.create({
      baseURL: `http://localhost:8081/`
  })
}