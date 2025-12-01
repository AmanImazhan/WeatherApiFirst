
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message || err);

  if (err.isApiError && err.status) {
    return res.status(err.status).json({
      error: {message: err.message}
    });
  }
if (err.name === 'ValidationError' || err.array) {
    return res.status(400).json({
      error: {
        message: err.message || 'Incorrect data',
        details: err.array?.() || undefined,
      },
    });
  }

  const message = err.message || 'Unknown server error';
  return res.status(500).json({
    error: {
      message,
    },
  });
}
export default errorHandler;