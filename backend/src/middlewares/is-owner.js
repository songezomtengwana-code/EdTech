module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized(`You're not logged in`);
        }

        if (ctx.request.method === "GET" && !ctx.params.id) {
            ctx.query.filters = {
                ...(ctx.query.filters || {}),
                $and: [
                    {
                        owner: {
                            id: {
                                $eq: user.id
                            }
                        }
                    }
                ]
            };

            console.log('All courses requested with filters:', ctx.query.filters);
            return await next();
        }

        const courseId = ctx.params.id;
        if (!courseId) {
            return ctx.badRequest('Course ID is required');
        }

        try {
            const course = await strapi.service('api::course.course').findOne(courseId, {
                populate: ['owner'],
            });

            if (!course) {
                return ctx.notFound('You are not authorized to access this course');
            }

            if (!course || !course.owner || course.owner.id !== user.id) {
                return ctx.forbidden('You are not authorized to access this course');
            }

            return await next();
        } catch (err) {
            strapi.log.error(err);
            return ctx.internalServerError('An error occurred');
        }
    };
};