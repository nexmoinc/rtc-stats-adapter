const Joi = require("joi");

const metadataSchema = Joi.object({
  legId: Joi.string().required(),
});

// Core set of RTC Stats that is implemented well X-Browser
const statsSchema = Joi.object({
  audioRecvBytes: Joi.number().integer().positive().allow(0).required(),
  audioRecvPackets: Joi.number().integer().positive().allow(0).required(),
  audioRecvPacketsLost: Joi.number().integer().positive().allow(0).required(),
  audioRtt: Joi.number().positive().allow(0).required(),
  audioSentBytes: Joi.number().integer().positive().allow(0).required(),
  audioSentPackets: Joi.number().integer().positive().allow(0).required(),
  audioSentPacketsLost: Joi.number()
    .integer()
    .positive()
    .allow(0)
    .allow(null)
    .required(),
  audioSentJitter: Joi.number().positive().allow(0, null).required(),
  audioRecvJitter: Joi.number().positive().allow(0, null).required(),
  networkMos: Joi.number().positive().allow(0).required(),
});

// The schema when we send data for ingestion
const eventSchema = metadataSchema.concat(statsSchema);

module.exports = {
  rtcStats: statsSchema,
  event: eventSchema,
};
