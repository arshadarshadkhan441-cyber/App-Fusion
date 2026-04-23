const BASE = "backend";

/* ================= AUTH ================= */

function checkLogin(){
  return fetch(BASE + "/check_login.php").then(res => res.text());
}

function loadAuth(){
  let auth = document.getElementById("authArea");
  if(!auth) return;

  checkLogin().then(status => {
    if(status === "logged_in"){
      auth.innerHTML = `
        <a href="dashboard.html">Dashboard</a>
        <a href="#" onclick="logout()">Logout</a>
      `;
    } else {
      auth.innerHTML = `
        <a href="login.html">Login</a>
        <a href="signup.html">Signup</a>
      `;
    }
  });
}

function logout(){
  fetch(BASE + "/logout.php").then(() => {
    window.location = "index.html";
  });
}

/* ================= COURSES ================= */

function loadCourses(){
  fetch(BASE + "/get_courses.php")
  .then(res => res.json())
  .then(data => displayCourses(data));
}

function displayCourses(data){
  let container = document.getElementById("courses");
  if(!container) return;

  container.innerHTML = "";

  data.forEach(c => {
    container.innerHTML += `
      <div class="course">
        <h3>${c.title}</h3>
        <p>${c.category}</p>
        <p>$${c.price}</p>
        <button onclick="addToCart(${c.id})">Add to Cart</button>
      </div>
    `;
  });
}

/* ================= CART ================= */

function addToCart(courseId){
  checkLogin().then(status => {

    if(status === "not_logged_in"){
      localStorage.setItem("pendingCourse", courseId);
      window.location = "login.html";
    } else {
      fetch(BASE + "/add_to_cart.php", {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:`course_id=${courseId}`
      })
      .then(() => alert("Added to cart"));
    }

  });
}

function loadCart(){
  let container = document.getElementById("cartItems");
  if(!container) return;

  fetch(BASE + "/get_cart.php")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";
    data.forEach(c => {
      container.innerHTML += `
       <div class="class="course">
        <h3>${c.title}</h3>
        
        <p>$${c.price}</p>
          <button onclick="removeItem(${c.id})">Remove</button>
   </div>
        
      `;
    });
  });
}

function removeItem(id){
  fetch(BASE + "/remove_from_cart.php", {
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:`course_id=${id}`
  }).then(() => loadCart());
}

function checkout(){
  fetch(BASE + "/checkout.php")
  .then(() => {
    alert("Purchased!");
    loadCart();
  });
}

/* ================= DASHBOARD ================= */

function loadPurchases(){
  let container = document.getElementById("purchases");
  if(!container) return;

  fetch(BASE + "/get_purchases.php")
  .then(res => res.json())
  .then(data => {

    container.innerHTML = "";

    data.forEach(c => {

      container.innerHTML += `
        <div class="course">

          <h3>${c.title}</h3>
          <p>Price: $${c.price}</p>

          <!-- ACTION BUTTONS -->
          <div class="actions">

            <button onclick="viewCourse(${c.id})">
              ▶ Watch Course
            </button>

          </div>

        </div>
      `;

    });

  });
}

function viewCourse(courseId){
  window.location = "course.html?course_id=" + courseId;
}

function loadCoursePage(){

  let params = new URLSearchParams(window.location.search);
  let courseId = params.get("course_id");

  if(!courseId) return;

  // Load course title
  fetch(BASE + "/get_courses.php")
  .then(res => res.json())
  .then(data => {
    let course = data.find(c => c.id == courseId);
    if(course){
      document.getElementById("courseTitle").innerText = course.title;
    }
  });

  // Load lessons
  fetch(BASE + `/get_lessons.php?course_id=${courseId}`)
  .then(res => res.json())
  .then(data => {

    let container = document.getElementById("lessons");
    container.innerHTML = "";

    data.forEach(l => {
      container.innerHTML += `
        <div class="lesson">
          <h4>${l.title}</h4>

          <iframe width="300" height="180"
            src="${l.video_url}" 
            frameborder="0" allowfullscreen>
          </iframe>

          <br>

          <button onclick="watchLesson(${l.id}, ${courseId})">
            ▶ Mark as Watched
          </button>
        </div>
      `;
    });

  });

}

/* MARK COMPLETE + UPDATE PROGRESS */
function watchLesson(lessonId, courseId){

  fetch(BASE + "/mark_complete.php", {
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:`lesson_id=${lessonId}`
  })
  .then(() => {
    alert("Lesson completed!");
    loadProgress(courseId);
  });

}


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadAuth();
  loadCourses();
  loadCart();
  loadPurchases();
});