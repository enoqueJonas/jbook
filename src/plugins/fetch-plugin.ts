import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache' 
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild){
    build.onLoad({ filter: /.*/ }, async (args: any) => {
      console.log('onLoad', args);

      if (args.path === 'index.js') {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      }

      // Check if we have already fetched the file and it is cached
      const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

      // if it is cached, return it
      if(cachedResult) return cachedResult;

      const { data, request } = await axios.get(args.path);

      const result: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents: data,
        resolveDir: new URL('./', request.responseURL).pathname,
      };

      // Store in cache 
      await fileCache.setItem(args.path, result);

      return result;
    });
    } 
  }
}