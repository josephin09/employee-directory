Employee Directory

📌 Overview
This is a simple Employee Directory web application built with HTML, CSS, and JavaScript. It allows you to:
✅ Add new employees
✅ Edit and delete employees
✅ Filter employees by name, department, and role
✅ Search by name or email
✅ Sort and paginate the employee list

---

🚀 Setup & Run Instructions

1.Clone the repository
bash
git clone <your-repo-url>

2.Navigate to the project folder
bash
cd employee-directory

3.Run the app
Since this is a static HTML/CSS/JS project, you can open index.html directly in your web browser:
✅Double-click index.html
✅Or right-click and select Open With > Browser
✅Alternatively, use a simple live server extension in VSCode for auto-reload.

---

🗂️ Project Structure
employee-directory/

├── index.html # Main employee list and directory page
├── form.html # Add/Edit employee form page
├── style.css # All styles for the pages
├── script.js # All JavaScript logic for CRUD, filter, search, pagination
├── README.md # Project documentation

---

🔍 Reflection
Challenges Faced:

✅Ensuring the filter sidebar toggles properly on smaller screens
✅Handling real-time search and combined filters without a database
✅Keeping styling consistent across header, form, cards, and sidebar
✅Managing local state for adding/editing without a backend

What I’d Improve with More Time:

✅Persist employee data with localStorage or a backend API
✅Add form validation for unique emails
✅Implement confirmation modals before deleting
✅Make the UI more responsive and accessible for all screen sizes
✅Improve sort options to include role and email, with ascending/descending toggles.
