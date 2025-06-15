import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "DRY_RUN" }), // ✅ won't block bots

    detectBot({
      mode: "DRY_RUN", // ✅ logs only, doesn't block
      allow: [
        "UA:Postman",
        "UA:PostmanRuntime",
        "UA:PostmanRuntime/7.39.0",
      ],
    }),

    tokenBucket({
      mode: "LIVE", // ✅ actively rate-limits
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
