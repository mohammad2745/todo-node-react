const Joi = require('joi');

const todoValidate = (body) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Title is required.',
      'any.required': 'Title is required.',
    }),
    description: Joi.string().allow(''),
    due_date: Joi.date()
      .allow(null)
      .greater('now')
      .messages({
        'date.base': 'Due date must be a valid date.',
        'date.greater': 'Due date must be in the future.',
      }),
    status: Joi.string().valid('pending', 'completed', 'canceled').default('pending').messages({
      'any.only': 'Status must be one of pending, completed, or canceled.',
    }),
    priority: Joi.string().valid('low', 'medium', 'high').default('low').messages({
      'any.only': 'Priority must be one of low, medium, or high.',
    }),
  });

  const { error } = schema.validate(body, { abortEarly: false }); // Gather all errors
  return error;
};

module.exports = { todoValidate };
