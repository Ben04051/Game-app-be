

exports.handleIncorrectPath = (req, res, next) => {
    return Promise.reject({status: 404, msg: "404: endpoint not found"}).then(() => {
    }).catch((err) => {
      next(err)
    })
}