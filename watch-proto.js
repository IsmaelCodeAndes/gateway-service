// watcher multiplataforma para copiar .proto a dist/proto automáticamente
// watcher multiplataforma para copiar .proto a dist/proto automáticamente (versión chokidar)
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const SRC_DIR = path.join(__dirname, 'src', 'proto');
const DIST_DIR = path.join(__dirname, 'dist', 'proto');

function copyProtos() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  fs.readdirSync(SRC_DIR).forEach(file => {
    if (file.endsWith('.proto')) {
      const src = path.join(SRC_DIR, file);
      const dest = path.join(DIST_DIR, file);
      fs.copyFileSync(src, dest);
      console.log(`[watch-proto] Copied ${file} to dist/proto`);
    }
  });
}

function watchProto() {
  copyProtos(); // copia inicial
  // Watch .proto changes
  chokidar.watch(SRC_DIR + '/*.proto', {ignoreInitial: true}).on('all', (event, filePath) => {
    copyProtos();
  });
  // Watch dist/proto removal
  chokidar.watch(path.join(__dirname, 'dist')).on('unlinkDir', (removedPath) => {
    if (removedPath === DIST_DIR) {
      setTimeout(copyProtos, 300);
    }
  });
  console.log('[watch-proto] Watching for .proto changes and dist/proto removals...');
}

watchProto();
