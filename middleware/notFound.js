const notFound = (req,res) => res.status(404).send("Route not found! It doesnot exist")

module.exports = notFound