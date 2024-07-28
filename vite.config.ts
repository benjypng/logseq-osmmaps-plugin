import { defineConfig } from 'vite'
import logseqDevPlugin from 'vite-plugin-logseq'

export default defineConfig(async () => {
  //const { viteStaticCopy } = await import('vite-plugin-static-copy')

  return {
    plugins: [logseqDevPlugin()],
  }
})
