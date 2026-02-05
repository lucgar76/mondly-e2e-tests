Instructions:
Create a new file in your project root named README.md.

Copy and paste the content below.

Replace the placeholder bracketed text (like [YOUR_NAME]) with your actual details.

Mondly Web Automation - Cypress & TypeScript
This repository contains an end-to-end (E2E) automated testing suite for the Mondly web application. The project demonstrates professional automation practices, including the Page Object Model (POM) pattern, custom command abstraction, and secure credential management.

🚀 Project Overview
The primary test suite validates the onboarding and authentication flow:

Language Selection: Changes interface language (Mother tongue) and target language.

Onboarding: Navigates through the initial level selection.

Authentication: Securely logs in using environment variables.

Verification: Asserts successful navigation to the user dashboard/explore page.

🛠️ Tech Stack
Framework: Cypress

Language: TypeScript

Pattern: Custom Commands & Modular Selectors

🔐 Security & GDPR Compliance
To adhere to security best practices and GDPR guidelines, no sensitive data (emails or passwords) is hardcoded in this repository.

Credentials are managed via a local cypress.env.json file which is excluded from version control via .gitignore.

Setup for Local Testing:
Clone the repository.

Create a file named cypress.env.json in the root directory.

Add the following structure with your test credentials:

JSON
{
  "userEmail": "your-email@example.com",
  "userPassword": "your-password"
}
📦 Installation & Execution
Install Dependencies:

Bash
npm install
Open Cypress Test Runner:

Bash
npx cypress open
Run Tests in Headless Mode:

Bash
npx cypress run
🏗️ Project Structure
cypress/e2e/: Contains the test specifications (.cy.ts).

cypress/support/commands.ts: Custom Cypress commands for reusable actions (Login, Language selection).

cypress.config.ts: Main configuration file for the Cypress environment.

Developed by [Luciano Garrido] Automation Tester [(https://www.linkedin.com/in/lucianogarrido/)]

Why this README works:
Professionalism: It explains why you used certain tools (like TypeScript).

Security First: It explicitly mentions GDPR and why the credentials file is missing—this shows you have a "Security Mindset."

Instructions: It makes it easy for a Lead Tester to clone your repo and run it themselves.
