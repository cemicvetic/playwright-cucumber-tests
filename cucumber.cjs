module.exports = {
    default: {
        import: ["./step-definitions/**/*.js"],
        format: ["pretty"],
        publishQuiet: true,
        worldParameters: {
            browser: "chromium",
        },
    },
};
