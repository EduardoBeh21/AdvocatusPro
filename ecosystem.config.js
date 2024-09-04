module.exports = {
    apps: [
      {
        name: 'app',
        script: 'app.js',
        watch: true,
        ignore_watch: ['public', 'node_modules', '*.log'], // Diretórios e arquivos a serem ignorados
        watch_options: {
          followSymlinks: false,
        },
      }
    ]
  };
      