module.exports = {
    default: {
        paths: ["src/tests/features"],
        require: ["src/tests/step-definitions/*.ts"],
        requireModule: ["ts-node/register"],
        format: ["progress-bar", "json:reports/cucumber-report.json", "html:reports/cucumber-report.html"],
        formatOptions: { colorsEnabled: true, snippetInterface: "async-await" }
    }
};
