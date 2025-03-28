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

