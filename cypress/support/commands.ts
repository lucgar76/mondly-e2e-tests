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
  
  // Step 2: Select mother language (I speak)
  Cypress.Commands.add('selectMotherLanguage', (language: string) => {
    // Step 1: Click on "English" to open the dropdown
    cy.contains('English').should('be.visible').click();
    
    // Step 2: Select Español from the list
    cy.contains(language).click({ force: true });
    
    // Step 3: Click on the now-showing "Español" label to close dropdown
    // After selection, the dropdown header now shows "Español" instead of "English"
    cy.contains('Español').should('be.visible').click({ force: true });
  });
  
  // Step 3: Select target language (I want to learn)
  Cypress.Commands.add('selectTargetLanguage', (language: string) => {
    cy.contains('Seleccionar').click({ force: true });
    
    // Step 2: Select Français from the list
    cy.contains(language).click({ force: true });
    
    // Step 3: Click on the now-showing "Français" label to close dropdown
    cy.contains('French').click({ force: true });

  });
  
  // Step 4: Select level
  Cypress.Commands.add('selectLevel', (level: string) => {

    cy.wait(500); // Wait for animations (not ideal but can help debug)
    cy.contains('Intermedio').should('be.visible').click({ force: true });
    
  });
  
  // Step 5: Click on Iniciar Sesion/Registrarte
  Cypress.Commands.add('goToLogin', () => {
    cy.contains('Iniciar sesión / Registrarte').click({ force: true });
    // Or: cy.contains('Registrarte').click();
  });
  
  // Steps 6-7: Enter email and password
  Cypress.Commands.add('enterCredentials', (email: string, password: string) => {
    // Username field (not email type)
    cy.get('input[type="text"], input[name="username"], input[name="email"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .type(email);
    
    // Password field
    cy.get('input[type="password"]')
      .should('be.visible')
      .type(password, { log: false });
  });
  
  // Step 8: Submit login form
  Cypress.Commands.add('submitLogin', () => {
    cy.contains('Iniciar Sesión').click({ force: true });
  });
  
  // Step 9: Accept cookies
  Cypress.Commands.add('acceptCookies', () => {
    cy.get('body').then(($body) => {
      // Only click if cookie banner exists
      if ($body.find('[data-testid="cookie-accept"]').length > 0) {
        cy.get('[data-testid="cookie-accept"]').click({ force: true });
      }
    });
  });
  
  // Step 10: Verify categories are visible
  Cypress.Commands.add('verifyCategories', () => {
    // TODO: Replace with actual category container selector
    cy.get('[data-testid="categories"]').should('be.visible');
  });
  
  // Complete flow in one command
  Cypress.Commands.add('completeOnboardingAndLogin', (email: string, password: string) => {
    cy.visit('/');
    cy.selectMotherLanguage('Español');
    cy.selectTargetLanguage('French');
    cy.selectLevel('Intermedio');
    cy.goToLogin();
    cy.enterCredentials(email, password);
    cy.submitLogin();
    cy.acceptCookies();
  });
  
  export {};