import aj from '../config/arcjet.js';

const arcjectmiddel = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        console.log("🧪 Decision:", {
            isDenied: decision.isDenied(),
            reason: decision.reason?.name,
            isRateLimit: decision.reason?.isRateLimit?.(),
            isBot: decision.reason?.isBot?.(),
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Rate Limit exceeded" });
            }
           
            return res.status(403).json({ error: "Access Denied" });
        }

        next();
    } catch (error) {
        console.error("❌ Arcjet Error:", error);
        next(error);
    }
};


export default arcjectmiddel;
