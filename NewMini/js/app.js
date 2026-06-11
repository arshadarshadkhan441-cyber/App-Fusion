const BASE_URL = "backend";

// ================= SHOW SECTION =================

function showSection(id){

  document
  .querySelectorAll(".section")
  .forEach(section=>{
    section.classList.add("hidden");
  });

  const currentSection =
  document.getElementById(id);

  if(currentSection){
    currentSection.classList.remove("hidden");
  }
}


// ================= NOTIFICATION =================

function showNotification(message){

  const notification =
  document.getElementById("notification");

  if(!notification) return;

  notification.innerText = message;

  notification.style.display = "block";

  setTimeout(()=>{

    notification.style.display = "none";

  },3000);
}


// ================= SIGNUP =================

async function signup(){

  const formData = new FormData();

  formData.append(
    "name",
    document.getElementById("signupName").value
  );

  formData.append(
    "email",
    document.getElementById("signupEmail").value
  );

  formData.append(
    "password",
    document.getElementById("signupPassword").value
  );

  formData.append(
    "role",
    document.getElementById("signupRole").value
  );

  try{

    const response = await fetch(
      "backend/auth/signup.php",
      {
        method:"POST",
        body:formData
      }
    );

    const text = await response.text();

    console.log(text);

    const data = JSON.parse(text);

    if(data.status === "success"){

      alert("Signup Successful");

      window.location = "login.html";

    }else{

      alert(data.message);
    }

  }catch(error){

    console.log(error);

    alert("Backend Error");
  }

}


// ================= LOGIN =================

async function login(){

  const formData = new FormData();

  formData.append(
    "email",
    document.getElementById("loginEmail").value
  );

  formData.append(
    "password",
    document.getElementById("loginPassword").value
  );

  formData.append(
    "role",
    document.getElementById("loginRole").value
  );

  const response = await fetch(
    `${BASE_URL}/auth/login.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    localStorage.setItem(
      "role",
      data.role
    );

    showNotification("Login Successful");

    setTimeout(()=>{

      if(data.role === "admin"){

        window.location = "admin.html";

      }else{

        window.location = "dashboard.html";
      }

    },1000);

  }else{

    alert("Invalid Credentials");
  }
}


// ================= LOGOUT =================

async function logout(){

  await fetch(
    `${BASE_URL}/auth/logout.php`
  );

  localStorage.clear();

  window.location = "login.html";
}


// ================= ADD PROJECT =================

async function addProject(){

  const formData = new FormData();

  formData.append(
    "title",
    document.getElementById("projectTitle").value
  );

  formData.append(
    "description",
    document.getElementById("projectDescription").value
  );

  formData.append(
    "status",
    document.getElementById("projectStatus").value
  );

  formData.append(
    "deadline",
    document.getElementById("projectDeadline").value
  );

  const response = await fetch(
    `${BASE_URL}/projects/add_project.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Project Added");

    loadProjects();

  }else{

    alert("Failed To Add Project");
  }
}


// ================= LOAD PROJECTS =================

async function loadProjects(){

  const response = await fetch(
    `${BASE_URL}/projects/get_projects.php`
  );

  const projects = await response.json();

  const projectList =
  document.getElementById("projectList");

  if(!projectList) return;

  projectList.innerHTML = "";

  projects.forEach(project=>{

    projectList.innerHTML += `

      <div class="project-card">

        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <p>Status: ${project.status}</p>

        <p>Deadline: ${project.deadline}</p>

        <button
class="edit-btn"
onclick="updateProject(${project.id})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteProject(${project.id})">
Delete
</button>

<button
class="complete-btn"
onclick="changeStatus(${project.id})">
update Status
</button>

      </div>

    `;

  });

  const totalProjects =
  document.getElementById("totalProjects");

  if(totalProjects){
    totalProjects.innerText =
    projects.length;
  }
}

//Change project status

async function changeStatus(id) {

    const status = prompt(
        "Enter project status (Pending, In Progress, Completed)"
    );

    if(!status) return;

    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", status);

    try {

        const response = await fetch(
            `${BASE_URL}/projects/change_status.php`,
            {
                method: "POST",
                body: formData
            }
        );

        const text = await response.text();

        console.log("Raw Response:", text);

        const data = JSON.parse(text);

        console.log(data);

        if(data.status === "success") {

            showNotification("Status Updated");

            loadProjects();

        } else {

            alert(data.message);

        }

    } catch(error) {

        console.error("Fetch Error:", error);

    }
}


// ================= DELETE PROJECT =================

async function deleteProject(id){

  const formData = new FormData();

  formData.append("id",id);

  const response = await fetch(
    `${BASE_URL}/projects/delete_project.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "deleted"){

    showNotification("Project Deleted");

    loadProjects();
  }
}
async function updateProject(id){

  const title =
  prompt("Enter New Project Title");

  const description =
  prompt("Enter New Description");

  const status =
  prompt("Enter Status");

  const deadline =
  prompt("Enter Deadline");

  const formData = new FormData();

  formData.append("id",id);
  formData.append("title",title);
  formData.append("description",description);
  formData.append("status",status);
  formData.append("deadline",deadline);

  const response = await fetch(
    `${BASE_URL}/projects/update_project.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Project Updated");

    loadProjects();
  }
}

// ================= ADD CLIENT =================

async function addClient(){

  const formData = new FormData();

  formData.append(
    "name",
    document.getElementById("clientName").value
  );

  formData.append(
    "email",
    document.getElementById("clientEmail").value
  );

  formData.append(
    "company",
    document.getElementById("clientCompany").value
  );

  const response = await fetch(
    `${BASE_URL}/clients/add_client.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Client Added");

    loadClients();
  }
}


// ================= LOAD CLIENTS =================

async function loadClients(){

  const response = await fetch(
    `${BASE_URL}/clients/get_clients.php`
  );

  const clients = await response.json();

  const clientList =
  document.getElementById("clientList");

  if(!clientList) return;

  clientList.innerHTML = "";

  clients.forEach(client=>{

    clientList.innerHTML += `

      <div class="client-card">

        <h3>${client.name}</h3>

        <p>${client.email}</p>

        <p>${client.company}</p>

       <button
class="edit-btn"
onclick="updateClient(${client.id})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteClient(${client.id})">
Delete
</button>


      </div>

    `;
  });

  const totalClients =
  document.getElementById("totalClients");

  if(totalClients){
    totalClients.innerText =
    clients.length;
  }
}


// ================= DELETE CLIENT =================

async function deleteClient(id){

  const formData = new FormData();

  formData.append("id",id);

  const response = await fetch(
    `${BASE_URL}/clients/delete_client.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "deleted"){

    showNotification("Client Deleted");

    loadClients();
  }
}
async function updateClient(id){

  const name =
  prompt("Enter Client Name");

  const email =
  prompt("Enter Client Email");

  const company =
  prompt("Enter Company");

  const formData = new FormData();

  formData.append("id",id);
  formData.append("name",name);
  formData.append("email",email);
  formData.append("company",company);

  const response = await fetch(
    `${BASE_URL}/clients/update_client.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Client Updated");

    loadClients();
  }
}

// ================= ADD TEAM =================

async function addTeam(){

  const formData = new FormData();

  formData.append(
    "name",
    document.getElementById("teamName").value
  );

  formData.append(
    "role",
    document.getElementById("teamRole").value
  );

  formData.append(
    "email",
    document.getElementById("teamEmail").value
  );

  const response = await fetch(
    `${BASE_URL}/team/add_team.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Team Member Added");

    loadTeam();
  }
}


// ================= LOAD TEAM =================

async function loadTeam(){

  const response = await fetch(
    `${BASE_URL}/team/get_team.php`
  );

  const team = await response.json();

  const teamList =
  document.getElementById("teamList");

  if(!teamList) return;

  teamList.innerHTML = "";

  team.forEach(member=>{

    teamList.innerHTML += `

      <div class="team-card">

        <h3>${member.name}</h3>

        <p>${member.role}</p>

        <p>${member.email}</p>

        <button
class="edit-btn"
onclick="updateTeam(${member.id})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteTeam(${member.id})">
Delete
</button>

      </div>

    `;
  });

  const totalTeam =
  document.getElementById("totalTeam");

  if(totalTeam){
    totalTeam.innerText = team.length;
  }
}


// ================= DELETE TEAM =================

async function deleteTeam(id){

  const formData = new FormData();

  formData.append("id",id);

  const response = await fetch(
    `${BASE_URL}/team/delete_team.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "deleted"){

    showNotification("Team Deleted");

    loadTeam();
  }
}
async function updateTeam(id){

  const name =
  prompt("Enter Team Name");

  const role =
  prompt("Enter Team Role");

  const email =
  prompt("Enter Team Email");

  const formData = new FormData();

  formData.append("id",id);
  formData.append("name",name);
  formData.append("role",role);
  formData.append("email",email);

  const response = await fetch(
    `${BASE_URL}/team/update_team.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "success"){

    showNotification("Team Updated");

    loadTeam();
  }
}

// ================= FILE UPLOAD =================

async function uploadFile(){

  const fileInput =
  document.getElementById("fileInput");

  if(!fileInput.files.length){

    alert("Select File");

    return;
  }

  const formData = new FormData();

  formData.append(
    "file",
    fileInput.files[0]
  );

  const response = await fetch(
    `${BASE_URL}/uploads/upload.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "uploaded"){

    showNotification("File Uploaded");

    loadUploads();
  }
}


// ================= LOAD UPLOADS =================

async function loadUploads(){

  const response = await fetch(
    `${BASE_URL}/uploads/get_uploads.php`
  );

  const uploads = await response.json();

  const fileList =
  document.getElementById("fileList");

  if(!fileList) return;

  fileList.innerHTML = "";

  uploads.forEach(file=>{

    fileList.innerHTML += `

      <div class="file-card">

        <h3>${file.file_name}</h3>

        <button
        class="delete-btn"
        onclick="deleteUpload(${file.id})">

        Delete

        </button>

      </div>

    `;
  });

}


// ================= DELETE UPLOAD =================

async function deleteUpload(id){

  const formData = new FormData();

  formData.append("id",id);

  const response = await fetch(
    `${BASE_URL}/uploads/delete_uploads.php`,
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  if(data.status === "deleted"){

    showNotification("File Deleted");

    loadUploads();
  }
}

// For Admin Side



// Load everything when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadStats();
    loadUsers();
    //loadProjects();
});

function loadStats() {
    fetch(`${BASE_URL}/analytics/dashboard_stats.php`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("totalUsers").innerText = data.users;
            document.getElementById("totalProjects").innerText = data.projects;
        })
        .catch(err => console.log(err));
}

function loadUsers() {
    fetch(`${BASE_URL}/users/get_users.php`)
        .then(res => res.json())
        .then(users => {

            let html = "";

            users.forEach(user => {
                html += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>

                    <button onclick="deleteUser(${user.id})" class="delete-btn">
                        Delete
                    </button>
                </div>
                `;
            });

            document.getElementById("userList").innerHTML = html;
        });
}



// ================= INITIAL LOAD =================

window.onload = function(){

  loadProjects();

  loadClients();

  loadTeam();

  loadUploads();

}