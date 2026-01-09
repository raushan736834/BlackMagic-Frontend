// Type definitions as JSDoc comments for reference

/**
 * @typedef {Object} MenuItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {boolean} isVeg
 * @property {boolean} available
 * @property {string} imageUrl
 * @property {number} spiceLevel
 * @property {string[]} tags
 * @property {string} categoryId
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} categoryId
 * @property {string} name
 * @property {MenuItem[]} items
 */

/**
 * @typedef {Object} CartItem
 * @property {string} menuItemId
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} [specialRequest]
 * @property {string} [imageUrl]
 * @property {boolean} [isVeg]
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} menuItemId
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 * @property {string} [specialRequest]
 */

/**
 * @typedef {Object} Order
 * @property {string} orderId
 * @property {string} orderCode
 * @property {number} tableNumber
 * @property {OrderStatus} status
 * @property {PaymentStatus} paymentStatus
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {string} createdAt
 * @property {string} [specialInstructions]
 */

/**
 * @typedef {'PLACED' | 'IN_KITCHEN' | 'PREPARING' | 'READY' | 'SERVED' | 'COMPLETED' | 'CANCELLED'} OrderStatus
 */

/**
 * @typedef {'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'} PaymentStatus
 */

/**
 * @typedef {Object} Table
 * @property {number} tableNumber
 * @property {number} capacity
 * @property {string} location
 * @property {boolean} active
 * @property {string} qrToken
 */

/**
 * @typedef {Object} User
 * @property {string} userId
 * @property {string} username
 * @property {string} name
 * @property {UserRole} role
 * @property {string[]} [assignedTables]
 * @property {boolean} active
 */

/**
 * @typedef {'SUPER_ADMIN' | 'MANAGER' | 'CHEF' | 'WAITER' | 'CASHIER'} UserRole
 */

/**
 * @typedef {Object} SessionStartRequest
 * @property {string} qrToken
 * @property {number} partySize
 * @property {string} deviceId
 */

/**
 * @typedef {Object} SessionResponse
 * @property {string} sessionCode
 * @property {number} tableNumber
 * @property {string} status
 */

/**
 * @typedef {Object} OrderCreateRequest
 * @property {string} sessionCode
 * @property {Array<{menuItemId: string, quantity: number, specialRequest?: string}>} items
 * @property {string} [specialInstructions]
 */

/**
 * @typedef {Object} PaymentInitiateRequest
 * @property {string} orderId
 * @property {'UPI' | 'CARD' | 'NETBANKING' | 'WALLET'} method
 */

/**
 * @typedef {Object} PaymentVerificationRequest
 * @property {string} razorpayOrderId
 * @property {string} razorpayPaymentId
 * @property {string} razorpaySignature
 */

/**
 * @typedef {Object} AdminLoginRequest
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} AdminLoginResponse
 * @property {Object} data
 * @property {string} data.token
 * @property {string} data.username
 * @property {string} data.role
 * @property {string[]} data.permissions
 */

export {};
