export const environment = {
  production: true,
  configurationFiles: [
    `${window.location.origin}/mk8calculator/configurations/statistics-form-configuration.json`,
  ],
  localAssets: [
    `${window.location.origin}/mk8calculator/partstats/bodies.json`,
    `${window.location.origin}/mk8calculator/partstats/drivers.json`,
    `${window.location.origin}/mk8calculator/partstats/gliders.json`,
    `${window.location.origin}/mk8calculator/partstats/tires.json`,
  ]
};
