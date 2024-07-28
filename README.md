# Keycloak token refresh for OFFLINE session rproducer

This reproduce a possible issue where keycloak continues refreshing a token (using refresh token) for a session
that has been logged out in another tab.

## Quick start

- Start the containers from docker-compose
- Access keycloak admin console at http://localhost:18080, login as admin using admin/keycloak-admin-password
  credentials
- Open the 'test' realm and add a user, then set a password

- Start the front by navigating to front/test-front and running 'ng serve'
- Open one tab on http://localhost:4200, login as the user by clicking Login then entering user credentials created
  above
- Open another tab on http://localhost:4200, login as the user by clicking Login.
- Notice how both tabs use the same session state. On keycloak, 2 sessions are created. One 'REGULAR', one 'OFFLINE'
- Logout from the second tab
- Switch to the first tab, notice how tokens keeps getting refreshed
- On keycloak, notice how the OFFLINE session is still active
- Invalidate it, the token refresh now fails, and the front display an error in logs.
