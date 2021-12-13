const CopyPlugin = require("copy-webpack-plugin");

module.exports = (x) => ({
  ...x,
  plugins: [
    ...x.plugins,
    new CopyPlugin({
      patterns: [
        { from: "dist/apps/web", to: "web" },
        { from: "apps/nodeplotlib/src/main.d.ts", to: "" },
        { from: "LICENSE", to: "" },
      ],
    }),
  ],
});
