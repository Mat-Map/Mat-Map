// src/middleware/validateRequest.js
// Generic zod-based validator. Usage:
//   router.get('/fares', validateQuery(faresQuerySchema), controller.getFares)

export function validateQuery(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                error: {
                    message: 'Invalid query parameters',
                    statusCode: 400,
                    details: result.error.flatten().fieldErrors,
                },
            });
        }
        req.validatedQuery = result.data;
        next();
    };
}

export function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({
                error: {
                    message: 'Invalid route parameters',
                    statusCode: 400,
                    details: result.error.flatten().fieldErrors,
                },
            });
        }
        req.validatedParams = result.data;
        next();
    };
}