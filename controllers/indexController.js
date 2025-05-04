const getIndexPage = async (req, res) => {
    res.render('pages/index.ejs');
}

export {
    getIndexPage,
}