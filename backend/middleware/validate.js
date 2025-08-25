module.exports = function validate(req, res, next){
    const { title, description, priority, completed } = req.body || {};
    if (typeof title !== 'string' || title.trim().length <= 0) {
        return res.status(400).json({ error: 'title is required and must be a non-empty string' });
    }
    if (typeof description !== 'string') {
        return res.status(400).json({ error: 'description must be a string' });
    }
    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: "priority must be 'low' or 'medium' or 'high'" });
    }
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed must be a boolean' });
    }
    next();
};