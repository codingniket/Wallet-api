import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req.ip);
    if (!success) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    next();
  } catch (error) {
    console.log("Error from RateLimiter File", error);
    next(error);
  }
};

export default rateLimiter;
