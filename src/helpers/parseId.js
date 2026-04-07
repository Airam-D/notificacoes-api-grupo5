function parseId(valor) {
    const id = parseInt(valor);
    if (isNaN(id)) {
        const { ValidationError } = require("../errors/AppError");
        throw new ValidationError("ID deve ser um número válido");
    }
    return id;
}

module.exports = parseId;