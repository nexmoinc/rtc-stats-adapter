const Joi = require('joi');

const metadataSchema = Joi.object({
    legId: Joi.string.required(),
    owner: Joi.string().valid("nexmo").required()
})

// Core set of RTC Stats that is implemented well X-Browser
const statsSchema = Joi.object({
    audioRecvBytes: Joi.number()
        .integer()
        .positive()
        .required(),

    audioRecvPackets: Joi.number()
        .integer()
        .positive()
        .required(),

    audioRecvPacketsLost: Joi.number()
        .integer()
        .positive()
        .required(),

    audioRtt: Joi.number()
        .positive()
        .required(),

    audioSentBytes: Joi.number()
        .integer()
        .positive()
        .required(),

    audioSentPackets: Joi.number()
        .integer()
        .positive()
        .required(),

    audioSentPacketsLost: Joi.number()
        .integer()
        .positive()
        .required(),
})

// The schema when we send data for ingestion  
const eventSchema = Joi.object({}).append(metadataSchema).append(statsSchema)

module.exports = {
    rtcStats: statsSchema,
    event: eventSchema
}