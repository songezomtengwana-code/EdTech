'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({

    /**
     * Create a new course.
     * Modified to associate the course with the authenticated user (owner)
     */
    async create(ctx) {
        const { data } = ctx.request.body;

        try {
            // Attach the logged-in user as the owner of the course.
            const updatedData = {
                ...data,
                owner: ctx.state.user.id
            };

            const entity = await strapi.entityService.create('api::course.course', {
                data: updatedData,
                populate: ['owner']
            });

            return { data: entity };
        } catch (error) {
            return ctx.badRequest('Failed to create course', { error: error.message });
        }
    },

    /**
     * Fetch all courses for the authenticated user.
     * Ensures only the courses belonging to the logged-in user are returned.
     */
    async find(ctx) {
        if (!ctx.state.user) {
            return ctx.unauthorized('You must be logged in');
        }

        const { query } = ctx;

        // Restrict results to only courses owned by the authenticated user.
        const updatedQuery = {
            ...query,
            filters: {
                ...(query.filters || {}),
                $and: [
                    {
                        owner: {
                            id: {
                                $eq: ctx.state.user.id
                            }
                        }
                    }
                ]
            },
            populate: {
                ...(query.populate || {}),
            }
        };

        ctx.query = updatedQuery;

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));
