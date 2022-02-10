module.exports = app => {
    const service = require("../controllers/services.controller");

    app.post("/services/", service.create);
    app.get("/services/", service.findAll);
    app.get("/services/:user_id", service.findOne);
    app.delete("/services/:id", service.deleteById);
};