import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    const connect = () => {
      setIsConnected(true);
      
      // Simulate real-time data updates
      const interval = setInterval(() => {
        setData({
          liveUsers: Math.floor(Math.random() * 100) + 1200,
          activeOrders: Math.floor(Math.random() * 50) + 20,
          revenue: Math.floor(Math.random() * 5000) + 10000,
          systemHealth: Math.random() > 0.1 ? 'healthy' : 'degraded',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 3000);

      return () => clearInterval(interval);
    };

    const connection = connect();
    return () => {
      if (connection) connection();
      setIsConnected(false);
    };
  }, [url]);

  return { data, isConnected };
};