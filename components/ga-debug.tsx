"use client"

// Google Analytics Debug Panel - TEMPORARILY DISABLED
// This component is currently disabled to ensure no debug elements are visible to end users
// The debug panel functionality has been completely removed from the user interface
// Google Analytics tracking continues to function normally without any debug components

export default function GADebug() {
  // Debug panel is completely disabled - return null to render nothing
  return null
}

// Development Note:
// To re-enable debug functionality in the future, the following features were available:
// - Real-time GA status monitoring
// - Event testing and verification
// - Cookie inspection
// - Debug information export
// - Consent status tracking
//
// The debug panel was accessible via:
// - Keyboard shortcut: Ctrl+Shift+Alt+G
// - URL parameter: ?ga_debug
// - LocalStorage flag: __ga_debug_enabled=true
// - Development environment detection
//
// All debug functionality has been removed to ensure clean production deployment
