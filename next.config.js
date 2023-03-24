/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName: true,
      // Enabled by default.
      ssr: true,
      // // Enabled by default.
      // fileName,
      // // Empty by default.
      // topLevelImportPaths,
      // // Defaults to ["index"].
      // meaninglessFileNames,
      // // Enabled by default.
      // cssProp,
      // // Empty by default.
      // namespace,
      // // Not supported yet.
      // minify,
      // // Not supported yet.
      // transpileTemplateLiterals,
      // // Not supported yet.
      // pure,
    },
  },
};

module.exports = nextConfig;
