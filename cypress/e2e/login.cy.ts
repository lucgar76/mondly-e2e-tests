describe('Mondly Onboarding and Login', () => {
    
  beforeEach(() => {
    cy.visit('/', { timeout: 30000 }); // Added timeout for safety
  });

  it('should complete onboarding and login successfully', () => {
    // Setup Language
    cy.selectMotherLanguage('Español');
    cy.selectTargetLanguage('French');
    cy.selectLevel('Intermedio');

// 1. Wait a moment for the header to stabilize
cy.wait(1000); 

// 2. Click the Login trigger in the menu
// We use the text-based approach so we don't care if it's the 6th or 7th child
cy.contains('li', /Login|Iniciar sesión/i)
  .should('be.visible')
  .click();

// 3. Ensure the Login Modal/Tab is active
cy.get('div').contains('Login').click();

    // Enter Credentials using your FIXED command
    // This replaces the manual steps 6 & 7
    cy.enterCredentials(Cypress.env('userEmail'), Cypress.env('userPassword'));

    // Submit & Finish
    cy.submitLogin();
    
    // Handle cookies if they appear
    cy.acceptCookies();

    // Verify success
    cy.verifyCategories();
  });
});