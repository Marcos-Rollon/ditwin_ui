export class WebSocketClient {
  constructor(url) {
    this.url = url
    this.socket = null
    this.onConnected = null
    this.onDisconnected = null
    this.onError = null
    this.handlers = {}
    this._isReconnecting = false
    this._pendingSend = null
  }

  get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  connect(callback) {
    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      console.log('[WebSocket] Connected')
      this.onConnected?.()
      if (callback) callback(true)

      // Retry pending send if any
      if (this._pendingSend) {
        const { type, data } = this._pendingSend
        this._pendingSend = null
        this.send(type, data)
      }
    }

    this.socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        const type = msg.type
        if (type && this.handlers[type]) {
          this.handlers[type](msg.data)
        } else {
          console.warn(`[WebSocket] Unhandled message type: ${type}`, msg)
        }
      } catch (err) {
        console.error('[WebSocket] Failed to parse message:', err)
        console.error('The message was:', event.data)
      }
    }

    this.socket.onclose = () => {
      console.log('[WebSocket] Disconnected')
      this.onDisconnected?.()
      if (callback) callback(false)
    }

    this.socket.onerror = (err) => {
      console.error('[WebSocket] Error:', err)
      this.onError?.(err)
    }
  }

  send(type, data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, data }))
    } else if (!this._isReconnecting) {
      console.warn('[WebSocket] Socket not open, attempting one reconnect...')
      this._isReconnecting = true
      this._pendingSend = { type, data }
      this.connect((success) => {
        this._isReconnecting = false
        if (!success) {
          console.warn('[WebSocket] Reconnect failed, message not sent')
          this._pendingSend = null
        }
      })
    } else {
      console.warn('[WebSocket] Already retrying, message skipped')
    }
  }

  on(type, handler) {
    this.handlers[type] = handler
  }

  close() {
    this.socket?.close()
  }
}

// export class WebSocketClient {
//   constructor(url) {
//     this.url = url;
//     this.socket = null;
//     this.onConnected = null;
//     this.onDisconnected = null;
//     this.onError = null;
//     this.handlers = {};
//   }

//   connect() {
//     this.socket = new WebSocket(this.url);

//     this.socket.onopen = () => {
//       console.log('[WebSocket] Connected');
//       this.onConnected?.();
//     };

//     this.socket.onmessage = (event) => {
//       try {
//         const msg = JSON.parse(event.data);
//         const type = msg.type;
//         if (type && this.handlers[type]) {
//           this.handlers[type](msg.data);
//         } else {
//           console.warn(`[WebSocket] Unhandled message type: ${type}`, msg);
//         }
//       } catch (err) {
//         console.error('[WebSocket] Failed to parse message:', err);
//       }
//     };

//     this.socket.onclose = () => {
//       console.log('[WebSocket] Disconnected');
//       this.onDisconnected?.();
//     };

//     this.socket.onerror = (err) => {
//       console.error('[WebSocket] Error:', err);
//       this.onError?.(err);
//     };
//   }

//   send(type, data) {
//     if (this.socket?.readyState === WebSocket.OPEN) {
//       this.socket.send(JSON.stringify({ type, data }));
//     } else {
//       console.warn('[WebSocket] Cannot send, socket not open');
//     }
//   }

//   on(type, handler) {
//     this.handlers[type] = handler;
//   }

//   close() {
//     this.socket?.close();
//   }
// }
