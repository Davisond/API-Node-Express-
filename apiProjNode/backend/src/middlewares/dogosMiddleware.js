const validateBody = (request, response, next) => { //funcao valida requisição
    const { body } = request;

    //name é obrigatório
    if (body.name == undefined){
        return response.status(400).json({message: 'NAME REQUIRED'});
    }

    if (body.name == ''){
        return response.status(400).json({message: 'NAME REQUIRED'});   
    }

    next(); //tudo ok? next middleware
};

module.exports = {
    validateBody,
};