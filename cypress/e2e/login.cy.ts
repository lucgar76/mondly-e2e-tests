/**
 * Mondly Complete Onboarding and Login Test
 * 
 * This test demonstrates the full user flow from language selection to successful login.
 * It covers:
 * 1. Language selection (mother language and target language)
 * 2. Level selection
 * 3. Login process
 * 4. Verification of successful login
 * 
 * IMPORTANT: This test requires credentials to be set in environment variables.
 * Never hardcode credentials - always use Cypress.env('variableName')
 */

describe('Mondly Onboarding and Login', () => {
    
  /**
   * beforeEach runs before every test in this describe block
   * It ensures we start fresh on the Mondly homepage for each test
   */
  beforeEach(() => {
    // Visit the Mondly app homepage
    // timeout: 30000 gives the page 30 seconds to load (useful for slow networks)
    cy.visit('/', { timeout: 30000 });
  });

  /**
   * Complete Login Flow Test
   * 
   * This test goes through the entire onboarding and login process:
   * - Selects Spanish as mother language
   * - Selects French as target language
   * - Chooses Intermediate level
   * - Logs in with credentials from environment variables
   * - Verifies successful login
   */
  it('should complete onboarding and login successfully', () => {
    // STEP 1: Language Selection
    // Select Spanish as the language "I speak"
    cy.selectMotherLanguage('Español');
    
    // Select French as the language "I want to learn"
    cy.selectTargetLanguage('French');
    
    // Choose Intermediate (Intermedio) as the learning level
    cy.selectLevel('Intermedio');

    // STEP 2: Wait for UI to stabilize
    // Small delay to ensure any animations or transitions complete
    cy.wait(1000); 

    // STEP 3: Navigate to Login
    // Click the "Log in / Sign up" button in the menu
    // Using text-based selector is more reliable than CSS classes
    cy.contains('Iniciar sesión / Registrarte')
      .should('be.visible')
      .click();

    // Ensure the Login Modal/Tab is active
    // Click the login link again to make sure we're on the login tab (not signup)
    cy.contains('a', 'Iniciar sesión / Registrarte').click();

    // STEP 4: Enter Login Credentials
    // Get credentials from environment variables (set in .env file)
    // SECURITY: Never hardcode email/password in test files!
    cy.enterCredentials(Cypress.env('userEmail'), Cypress.env('userPassword'));

    // STEP 5: Submit Login Form
    cy.submitLogin();
    
    // STEP 6: Handle Cookie Banner (if it appears)
    cy.acceptCookies();

    // STEP 7: Verify Successful Login
    // Check that we're on the home page and can see the daily lesson
    cy.verifyCategories();
  });
});