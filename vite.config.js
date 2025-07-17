import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp3', '**/*.wav'],
    build: {
        copyPublicDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    animations: ['framer-motion'],
                    icons: ['lucide-react']
                },
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const extType = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        return `assets/images/[name]-[hash][extname]`;
                    }
                    if (/mp3|wav|ogg/i.test(extType)) {
                        return `assets/audio/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                }
            }
        },
        chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
    }
}) 
