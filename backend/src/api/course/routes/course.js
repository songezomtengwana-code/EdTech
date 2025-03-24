'use strict';

/**
 * course router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::course.course', {
    config: {
        findOne: {
            middlewares: ['global::is-owner']
        },
        update: {
            middlewares: ['global::is-owner']
        },
        delete: {
            middlewares: ['global::is-owner']
        }
    }
});