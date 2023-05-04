const { Router } = require('express');
const userRouter = require('./User');
const messageRouter = require('./Messages');
const verifyToken = require('../middlewares/verify-token');
const router = Router();

router.use('/user', userRouter);
router.use('/messages', messageRouter);

router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "API funcionando" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;
