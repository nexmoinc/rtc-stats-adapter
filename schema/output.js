const Joi = require('joi');

const metadataSchema = Joi.object({
    // All Metadata is optional as it 
    conversationId: Joi.string.optional(),
    legId: Joi.string.optional(),
    sessionId: Joi.string.optional(),
    owner: Joi.string().valid("nexmo")
})

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

const finalSchema = Joi.object({}).append(metadataSchema).append(statsSchema)