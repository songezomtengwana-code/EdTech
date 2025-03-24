'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({
    async create(ctx) {
        const { data } = ctx.request.body;

        try {
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

    async find(ctx) {
        if (!ctx.state.user) {
            return ctx.unauthorized('You must be logged in');
        }

        const isAdmin = ctx.state.user.roles &&
            ctx.state.user.roles.some(role => role.code === 'strapi-super-admin');

        if (isAdmin) {
            const { data, meta } = await super.find(ctx);
            return { data, meta };
        }

        const { query } = ctx;
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
                owner: true
            }
        };

        ctx.query = updatedQuery;

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));