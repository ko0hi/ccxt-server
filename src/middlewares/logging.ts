export const logRequestMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString()
  const { method, url, headers, query, body } = req
  const sensitiveKeys = ['apiKey', 'secret']

  // Remove sensitive keys from the headers object
  const filteredHeaders = { ...headers }
  sensitiveKeys.forEach(key => {
    if (filteredHeaders[key]) {
      filteredHeaders[key] = '[FILTERED]'
    }
  })

  // Remove sensitive keys from the query object
  const filteredQuery = { ...query }
  sensitiveKeys.forEach(key => {
    if (filteredQuery[key]) {
      filteredQuery[key] = '[FILTERED]'
    }
  })

  // Remove sensitive keys from the body object
  const filteredBody = { ...body }
  sensitiveKeys.forEach(key => {
    if (filteredBody[key]) {
      filteredBody[key] = '[FILTERED]'
    }
  })

  console.log('--- Request ---')
  console.log(`Timestamp: ${timestamp}`)
  console.log(`Method: ${method}`)
  console.log(`URL: ${url}`)
  console.log('Headers:', filteredHeaders)
  console.log('Query:', filteredQuery)
  console.log('Body:', filteredBody)
  console.log('--- End Request ---\n')

  next()
}

export const logResponseMiddleware = (req, res, next) => {
  const originalSend = res.send

  res.send = body => {
    const timestamp = new Date().toISOString()

    console.log('--- Response ---')
    console.log(`Timestamp: ${timestamp}`)
    console.log(`Status: ${res.statusCode}`)
    console.log('Headers:', res.getHeaders())
    console.log('--- End Response ---\n')

    originalSend.call(res, body)
  }

  next()
}
