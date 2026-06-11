import { createContext, useState, useEffect, useContext } from 'react';
import { designersData } from '../data/designersData';

export const AuthContext = createContext(null);

// Default mock bookings for Eleanor Vance (client@luxe.com)
const DEFAULT_CLIENT_BOOKINGS = [
  {
    id: 'booking-mock-1',
    clientEmail: 'client@luxe.com',
    clientName: 'Eleanor Vance',
    spaceType: 'Living Room',
    designerId: 'aria-chen',
    designerName: 'Aria Chen',
    date: 'Jun 18, 2026',
    time: '02:00 PM',
    status: 'Scheduled',
    cost: '₹4,32,000'
  },
  {
    id: 'booking-mock-2',
    clientEmail: 'client@luxe.com',
    clientName: 'Eleanor Vance',
    spaceType: 'Gourmet Kitchen',
    designerId: 'julian-mercer',
    designerName: 'Julian Mercer',
    date: 'Jul 05, 2026',
    time: '11:30 AM',
    status: 'Completed',
    cost: '₹9,72,000'
  }
];

// Default mock bookings for designers
const DEFAULT_DESIGNER_BOOKINGS = [
  {
    id: 'booking-mock-1', // Shared with Eleanor Vance
    clientEmail: 'client@luxe.com',
    clientName: 'Eleanor Vance',
    spaceType: 'Living Room',
    designerId: 'aria-chen',
    designerName: 'Aria Chen',
    date: 'Jun 18, 2026',
    time: '02:00 PM',
    status: 'Scheduled',
    cost: '₹4,32,000'
  },
  {
    id: 'booking-mock-3',
    clientEmail: 'kabir@outlook.com',
    clientName: 'Kabir Malhotra',
    spaceType: 'Bedroom Sanctuary',
    designerId: 'aria-chen',
    designerName: 'Aria Chen',
    date: 'Jun 20, 2026',
    time: '03:30 PM',
    status: 'Scheduled',
    cost: '₹3,00,000'
  },
  {
    id: 'booking-mock-4',
    clientEmail: 'priya@gmail.com',
    clientName: 'Priya Sharma',
    spaceType: 'Full Residence',
    designerId: 'julian-mercer',
    designerName: 'Julian Mercer',
    date: 'Jun 22, 2026',
    time: '10:00 AM',
    status: 'Scheduled',
    cost: '₹21,60,000'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registeredClients, setRegisteredClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [designersList, setDesignersList] = useState(designersData);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('luxe_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.email && parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('luxe_user');
        }
      }
    } catch (e) {
      console.error('Failed to parse saved user:', e);
      localStorage.removeItem('luxe_user');
    }

    try {
      const savedClients = localStorage.getItem('luxe_clients');
      if (savedClients) {
        setRegisteredClients(JSON.parse(savedClients));
      } else {
        const initialClients = [
          {
            name: 'Eleanor Vance',
            email: 'client@luxe.com',
            password: 'password',
            preferredStyle: 'Japandi Minimalism',
            styleId: 'japandi'
          }
        ];
        setRegisteredClients(initialClients);
        localStorage.setItem('luxe_clients', JSON.stringify(initialClients));
      }
    } catch (e) {
      console.error('Failed to parse saved clients:', e);
    }

    try {
      const savedBookings = localStorage.getItem('luxe_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        const initialBookings = [...DEFAULT_CLIENT_BOOKINGS, ...DEFAULT_DESIGNER_BOOKINGS.filter(b => b.id !== 'booking-mock-1')];
        setBookings(initialBookings);
        localStorage.setItem('luxe_bookings', JSON.stringify(initialBookings));
      }
    } catch (e) {
      console.error('Failed to parse saved bookings:', e);
    }

    try {
      const savedDesigners = localStorage.getItem('luxe_designers');
      if (savedDesigners) {
        setDesignersList(JSON.parse(savedDesigners));
      }
    } catch (e) {
      console.error('Failed to parse saved designers:', e);
    }
  }, []);

  // Login handler
  const login = (email, password, role) => {
    const sanitizedEmail = email.toLowerCase().trim();

    if (role === 'designer') {
      // Find designer by matching the email prefix (e.g., aria -> aria-chen)
      const emailPrefix = sanitizedEmail.split('@')[0];
      const designer = designersList.find(d => 
        d.id.toLowerCase().includes(emailPrefix) || d.name.toLowerCase().includes(emailPrefix)
      ) || designersList[0]; // Fallback to first designer for testing

      const designerUser = {
        name: designer.name,
        email: sanitizedEmail,
        role: 'designer',
        designerId: designer.id,
        details: designer
      };

      setUser(designerUser);
      localStorage.setItem('luxe_user', JSON.stringify(designerUser));
      return { success: true };
    } else {
      // Find client in registered list
      const client = registeredClients.find(c => c.email.toLowerCase() === sanitizedEmail);

      if (client) {
        if (client.password === password || password === 'password') { // allow 'password' as fallback
          const clientUser = {
            name: client.name,
            email: client.email,
            role: 'client',
            preferredStyle: client.preferredStyle,
            styleId: client.styleId
          };
          setUser(clientUser);
          localStorage.setItem('luxe_user', JSON.stringify(clientUser));
          return { success: true };
        } else {
          return { success: false, message: 'Invalid password' };
        }
      } else {
        // Auto-register client for easy demo testing
        const newClient = {
          name: sanitizedEmail.split('@')[0].replace(/^\w/, c => c.toUpperCase()),
          email: sanitizedEmail,
          password: password || 'password',
          preferredStyle: 'Modern Luxury',
          styleId: 'modern'
        };
        const updatedClients = [...registeredClients, newClient];
        setRegisteredClients(updatedClients);
        localStorage.setItem('luxe_clients', JSON.stringify(updatedClients));

        const clientUser = {
          name: newClient.name,
          email: newClient.email,
          role: 'client',
          preferredStyle: newClient.preferredStyle,
          styleId: newClient.styleId
        };
        setUser(clientUser);
        localStorage.setItem('luxe_user', JSON.stringify(clientUser));
        return { success: true };
      }
    }
  };

  // Signup handler
  const signup = (name, email, password, preferredStyle) => {
    const sanitizedEmail = email.toLowerCase().trim();
    const styleMap = {
      'Japandi Minimalism': 'japandi',
      'Modern Luxury': 'modern',
      'Classic Parisian': 'parisian',
      'Mid-Century Organic': 'midcentury'
    };

    if (registeredClients.some(c => c.email.toLowerCase() === sanitizedEmail)) {
      return { success: false, message: 'Email already registered' };
    }

    const newClient = {
      name,
      email: sanitizedEmail,
      password: password || 'password',
      preferredStyle,
      styleId: styleMap[preferredStyle] || 'modern'
    };

    const updatedClients = [...registeredClients, newClient];
    setRegisteredClients(updatedClients);
    localStorage.setItem('luxe_clients', JSON.stringify(updatedClients));

    const clientUser = {
      name: newClient.name,
      email: newClient.email,
      role: 'client',
      preferredStyle: newClient.preferredStyle,
      styleId: newClient.styleId
    };
    setUser(clientUser);
    localStorage.setItem('luxe_user', JSON.stringify(clientUser));
    return { success: true };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxe_user');
  };

  // Add a new consultation booking
  const addBooking = (bookingData) => {
    const newBooking = {
      id: `booking-${Date.now()}`,
      status: 'Scheduled',
      ...bookingData
    };
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
    return newBooking;
  };

  // Cancel a booking (Client side)
  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
  };

  // Update booking status (Designer side)
  const updateBookingStatus = (bookingId, status) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
  };

  // Update designer bio & rates (Designer side profile editing)
  const updateDesignerProfile = (designerId, updatedData) => {
    const updatedDesigners = designersList.map(d => {
      if (d.id === designerId) {
        const newD = { ...d, ...updatedData };
        // If logged in designer matches, update active user details
        if (user && user.role === 'designer' && user.designerId === designerId) {
          const updatedUser = { ...user, details: newD, name: newD.name };
          setUser(updatedUser);
          localStorage.setItem('luxe_user', JSON.stringify(updatedUser));
        }
        return newD;
      }
      return d;
    });

    setDesignersList(updatedDesigners);
    localStorage.setItem('luxe_designers', JSON.stringify(updatedDesigners));
  };

  const value = {
    user,
    bookings,
    designersList,
    login,
    signup,
    logout,
    addBooking,
    cancelBooking,
    updateBookingStatus,
    updateDesignerProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
