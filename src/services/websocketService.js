import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.subscriptions = {};
  }

  connect(url = 'http://localhost:8080/ws') {
    return new Promise((resolve, reject) => {
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket);

      // Disable debug output
      this.stompClient.debug = () => {};

      this.stompClient.connect(
        {},
        (frame) => {
          console.log('✅ WebSocket Connected:', frame);
          this.connected = true;
          resolve(frame);
        },
        (error) => {
          console.error('❌ WebSocket Error:', error);
          this.connected = false;
          reject(error);
        }
      );
    });
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.disconnect(() => {
        console.log('🔌 WebSocket Disconnected');
        this.connected = false;
      });
    }
  }

  subscribe(topic, callback) {
    if (!this.connected) {
      console.error('WebSocket not connected');
      return null;
    }

    const subscription = this.stompClient.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions[topic] = subscription;
    return subscription;
  }

  unsubscribe(topic) {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].unsubscribe();
      delete this.subscriptions[topic];
    }
  }

  send(destination, body = {}) {
    if (!this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.stompClient.send(destination, {}, JSON.stringify(body));
  }

  isConnected() {
    return this.connected;
  }
}

export default new WebSocketService();
