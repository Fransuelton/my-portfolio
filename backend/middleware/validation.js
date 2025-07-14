import { body, validationResult } from 'express-validator';

/**
 * Regras de validação para o formulário de contato
 */
export const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
    
  body('email')
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email muito longo'),
    
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Mensagem deve ter entre 10 e 1000 caracteres')
];

/**
 * Middleware para verificar se há erros de validação
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

/**
 * Middleware para sanitizar dados de entrada
 */
export const sanitizeContactData = (req, res, next) => {
  const { name, email, message } = req.body;
  
  // Remover caracteres perigosos
  req.body = {
    name: name?.trim().replace(/[<>]/g, ''),
    email: email?.toLowerCase().trim(),
    message: message?.trim().replace(/[<>]/g, '')
  };
  
  next();
};
