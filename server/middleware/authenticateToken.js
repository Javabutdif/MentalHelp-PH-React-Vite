const jwt = require("jsonwebtoken");
const token_key = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	jwt.verify(token, token_key, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden" });
		}

		req.data = decoded.data || null;

		next();
	});
};

module.exports = authenticateToken;
