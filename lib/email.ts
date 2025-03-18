import emailjs from '@emailjs/browser';

const serviceId = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID || '';
const publicKey = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const adminEmail = process.env.EXPO_PUBLIC_ADMIN_EMAIL || '';

export const sendOrderNotification = async (orderDetails: any) => {
  try {
    await emailjs.send(
      serviceId,
      process.env.EXPO_PUBLIC_EMAILJS_ORDER_NOTIFICATION_TEMPLATE_ID || '',
      {
        to_email: adminEmail,
        order_details: JSON.stringify(orderDetails, null, 2),
        customer_name: orderDetails.name,
        customer_email: orderDetails.email,
        customer_phone: orderDetails.phone,
        delivery_address: orderDetails.address,
        total_amount: orderDetails.total,
        payment_method: orderDetails.paymentMethod,
      },
      publicKey
    );
  } catch (error) {
    console.error('Failed to send order notification:', error);
    throw error;
  }
};

export const sendBookingNotification = async (bookingDetails: any) => {
  try {
    await emailjs.send(
      serviceId,
      process.env.EXPO_PUBLIC_EMAILJS_BOOKING_NOTIFICATION_TEMPLATE_ID || '',
      {
        to_email: adminEmail,
        booking_details: JSON.stringify(bookingDetails, null, 2),
        customer_name: bookingDetails.name,
        customer_email: bookingDetails.email,
        customer_phone: bookingDetails.phone,
        booking_date: bookingDetails.date,
        booking_time: bookingDetails.time,
        guests: bookingDetails.guests,
        special_requests: bookingDetails.specialRequests,
      },
      publicKey
    );
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    throw error;
  }
};

export const sendContactNotification = async (contactDetails: any) => {
  try {
    await emailjs.send(
      serviceId,
      process.env.EXPO_PUBLIC_EMAILJS_CONTACT_NOTIFICATION_TEMPLATE_ID || '',
      {
        to_email: adminEmail,
        contact_details: JSON.stringify(contactDetails, null, 2),
        customer_name: contactDetails.name,
        customer_email: contactDetails.email,
        message: contactDetails.message,
      },
      publicKey
    );
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    throw error;
  }
};