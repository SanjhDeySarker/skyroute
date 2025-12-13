const { Server } = require("socket.io");
const ChatMessage = require("../models/ChatMessage");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function initChatSocket(server) {
  const io = new Server(server, { cors: { origin: "*" }});
  const nsp = io.of("/chat");

  nsp.use(async (socket, next) => {
    // Optionally authenticate socket via token: socket.handshake.auth.token
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = await User.findById(decoded.id).select("-passwordHash");
      } catch (err) { /* ignore - allow guest? */ }
    }
    next();
  });

  nsp.on("connection", (socket) => {
    // join support room
    socket.on("joinSupport", ({ userId }) => {
      const room = `support:${userId}`;
      socket.join(room);
    });

    socket.on("sendMessage", async ({ roomId, message }) => {
      const msg = await ChatMessage.create({
        roomId,
        from: socket.user?._id || null,
        message,
        toAdmin: !socket.user?.role || socket.user.role !== "admin"
      });
      // broadcast to room
      nsp.to(roomId).emit("message", msg);
    });

    socket.on("disconnect", () => {
      // handle presence
    });
  });

  console.log("Chat socket initialized");
};
