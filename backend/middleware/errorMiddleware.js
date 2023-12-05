const errorHandler = (err, req, res, next) => {
  console.log(err)
  let statusCode = res.statusCode === 200 ? res.statusCode : 500
  let message = err.message

  // Check for Mongoose bad ObjectId
  if (err.name == 'CastError') {
    message = 'Resource not found'
    statusCode = 404
  }

  if (err.code === 11000) {
    message = 'Email / NISN sudah dipakai'
    statusCode = 400
  }

  // Check for Mongoose bad ObjectId
  if (err.name == 'ValidationError') {
    message = 'Resource not found'
    statusCode = 404
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { errorHandler }
