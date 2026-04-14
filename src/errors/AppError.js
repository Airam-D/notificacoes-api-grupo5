class AppError extends Error { //extends significa herança, ou seja recebe como herança
    constructor(mensagem, statusCode) {
        super(mensagem);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}

class NotFoundError extends AppError {
    constructor(recurso = "Recurso") {
        super(`${recurso} não encontrado(a)`, 404);
        this.name = "NotFoundError";
    }
}

class ValidationError extends AppError {
    constructor(mensagem) {
        super(mensagem, 400);
        this.name = "ValidationError";
    }
}
module.exports = { AppError, NotFoundError, ValidationError };