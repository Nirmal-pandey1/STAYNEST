const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Welcome email after signup
module.exports.sendWelcomeEmail = async (userEmail, username) => {
  try {
    await transporter.sendMail({
      from: `"Travellust ✈️" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "Welcome to Travellust! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fe424d; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">✈️ Welcome to Travellust!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 0 0 8px 8px;">
            <h2>Hi ${username}! 👋</h2>
            <p>Welcome to Travellust — your home for amazing travel stays!</p>
            <ul>
              <li>🏠 Browse thousands of listings</li>
              <li>📍 Find places by location</li>
              <li>⭐ Leave reviews</li>
              <li>🏡 List your own property</li>
            </ul>
            <a href="https://travellust-c2wy.onrender.com/listings" 
               style="background:#fe424d; color:white; padding:0.75rem 2rem; border-radius:25px; text-decoration:none; display:inline-block; margin-top:1rem;">
              Start Exploring 🚀
            </a>
            <p style="margin-top:2rem; color:#888; font-size:0.85rem;">
              Happy travels! — The Travellust Team
            </p>
          </div>
        </div>
      `,
    });
    console.log("Welcome email sent to:", userEmail);
  } catch (err) {
    console.error("Email error:", err);
  }
};

// New listing email
module.exports.sendListingEmail = async (userEmail, username, listing) => {
  try {
    await transporter.sendMail({
      from: `"Travellust ✈️" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "Your listing is live on Travellust! 🏠",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fe424d; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🏠 Listing Created!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 0 0 8px 8px;">
            <h2>Hi ${username}! 👋</h2>
            <p>Your listing is now live on Travellust!</p>
            <div style="background:white; padding:1rem; border-radius:8px; border:1px solid #eee;">
              <h3 style="color:#fe424d;">${listing.title}</h3>
              <p>📍 ${listing.location}, ${listing.country}</p>
              <p>💰 ₹${listing.price}/night</p>
              <p>📝 ${listing.description}</p>
            </div>
            <a href="https://travellust-c2wy.onrender.com/listings" 
               style="background:#fe424d; color:white; padding:0.75rem 2rem; border-radius:25px; text-decoration:none; display:inline-block; margin-top:1rem;">
              View Your Listing 🚀
            </a>
            <p style="margin-top:2rem; color:#888; font-size:0.85rem;">
              Happy hosting! — The Travellust Team
            </p>
          </div>
        </div>
      `,
    });
    console.log("Listing email sent to:", userEmail);
  } catch (err) {
    console.error("Email error:", err);
  }
};

// Booking confirmation email to property owner
module.exports.sendBookingEmail = async (ownerEmail, ownerName, guestName, listing, booking) => {
  try {
    const checkInDate = new Date(booking.checkIn).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const days = Math.ceil(
      (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
    );

    await transporter.sendMail({
      from: `"StayNest 🏠" <${process.env.EMAIL}>`,
      to: ownerEmail,
      subject: `New Booking! 🎉 ${guestName} booked ${listing.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fe424d; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🎉 New Booking Received!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 0 0 8px 8px;">
            <h2>Hi ${ownerName}! 👋</h2>
            <p>Great news! Your property has been booked.</p>
            
            <div style="background:white; padding:1.5rem; border-radius:8px; border-left:4px solid #fe424d;">
              <h3 style="margin-top:0; color:#fe424d;">📍 Property Details</h3>
              <p><strong>${listing.title}</strong></p>
              <p>Location: ${listing.location}, ${listing.country}</p>
              <p style="margin-bottom:1rem;">Price: ₹${listing.price}/night</p>

              <h3 style="color:#fe424d;">👤 Guest Information</h3>
              <p><strong>Name:</strong> ${guestName}</p>

              <h3 style="color:#fe424d;">📅 Booking Dates</h3>
              <p><strong>Check-in:</strong> ${checkInDate}</p>
              <p><strong>Check-out:</strong> ${checkOutDate}</p>
              <p><strong>Duration:</strong> ${days} night${days > 1 ? "s" : ""}</p>
              <p style="background:#ffe6e6; padding:0.75rem; border-radius:4px;">
                <strong>Total Amount:</strong> ₹${booking.totalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            <p style="margin-top:1.5rem; color:#666;">
              Log in to your StayNest account to manage this booking and communicate with the guest.
            </p>
            
            <p style="margin-top:2rem; color:#888; font-size:0.85rem;">
              Best regards,<br/>
              The StayNest Team 🏠
            </p>
          </div>
        </div>
      `,
    });
    console.log("Booking email sent to:", ownerEmail);
  } catch (err) {
    console.error("Email error:", err);
  }
};