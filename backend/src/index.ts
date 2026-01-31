import app from './app';

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API: http://localhost:${PORT}/api`);
});
