/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        selectMotherLanguage(language: string): Chainable<void>;
        selectTargetLanguage(language: string): Chainable<void>;
        selectLevel(level: string): Chainable<void>;
        goToLogin(): Chainable<void>;
        enterCredentials(email: string, password: string): Chainable<void>;
        submitLogin(): Chainable<void>;
        acceptCookies(): Chainable<void>;
        verifyCategories(): Chainable<void>;
        completeOnboardingAndLogin(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  /**
   * Select Mother Language (I Speak)
   * 
   * This command changes the "I speak" language dropdown.
   * By default, it shows "English" and we change it to the desired language.
   * 
   * @param language - The language to select (e.g., 'Español', 'Français', 'Deutsch')
   * 
   * How it works:
   * 1. Finds and clicks the current language button (initially "English") to open dropdown
   * 2. Clicks the desired language from the dropdown list
   * 3. Waits for the UI to update
   * 4. Clicks the selected language button again to close the dropdown
   * 5. Verifies the selection was successful
   */
  Cypress.Commands.add('selectMotherLanguage', (language: string) => {
    // Step 1: Click on "English" to open the dropdown
    // .should('be.visible') ensures the element is visible before clicking
    cy.contains('English').should('be.visible').click();
    
    // Step 2: Select the desired language from the list
    // force: true bypasses actionability checks (useful if element is covered by animation)
    cy.contains(language).click({ force: true });
    
    // Step 3: Wait for the UI to update after selection
    cy.wait(500);
    
    // Step 4: Click the selected language button again to close the dropdown
    // This ensures the dropdown is dismissed and won't block other elements
    cy.contains(language).should('be.visible').click({ force: true });
    
    // Step 5: Verify the language was selected and dropdown is closed
    cy.contains(language).should('be.visible');
  });
  
  /**
   * Select Target Language (I Want to Learn)
   * 
   * This command changes the "I want to learn" language dropdown.
   * Initially shows "Seleccionar" (Select in Spanish) after mother language is set.
   * 
   * @param language - The language you want to learn (e.g., 'French', 'Italian', 'German')
   * 
   * How it works:
   * 1. Clicks the "Seleccionar" dropdown to open the language list
   * 2. Scrolls down to the desired language (in case it's not visible)
   * 3. Clicks the language to select it
   * 4. Waits for the UI to update
   * 5. Clicks the selected language button again to close the dropdown
   */
  Cypress.Commands.add('selectTargetLanguage', (language: string) => {
    // Step 1: Click "Seleccionar" to open the target language dropdown
    cy.contains('Seleccionar').click({ force: true });
    
    // Step 2: Find the language in the list and scroll to it if needed
    // .scrollIntoView() ensures the element is visible in the viewport
    // This is especially important for languages lower in the list like French
    cy.contains(language)
      .scrollIntoView()
      .click({ force: true });
    
    // Step 3: Wait for the UI to update after selection
    cy.wait(500);
    
    // Step 4: Click the selected language button again to close the dropdown
    // This ensures the dropdown is dismissed and won't block other elements
    cy.contains(language).should('be.visible').click({ force: true });
    
    // Step 5: Verify the language was selected and dropdown is closed
    cy.contains(language).should('be.visible');
  });
  
  /**
   * Select Learning Level
   * 
   * This command selects your language learning level.
   * Options typically include: Beginner (Principiante), Intermediate (Intermedio), Advanced (Avanzado)
   * 
   * @param level - The level to select (e.g., 'Intermedio', 'Principiante', 'Avanzado')
   * 
   * How it works:
   * 1. Waits for animations/dropdowns to close
   * 2. Scrolls to the level selection area
   * 3. Finds the tab containing the level text
   * 4. Clicks on the clickable tab element (not the text)
   * 
   * The interface has clickable tabs that control the level selection.
   */
  Cypress.Commands.add('selectLevel', (level: string) => {
    // Wait for animations and dropdowns to fully close
    cy.wait(1500);
    
    // Scroll to the level selection area
    cy.contains('Principiante', { timeout: 10000 })
      .scrollIntoView();
    
    cy.wait(500);
    
    // Find the span containing the level text and click on the corresponding clickable tab
    // The structure has clickable .tab divs above the text labels
    // We need to click the nth tab based on which level is selected
    const levelIndex: { [key: string]: number } = {
      'Principiante': 1,  // First tab
      'Intermedio': 2,    // Second tab
      'Avanzado': 3       // Third tab
    };
    
    // Click on the nth clickable tab (not the text tab)
    cy.get('.tabs-inner .tab[data-ember-action]')
      .eq(levelIndex[level] - 1)  // eq() is 0-indexed, so subtract 1
      .click({ force: true });
    
    // Wait to ensure selection registered
    cy.wait(500);
  });
  
  /**
   * Navigate to Login Page
   * 
   * Clicks the "Iniciar sesión" (Log in) link to navigate to the login form.
   * This link appears at the bottom of the modal after completing the language selection steps.
   * 
   * Note: There are two separate links - "Iniciar sesión" and "Registrarte" separated by "/"
   * We click on "Iniciar sesión" to go to the login page.
   */
  Cypress.Commands.add('goToLogin', () => {
    // Wait for the login link to appear after completing onboarding
    cy.wait(1000);
    
    // Click on the "Iniciar sesión" link
    // This finds an <a> element containing the exact text "Iniciar sesión"
    cy.contains('a', 'Iniciar sesión')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });
  });
  
  /**
   * Enter Login Credentials
   * 
   * Fills in the email and password fields on the login form.
   * 
   * @param email - User's email address (from environment variable)
   * @param password - User's password (from environment variable)
   * 
   * SECURITY NOTE: 
   * - Credentials should NEVER be hardcoded in test files
   * - Always use environment variables: Cypress.env('userEmail')
   * - Password typing uses { log: false } to hide it from the Cypress log
   * 
   * How it works:
   * 1. Finds the email input field using multiple selectors (handles different input types)
   * 2. Types the email address
   * 3. Finds the password field
   * 4. Types the password (without logging it for security)
   */
  Cypress.Commands.add('enterCredentials', (email: string, password: string) => {
    // Find the email input field
    // We try multiple selectors because Mondly might use different input types
    // .first() gets the first visible input if multiple exist
    cy.get('input[type="email"], input[type="text"], input[name="username"], input[name="email"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .type(email);
    
    // Find and fill the password field
    // { log: false } prevents the password from appearing in Cypress logs (security!)
    cy.get('input[type="password"]')
      .should('be.visible')
      .type(password, { log: false });
  });
  
  /**
   * Submit Login Form
   * 
   * Clicks the "Log in" button to submit the login form.
   * Uses the submit button to trigger the login action.
   * 
   * Note: The button text is "Iniciar sesión" (Log in in Spanish)
   */
  Cypress.Commands.add('submitLogin', () => {
    // Find and click the submit button
    // We look for a button with type="submit"
    cy.get('button[type="submit"]').click();
  });
  
  /**
   * Accept Cookies Banner
   * 
   * Handles the cookie consent banner if it appears.
   * Not all users see this banner, so we check if it exists first.
   * 
   * How it works:
   * 1. Check if the cookie accept button exists on the page
   * 2. If it exists, click it
   * 3. If it doesn't exist, do nothing (no error)
   * 
   * This is a defensive approach - the test won't fail if the banner doesn't appear
   */
  Cypress.Commands.add('acceptCookies', () => {
    // Use .then() to check if the element exists before interacting
    cy.get('body').then(($body) => {
      // Look for the cookie accept button using its test ID
      if ($body.find('[data-testid="cookie-accept"]').length > 0) {
        // Button exists, so click it
        cy.get('[data-testid="cookie-accept"]').click({ force: true });
      }
      // If button doesn't exist, do nothing (banner already accepted or not shown)
    });
  });
  
  /**
   * Verify Successful Login
   * 
   * Confirms that the user has successfully logged in by checking:
   * 1. The presence of "Lección Diaria" (Daily Lesson) on the page
   * 2. The URL includes '/home'
   * 
   * This is an ASSERTION - it verifies the expected state after login.
   * If either check fails, the test will fail.
   */
  Cypress.Commands.add('verifyCategories', () => {
    // Check for "Lección Diaria" (Daily Lesson) text - this appears after successful login
    // timeout: 10000 gives it 10 seconds to appear (page might load slowly)
    cy.contains('Lección Diaria', { timeout: 10000 }).should('be.visible');
    
    // Verify the URL changed to the home page
    // .should('include', '/home') checks that the URL contains '/home'
    cy.url().should('include', '/home');
  });
  
  /**
   * Complete Onboarding and Login (All-in-One Command)
   * 
   * This is a convenience command that combines all the steps needed to:
   * - Select language preferences
   * - Navigate to login
   * - Enter credentials
   * - Submit the form
   * - Handle cookies
   * 
   * @param email - User's email address
   * @param password - User's password
   * 
   * This command is useful when you want to quickly get to the logged-in state
   * without writing all the individual steps in your test.
   */
  Cypress.Commands.add('completeOnboardingAndLogin', (email: string, password: string) => {
    // Visit the homepage
    cy.visit('/');
    
    // Complete language selection
    cy.selectMotherLanguage('Español');
    cy.selectTargetLanguage('French');
    cy.selectLevel('Intermedio');
    
    // Navigate to login and authenticate
    cy.goToLogin();
    cy.enterCredentials(email, password);
    cy.submitLogin();
    
    // Handle cookie banner if it appears
    cy.acceptCookies();
  });
  
  export {};