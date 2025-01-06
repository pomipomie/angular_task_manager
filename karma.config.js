module.exports = function (config) {
  config.set({
    basePath: "",

    // Frameworks to use
    frameworks: ["jasmine"],

    // List of files / patterns to load in the browser
    files: [
      "src/test.ts", // Angular test entry file
    ],

    // Exclude patterns
    exclude: [],

    // Preprocessors for code coverage (optional)
    preprocessors: {
      "src/test.ts": ["webpack", "sourcemap"],
    },

    // Webpack configuration
    webpack: {
      mode: "development",
      resolve: {
        extensions: [".ts", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: "ts-loader",
            options: { configFile: "tsconfig.spec.json" },
          },
        ],
      },
      devtool: "inline-source-map",
    },

    // Reporter configuration
    reporters: ["progress", "coverage-istanbul"],

    // Code coverage configuration (optional)
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },

    // Port and browser settings
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // Start browsers
    browsers: ["Chrome"],

    // Run tests and stop after one cycle
    singleRun: false,

    // Re-run tests on file change
    restartOnFileChange: true,

    // Client configuration (optional)
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
  });
};
