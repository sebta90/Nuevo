import ratelimit from "../config/Upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit");

        if(!success){
            return res.status(429).json({
                error: "Too many requests, please try again later."
            });
        }

        next();


    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
  }
}

export default rateLimiter;
