module.exports = app => {
    app.listen(process.env.APP_PORT || 3000, () => {
        console.log(`API running on port ${process.env.APP_PORT || 3000}`)
    })
}