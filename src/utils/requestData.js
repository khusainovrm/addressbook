export const requestData = (url, method = 'GET', body = null, headers = {}) => {
  if (body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  const response =  fetch(url, {method, body, headers})
  const data =  response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Что-то пошло не так')
  }

  return data
}
