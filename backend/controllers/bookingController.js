import pool from '../config/db.js';
import { sendBookingNotificationEmail } from '../utils/emailHelper.js';

// Helper to format database booking row to frontend schema
function formatBooking(row) {
  return {
    id: row.id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    clientNotes: row.client_notes,
    spaceType: row.space_type,
    designerId: row.designer_code || row.designer_id,
    designerName: row.designer_name || row.designerName || '',
    date: row.date,
    time: row.time,
    status: row.status,
    cost: row.cost
  };
}

// 1. GET CLIENT CONSULTATIONS
export async function getClientBookings(req, res) {
  const email = req.user.email;
  try {
    const query = `
      SELECT b.*, u.name as designer_name, dp.designer_code 
      FROM bookings b
      JOIN users u ON b.designer_id = u.id
      JOIN designer_profiles dp ON u.id = dp.user_id
      WHERE b.client_email = ?
      ORDER BY b.created_at DESC
    `;
    const [rows] = await pool.query(query, [email]);
    const formatted = rows.map(formatBooking);
    return res.status(200).json({ success: true, bookings: formatted });
  } catch (error) {
    console.error('Fetch client bookings failed:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving client bookings.' });
  }
}

// 2. GET DESIGNER CONSULTATIONS
export async function getDesignerBookings(req, res) {
  if (req.user.role !== 'designer') {
    return res.status(403).json({ success: false, message: 'Forbidden. Access restricted to designers.' });
  }

  const designerUserId = req.user.id;
  try {
    const query = `
      SELECT b.*, u.name as designer_name, dp.designer_code
      FROM bookings b
      JOIN users u ON b.designer_id = u.id
      JOIN designer_profiles dp ON u.id = dp.user_id
      WHERE b.designer_id = ?
      ORDER BY b.created_at DESC
    `;
    const [rows] = await pool.query(query, [designerUserId]);
    const formatted = rows.map(formatBooking);
    return res.status(200).json({ success: true, bookings: formatted });
  } catch (error) {
    console.error('Fetch designer bookings failed:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving designer bookings.' });
  }
}

// 3. CREATE CONSULTATION BOOKING
export async function createBooking(req, res) {
  const { clientName, clientEmail, clientPhone, clientNotes, spaceType, designerId, date, time, cost } = req.body;

  if (!clientName || !clientEmail || !clientPhone || !spaceType || !designerId || !date || !time || !cost) {
    return res.status(400).json({ success: false, message: 'Missing required booking parameters.' });
  }

  try {
    // Look up designer user and profile details based on designer code (e.g. 'aria-chen')
    const [designerInfo] = await pool.query(`
      SELECT dp.user_id, u.email, u.name as designer_name
      FROM designer_profiles dp
      JOIN users u ON dp.user_id = u.id
      WHERE dp.designer_code = ?
    `, [designerId]);

    if (designerInfo.length === 0) {
      return res.status(404).json({ success: false, message: `Designer with code "${designerId}" not found.` });
    }

    const { user_id: designerUserId, email: designerEmail, designer_name: designerName } = designerInfo[0];

    const query = `
      INSERT INTO bookings (client_name, client_email, client_phone, client_notes, space_type, designer_id, date, time, status, cost)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled', ?)
    `;
    const [result] = await pool.query(query, [
      clientName,
      clientEmail.toLowerCase().trim(),
      clientPhone,
      clientNotes || null,
      spaceType,
      designerUserId,
      date,
      time,
      cost
    ]);

    // Send email notification to designer (does not block client response)
    sendBookingNotificationEmail({
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
      spaceType,
      date,
      time,
      cost
    }, designerEmail, designerName).catch(err => {
      console.error('Designer email notification failed:', err);
    });

    return res.status(201).json({
      success: true,
      booking: {
        id: result.insertId,
        clientName,
        clientEmail,
        clientPhone,
        clientNotes,
        spaceType,
        designerId,
        date,
        time,
        status: 'Scheduled',
        cost
      }
    });
  } catch (error) {
    console.error('Create booking failed:', error);
    return res.status(500).json({ success: false, message: 'Server error during booking creation.' });
  }
}

// 4. UPDATE BOOKING STATUS (Designer actions)
export async function updateBookingStatus(req, res) {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status field is required.' });
  }

  const allowedStatuses = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status type value.' });
  }

  try {
    // If designer, verify they are the assigned designer
    let query = 'UPDATE bookings SET status = ? WHERE id = ?';
    let params = [status, bookingId];

    if (req.user.role === 'designer') {
      query = 'UPDATE bookings SET status = ? WHERE id = ? AND designer_id = ?';
      params = [status, bookingId, req.user.id];
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found or access denied.' });
    }

    return res.status(200).json({ success: true, message: 'Booking status updated successfully.' });
  } catch (error) {
    console.error('Update booking status failed:', error);
    return res.status(500).json({ success: false, message: 'Server error updating booking status.' });
  }
}

// 5. CANCEL BOOKING (Client action)
export async function cancelBooking(req, res) {
  const bookingId = req.params.id;

  try {
    // Clients can cancel their bookings. We match client email or restrict by email
    let query = 'UPDATE bookings SET status = "Cancelled" WHERE id = ?';
    let params = [bookingId];

    if (req.user.role === 'client') {
      query = 'UPDATE bookings SET status = "Cancelled" WHERE id = ? AND client_email = ?';
      params = [bookingId, req.user.email];
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found or access denied.' });
    }

    return res.status(200).json({ success: true, message: 'Booking cancelled successfully.' });
  } catch (error) {
    console.error('Cancel booking failed:', error);
    return res.status(500).json({ success: false, message: 'Server error cancelling booking.' });
  }
}
