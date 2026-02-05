# Mondly E2E Automated Tests 🚀

A comprehensive Cypress + TypeScript test automation project for the Mondly language learning platform.

## 📋 Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [What the Test Does](#what-the-test-does)
- [Project Structure](#project-structure)
- [Security & Credentials](#security--credentials)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## 🎯 About

This project contains automated end-to-end tests for the Mondly web application. The tests verify the complete user onboarding and login flow, including:

- Language selection (mother language and target language)
- Learning level selection
- User authentication
- Navigation through the application

**Technology Stack:**
- **Cypress**: Modern end-to-end testing framework
- **TypeScript**: Type-safe test development
- **Node.js**: Runtime environment

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

3. **A Mondly Account**
   - You'll need valid login credentials for testing
   - Create an account at: https://app.mondly.com/

---

## 🚀 Getting Started

### Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/lucgar76/mondly-e2e-tests.git

# Navigate into the project directory
cd mondly-e2e-tests
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:
- Cypress (testing framework)
- TypeScript (type support)
- dotenv (environment variable management)

**⏱️ This may take 2-3 minutes depending on your internet connection.**

### Step 3: Configure Your Credentials

**IMPORTANT:** Never commit your credentials to Git!

1. Create a `.env` file in the project root:

```bash
# Create the .env file
touch .env
```

2. Open `.env` and add your Mondly credentials:

```env
CYPRESS_USER_EMAIL=your-email@example.com
CYPRESS_USER_PASSWORD=your-password
```

**Replace** `your-email@example.com` and `your-password` with your actual Mondly login credentials.

**🔒 Security Note:** The `.env` file is already in `.gitignore`, so your credentials will never be uploaded to GitHub.

### Step 4: Verify Setup

Check that everything is configured correctly:

```bash
# Verify Cypress installation
npx cypress verify
```

You should see a success message confirming Cypress is installed.

---

## ▶️ Running the Tests

### Option 1: Interactive Mode (Recommended for Beginners)

Run Cypress with a visual interface:

```bash
npm run cy:open
```

**What happens:**
1. A Cypress window opens
2. You'll see a list of test files
3. Click on `language-selection.cy.ts` to run the test
4. Watch the test execute in real-time in a browser
5. See each step highlighted as it happens

**Benefits:**
- Visual feedback
- Easy to debug
- See exactly what's happening
- Great for learning

### Option 2: Headless Mode (Fast, No UI)

Run tests in the background without opening a browser:

```bash
npm run cy:run
```

**What happens:**
1. Tests run in the terminal
2. No browser window opens
3. Results are displayed in the console
4. Faster execution
5. Screenshots saved on failure

**Benefits:**
- Quick execution
- Good for CI/CD pipelines
- No need to watch the test

### Option 3: Run Specific Test

Run only the language selection test:

```bash
npx cypress run --spec "cypress/e2e/language-selection.cy.ts"
```

---

## 🎬 What the Test Does

When you run `language-selection.cy.ts`, here's what happens step by step:

### **Step 1: Visit Mondly Homepage** 🌐
- Opens https://app.mondly.com/
- Waits for the page to load (up to 30 seconds)
- **What you'll see:** Mondly's welcome screen with language options

### **Step 2: Select Mother Language** 🇪🇸
- Finds the "I Speak" dropdown (initially set to "English")
- Clicks to open the dropdown
- Selects "Español" (Spanish)
- Closes the dropdown
- **What you'll see:** Dropdown changes from "English" to "Español"

### **Step 3: Select Target Language** 🇫🇷
- Finds the "I want to learn" dropdown (shows "Seleccionar")
- Clicks to open the dropdown
- Scrolls to find "French"
- Selects "French"
- Closes the dropdown
- **What you'll see:** Dropdown now shows "French"

### **Step 4: Select Learning Level** 📊
- Finds the level selection slider
- Clicks on "Intermedio" (Intermediate)
- Waits for the selection to register
- **What you'll see:** Slider moves to the middle position (Intermedio)

### **Step 5: Navigate to Login** 🔑
- Clicks the "Iniciar sesión" (Log in) link at the bottom
- Waits for login form to appear
- **What you'll see:** Login modal/form appears with email and password fields

### **Step 6: Enter Email** ✉️
- Finds the email input field (placeholder: "Correo electrónico")
- Clears any existing value
- Types your email from `.env` file
- Verifies the email was entered correctly
- **What you'll see:** Your email appears in the email field

### **Step 7: Enter Password** 🔒
- Finds the password input field (placeholder: "Contraseña")
- Clears any existing value
- Types your password from `.env` file
- Verifies the password was entered
- **What you'll see:** Dots appear in the password field (password is masked)

### **Step 8: Submit Login** ✅
- Finds the "Iniciar sesión" submit button
- Clicks the button
- Waits for authentication (2 seconds)
- **What you'll see:** Button click, page may redirect to dashboard

### **Expected Result:**
- ✅ All steps complete successfully
- ✅ User is logged into Mondly
- ✅ Test passes with green checkmarks

### **If Something Fails:**
- ❌ Red X appears on the failed step
- 📸 Screenshot saved to `cypress/screenshots/`
- 🎥 Video saved to `cypress/videos/` (if enabled)
- 📋 Error message shown in the console

---

## 📁 Project Structure

```
mondly-e2e-tests/
├── cypress/
│   ├── e2e/
│   │   ├── language-selection.cy.ts  # Main test file (language + login)
│   │   └── login.cy.ts               # Alternative login test
│   ├── support/
│   │   ├── commands.ts               # Custom Cypress commands
│   │   └── e2e.ts                    # Global test configuration
│   ├── screenshots/                  # Auto-generated on test failure
│   └── videos/                       # Auto-generated test recordings
├── node_modules/                     # Installed dependencies (git-ignored)
├── .env                              # Your credentials (git-ignored)
├── .gitignore                        # Files to exclude from Git
├── cypress.config.ts                 # Cypress configuration
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

### **Key Files:**

- **`language-selection.cy.ts`**: Complete onboarding and login test
- **`commands.ts`**: Reusable test actions (selectMotherLanguage, selectTargetLanguage, etc.)
- **`.env`**: Your secure credentials (never committed to Git)
- **`cypress.config.ts`**: Base URL, timeouts, and environment variable setup

---

## 🔒 Security & Credentials

### How Credentials Are Protected

1. **Environment Variables:** Credentials stored in `.env` file
2. **Git Ignore:** `.env` is excluded from Git commits
3. **No Hardcoding:** Tests use `Cypress.env()` to access credentials
4. **GDPR Compliant:** Personal data never committed to repository

### Why This Matters

- ✅ Credentials stay on your local machine
- ✅ Safe to share repository publicly
- ✅ Team members use their own credentials
- ✅ Follows security best practices

### ⚠️ Important Security Notes

- **Never** commit the `.env` file
- **Never** hardcode credentials in test files
- **Never** share credentials in Slack, email, or documentation
- **Always** use test accounts (not production user accounts)

---

## 🛠️ Troubleshooting

### Issue: "Cypress not found"

**Solution:**
```bash
npm install
npx cypress verify
```

### Issue: "Test times out"

**Cause:** Slow internet or Mondly server delay

**Solution:**
- Increase timeout in `cypress.config.ts`
- Check your internet connection
- Verify Mondly site is accessible

### Issue: "Element not found"

**Cause:** Mondly UI changed or element not loaded

**Solution:**
- Run in interactive mode to see what's happening
- Check if selectors are still valid
- Add more wait time before interacting

### Issue: "Invalid credentials"

**Cause:** Wrong email/password in `.env` file

**Solution:**
- Verify credentials in `.env` match your Mondly account
- Try logging in manually at https://app.mondly.com/
- Check for typos or extra spaces

### Issue: "Module not found"

**Cause:** Missing dependencies

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Test fails at language selection

**Cause:** Dropdown doesn't close properly

**Solution:**
- Increase wait times in `commands.ts`
- Check for overlaying elements
- Verify dropdowns are clickable

---

## 📚 Additional Resources

- **Cypress Documentation:** https://docs.cypress.io/
- **Cypress Best Practices:** https://docs.cypress.io/guides/references/best-practices
- **TypeScript with Cypress:** https://docs.cypress.io/guides/tooling/typescript-support
- **Mondly Website:** https://app.mondly.com/

---

## 🤝 Contributing

This is a personal learning project. Feel free to:
- Fork the repository
- Create your own tests
- Experiment with different scenarios
- Learn Cypress and TypeScript

---

## 📝 License

This project is for educational purposes.

---

## 👤 Author

**Luciano Garrido**  
📧 Email: lucianogarrido@gmail.com  
🔗 GitHub: [@lucgar76](https://github.com/lucgar76)

---

## 🎓 Learning Notes

This project demonstrates:
- ✅ Cypress test automation with TypeScript
- ✅ Page Object Model pattern (custom commands)
- ✅ Secure credential management
- ✅ Environment variable configuration
- ✅ Git workflow and version control
- ✅ Test-driven development practices

**Built as a learning exercise for automated testing.** 🚀

---

*Last Updated: February 2026*
