const ContactMessage = require("../model/ContactMessage");

exports.contactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res
      .status(500)
      .json({ error: "Failed to save message. Please try again later." });
  }
};
