let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Charlie", lastName: "Lee", email: "charlie@example.com", department: "Finance", role: "Analyst" }
];

let currentPage = 1;
let pageSize = 10;

function toggleFilterSidebar() {
  document.getElementById("filterSidebar").classList.toggle("open");
}

function getFilteredEmployees() {
  const nameFilter = document.getElementById("filterName").value.toLowerCase();
  const deptFilter = document.getElementById("filterDept").value.toLowerCase();
  const roleFilter = document.getElementById("filterRole").value.toLowerCase();
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const sortKey = document.getElementById("sortSelect").value;

  let result = employees;

  if (nameFilter || deptFilter || roleFilter) {
    result = result.filter(e =>
      e.firstName.toLowerCase().includes(nameFilter) &&
      e.department.toLowerCase().includes(deptFilter) &&
      e.role.toLowerCase().includes(roleFilter)
    );
  }

  if (searchQuery) {
    result = result.filter(e =>
      e.firstName.toLowerCase().includes(searchQuery) ||
      e.lastName.toLowerCase().includes(searchQuery) ||
      e.email.toLowerCase().includes(searchQuery)
    );
  }

  if (sortKey) {
    result.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  return result;
}

function renderEmployees() {
  const list = getFilteredEmployees();
  const main = document.getElementById("employeeList");
  main.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginated = list.slice(start, end);

  paginated.forEach(emp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    main.appendChild(card);
  });

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
}

function applyFilter() {
  currentPage = 1;
  renderEmployees();
}

function resetFilter() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterRole").value = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("sortSelect").value = "";
  renderEmployees();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees();
  }
}

function nextPage() {
  const totalPages = Math.ceil(getFilteredEmployees().length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderEmployees();
  }
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  renderEmployees();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  localStorage.setItem("editEmp", JSON.stringify(emp));
  window.location.href = "form.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderEmployees();

  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");
  const pageSizeSelect = document.getElementById("pageSize");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      renderEmployees();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderEmployees();
    });
  }

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
      pageSize = parseInt(e.target.value);
      currentPage = 1;
      renderEmployees();
    });
  }

  const form = document.getElementById("employeeForm");
  if (form) {
    const editEmp = JSON.parse(localStorage.getItem("editEmp"));
    if (editEmp) {
      document.getElementById("empId").value = editEmp.id;
      document.getElementById("firstName").value = editEmp.firstName;
      document.getElementById("lastName").value = editEmp.lastName;
      document.getElementById("email").value = editEmp.email;
      document.getElementById("department").value = editEmp.department;
      document.getElementById("role").value = editEmp.role;
      localStorage.removeItem("editEmp");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const id = document.getElementById("empId").value;
      const newEmp = {
        id: id ? parseInt(id) : Date.now(),
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value,
        role: document.getElementById("role").value
      };
      if (id) {
        employees = employees.map(emp => emp.id === newEmp.id ? newEmp : emp);
      } else {
        employees.push(newEmp);
      }
      window.location.href = "index.html";
    });
  }
});

