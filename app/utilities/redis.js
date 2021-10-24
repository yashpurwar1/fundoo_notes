const redis = require('redis')
const client = redis.createClient()

/**
 * @module:         Redis
 * @file:           redis.js
 * @description:    Contains the cache info for getLabelById and getNoteById
 * @author:         Yash
*/

class Redis{
    getLabelById = (req, res, next) => {
        client.get(req.params.labelId, (error, result) => {
        if (error) {
            throw error;
        } else if (result) {
        res.status(200).send({
            message: 'Label successfully retrieved fom Redis',
            data: JSON.parse(result),
            success: true
        });
        } else {
        next();
        }
        });
    }

    getNoteById = (req, res, next) => {
        client.get(req.params.noteId, (error, result) => {
        if (error) {
            throw error;
        } else if (result) {
        res.status(200).send({
            message: 'Note successfully retrieved fom Redis',
            data: JSON.parse(result),
            success: true
        });
        } else {
        next();
        }
        });
    }
    setCache = (key, time, data) => {
        client.setex(key, time, data);
    };
    clearCache = (key) => {
        client.del(key)
    }
}
module.exports = new Redis()