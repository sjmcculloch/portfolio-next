const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://portfolio-sm.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://portfolio-sm.herokuapp.com",
  "process.env.CLIENT_ID": "VciEgFSYaIjI8H5vE021v8NSnzrcL9fT"
};
