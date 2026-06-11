import { useState, useEffect } from 'react';
import { designersData } from '../data/designersData';
import { AuthContext } from './AuthContextCore';

const API_URL = 'http://localhost:5000/api';

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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registeredClients, setRegisteredClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [designersList, setDesignersList] = useState(designersData);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Helper to get Auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('luxe_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  // Synchronize and initialize state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('luxe_token');
      
      if (token) {
        try {
          // Attempt connection to Express API
          const res = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();

          if (res.ok && data.success) {
            setUser(data.user);
            setIsBackendOnline(true);
            
            // Load bookings from API
            const bookingPath = data.user.role === 'designer' ? 'bookings/designer' : 'bookings/client';
            const bRes = await fetch(`${API_URL}/${bookingPath}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const bData = await bRes.json();
            if (bRes.ok && bData.success) {
              setBookings(bData.bookings);
            }
            return;
          }
        } catch (error) {
          console.warn('⚠️ LuxeAPI offline. Falling back to offline client mock mode.');
        }
      }

      // FALLBACK TO LOCAL STORAGE MOCK
      setIsBackendOnline(false);
      try {
        const savedUser = localStorage.getItem('luxe_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.email && parsedUser.role) {
            setUser(parsedUser);
          }
        }
      } catch (e) {
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
        console.error(e);
      }

      try {
        const savedBookings = localStorage.getItem('luxe_bookings');
        if (savedBookings) {
          setBookings(JSON.parse(savedBookings));
        } else {
          setBookings(DEFAULT_CLIENT_BOOKINGS);
          localStorage.setItem('luxe_bookings', JSON.stringify(DEFAULT_CLIENT_BOOKINGS));
        }
      } catch (e) {
        console.error(e);
      }

      try {
        const savedDesigners = localStorage.getItem('luxe_designers');
        if (savedDesigners) {
          setDesignersList(JSON.parse(savedDesigners));
        }
      } catch (e) {
        console.error(e);
      }
    };

    initializeAuth();
  }, []);

  // LOGIN
  const login = async (email, password, role) => {
    // 1. Attempt Backend Server Connection
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('luxe_token', data.token);
        setUser(data.user);
        setIsBackendOnline(true);

        // Fetch bookings for this user session
        const bookingPath = data.user.role === 'designer' ? 'bookings/designer' : 'bookings/client';
        const bRes = await fetch(`${API_URL}/${bookingPath}`, {
          headers: { 'Authorization': `Bearer ${data.token}` }
        });
        const bData = await bRes.json();
        if (bRes.ok && bData.success) {
          setBookings(bData.bookings);
        }
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (error) {
      console.warn('⚠️ Login Server Unreachable. Executing Offline Mock login.');
    }

    // 2. Offline Fallback Mock Validation
    const sanitizedEmail = email.toLowerCase().trim();
    if (role === 'designer') {
      const emailPrefix = sanitizedEmail.split('@')[0];
      const designer = designersList.find(d => 
        d.id.toLowerCase().includes(emailPrefix) || d.name.toLowerCase().includes(emailPrefix)
      ) || designersList[0];

      const designerUser = {
        name: designer.name,
        email: sanitizedEmail,
        role: 'designer',
        designerId: designer.id,
        details: designer
      };

      setUser(designerUser);
      localStorage.setItem('luxe_user', JSON.stringify(designerUser));
      setIsBackendOnline(false);
      return { success: true };
    } else {
      const client = registeredClients.find(c => c.email.toLowerCase() === sanitizedEmail);
      if (client) {
        if (client.password === password || password === 'password') {
          const clientUser = {
            name: client.name,
            email: client.email,
            role: 'client',
            preferredStyle: client.preferredStyle,
            styleId: client.styleId
          };
          setUser(clientUser);
          localStorage.setItem('luxe_user', JSON.stringify(clientUser));
          setIsBackendOnline(false);
          return { success: true };
        } else {
          return { success: false, message: 'Invalid credentials.' };
        }
      } else {
        // Auto register client
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
        setIsBackendOnline(false);
        return { success: true };
      }
    }
  };

  // SIGNUP
  const signup = async (name, email, password, role = 'client', preferredStyle = 'Modern Luxury', designerData = {}) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          preferredStyle,
          city: designerData.city,
          styleSpecialty: designerData.styleSpecialty,
          experience: designerData.experience,
          startingRate: designerData.startingRate,
          bio: designerData.bio
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('luxe_token', data.token);
        setUser(data.user);
        setBookings([]); // New user starts with no bookings
        setIsBackendOnline(true);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (error) {
      console.warn('⚠️ Signup Server Unreachable. Executing Offline Mock registration.');
    }

    // Offline signup logic
    const sanitizedEmail = email.toLowerCase().trim();
    
    if (role === 'designer') {
      const designerCode = name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');
        
      const designerUser = {
        name,
        email: sanitizedEmail,
        role: 'designer',
        designerId: designerCode,
        details: {
          id: designerCode,
          name,
          role: 'Design Specialist',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          city: designerData.city || 'Bangalore',
          style: designerData.styleSpecialty || 'Japandi Minimalism',
          rating: 5.0,
          reviewsCount: 0,
          experience: designerData.experience || '3 Years',
          startingRate: Number(designerData.startingRate) || 12000,
          bio: designerData.bio || ''
        }
      };
      
      setUser(designerUser);
      localStorage.setItem('luxe_user', JSON.stringify(designerUser));
      setIsBackendOnline(false);
      return { success: true };
    } else {
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
      setIsBackendOnline(false);
      return { success: true };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem('luxe_user');
    localStorage.removeItem('luxe_token');
  };

  // CREATE CONSULTATION BOOKING
  const addBooking = async (bookingData) => {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_URL}/bookings`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(bookingData)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setBookings(prev => [data.booking, ...prev]);
          return data.booking;
        }
      } catch (error) {
        console.error('Failed to save booking to server:', error);
      }
    }

    // Offline mock fallback
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

  // CANCEL BOOKING (Client action)
  const cancelBooking = async (bookingId) => {
    if (isBackendOnline && !String(bookingId).startsWith('booking-')) {
      try {
        const res = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
          return;
        }
      } catch (error) {
        console.error('Failed to sync cancellation with server:', error);
      }
    }

    // Offline mock fallback
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
  };

  // UPDATE STATUS (Designer action)
  const updateBookingStatus = async (bookingId, status) => {
    if (isBackendOnline && !String(bookingId).startsWith('booking-')) {
      try {
        const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
          return;
        }
      } catch (error) {
        console.error('Failed to sync status update with server:', error);
      }
    }

    // Offline mock fallback
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
  };

  // UPDATE DESIGNER PROFILE SETTINGS (Designer action)
  const updateDesignerProfile = async (designerId, updatedData) => {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_URL}/auth/designer/profile`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            bio: updatedData.bio,
            startingRate: updatedData.startingRate,
            role: updatedData.role
          })
        });
        const data = await res.json();
        
        if (res.ok && data.success) {
          // Profile matches, details in state will update
          const newD = { 
            ...user.details, 
            bio: updatedData.bio,
            startingRate: updatedData.startingRate,
            role: updatedData.role
          };
          setUser(prev => ({ ...prev, name: newD.name, details: newD }));
          setDesignersList(prev => prev.map(d => d.id === designerId ? newD : d));
          return;
        }
      } catch (error) {
        console.error('Failed to update designer profile on server:', error);
      }
    }

    // Offline mock fallback
    const updatedDesigners = designersList.map(d => {
      if (d.id === designerId) {
        const newD = { ...d, ...updatedData };
        if (user && user.role === 'designer' && user.designerId === designerId) {
          setUser(prev => ({ ...prev, details: newD, name: newD.name }));
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
    isBackendOnline,
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
