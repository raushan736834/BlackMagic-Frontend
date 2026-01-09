import { useState, useEffect, useCallback, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const useWebSocket = (url = 'http://localhost:8080/ws') => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const stompClientRef = useRef(null);
  const subscriptionsRef = useRef({});

  const connect = useCallback(() => {
    try {
      const socket = new SockJS(url);
      const stompClient = Stomp.over(socket);

      // Disable debug output
      stompClient.debug = () => {};

      stompClient.connect(
        {},
        (frame) => {
          console.log('✅ WebSocket Connected:', frame);
          setConnected(true);
          setError(null);
          stompClientRef.current = stompClient;
        },
        (err) => {
          console.error('❌ WebSocket Error:', err);
          setConnected(false);
          setError(err);
          
          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            if (!connected) {
              console.log('🔄 Attempting to reconnect...');
              connect();
            }
          }, 5000);
        }
      );
    } catch (err) {
      console.error('WebSocket connection error:', err);
      setError(err);
    }
  }, [url, connected]);

  const disconnect = useCallback(() => {
    if (stompClientRef.current && connected) {
      // Unsubscribe from all topics
      Object.values(subscriptionsRef.current).forEach(sub => {
        sub.unsubscribe();
      });
      subscriptionsRef.current = {};

      stompClientRef.current.disconnect(() => {
        console.log('🔌 WebSocket Disconnected');
        setConnected(false);
      });
    }
  }, [connected]);

  const subscribe = useCallback((topic, callback) => {
    if (!connected || !stompClientRef.current) {
      console.warn('WebSocket not connected. Cannot subscribe.');
      return null;
    }

    const subscription = stompClientRef.current.subscribe(topic, (message) => {
      try {
        const data = JSON.parse(message.body);
        callback(data);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    });

    subscriptionsRef.current[topic] = subscription;
    return subscription;
  }, [connected]);

  const unsubscribe = useCallback((topic) => {
    if (subscriptionsRef.current[topic]) {
      subscriptionsRef.current[topic].unsubscribe();
      delete subscriptionsRef.current[topic];
    }
  }, []);

  const send = useCallback((destination, body = {}) => {
    if (!connected || !stompClientRef.current) {
      console.warn('WebSocket not connected. Cannot send message.');
      return;
    }

    try {
      stompClientRef.current.send(destination, {}, JSON.stringify(body));
    } catch (err) {
      console.error('Error sending WebSocket message:', err);
    }
  }, [connected]);

  // Auto-connect on mount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connected,
    error,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    send
  };
};