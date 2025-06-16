const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.message === 'Translation not found') {
    return res.status(404).json({
      error: 'Translation not found',
      message: 'The requested translation does not exist'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Resource already exists'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end'
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
}; 