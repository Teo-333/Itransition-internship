# Task #4 (ALL GROUPS)

## **Language and Platform Requirements**
Use the appropriate stack for your group:

- **JavaScript or TypeScript, React, PostgreSQL or MySQL** (or any other database)
- **C#, .NET, ASP.NET, SQL Server** (or any other database)

## **Project Requirements**
### **1. Database Constraints**
- You **must create a unique index** in the database.
- Your **storage must ensure email uniqueness**, regardless of how many sources push data into it.
- **Do not check uniqueness in your code**—enforce it at the storage level.

### **2. UI and Functionality**
- **Table Structure**: Your table should look like a table.
- **Toolbar**: Your toolbar should look like a toolbar.
- **Sorting**: Data in the table must be **sortable**, e.g., by last login time.
- **Multiple Selection**: Implement checkboxes for multiple selections, including a **"Select All" checkbox**.

### **3. Authentication and Access Control**
- **User Authentication**:
  - Implement user **registration and authentication**.
  - Non-authenticated users should **only** have access to the **login and registration forms**.
- **User Management (Admin Panel)**:
  - Only **authenticated users** can access the **user management table**.
  - The table should contain at least the following fields:
    - Selection checkbox (leftmost column)
    - Name
    - Email
    - Last login time (or last activity time)
    - Status (**Active**/**Blocked**)
  - You may optionally include:
    - Registration time
    - Sparkline for activity
- **User Actions**:
  - Toolbar above the table must include:
    - **Block** (text button)
    - **Unblock** (icon)
    - **Delete** (icon)
  - **No buttons inside table rows**.
- **All users** should be able to:
  - Block/unblock **any** user, including themselves.
  - Delete **any** user, including themselves.

### **4. Authentication Rules**
- Users can use **any non-empty password**, even a single character.
- No email confirmation is required.
- **Blocked users** should not be able to log in.
- **Deleted users** can re-register.

### **5. Handling Blocked Users**
- **Blocked users should be redirected to the login page** when they attempt to perform any action.
- **Users shouldn't be logged out immediately** when blocked:
  - If a user is viewing the list, they remain logged in.
  - If they attempt any action, they are **redirected to the login page**.

## **Implementation Guidelines**
- **CSS Framework**: Use **any** CSS framework (Bootstrap recommended).
- **Database Indexing**:
  - Create a **unique index** for emails in the database.
  - **Do not check uniqueness in the code**, only handle **errors** when the constraint fails.

## **Submission Instructions**
Send the following to **p.lebedev@itransition.com**:

1. **Full name**.
2. **Link to public source code repository**.
3. **Link to deployed project** (any hosting: Azure, AWS, Render, Somee, Vercel, Netlify, etc.).
4. **Recorded video** demonstrating:
   - Registration & login.
   - Selecting and blocking a user.
   - Unblocking users.
   - Selecting and blocking **all** users (including current user) and being redirected to the login page.
   - Demonstration of the **unique index** in the database.
   - Error handling for duplicate emails (if using NoSQL, show alternative approaches).

## **Important Notes**
- **Deadline**: **March 25, 2025**.
- **Why are all users admins?**
  - Simplifies **testing**.
  - Removes the need for role-based logic.
  - **Admins deleting themselves** is a real-world requirement.

For more details on creating a unique index, check:
👉 [SQL Create Unique Index](https://www.w3schools.com/sql/sql_ref_create_unique_index.asp)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
