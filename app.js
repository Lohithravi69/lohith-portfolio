// Example enhancement: Dynamic Add Project modal

// Uncomment and adapt if using the HTML/modal features from previous responses.
// const addProjectBtn = document.getElementById('addProjectButton');
// const addProjectModal = document.getElementById('addProjectModal');
// const closeModal = document.getElementById('closeModal');
// const projectForm = document.getElementById('projectForm');
// const projectList = document.querySelector('.project-list');

// if (addProjectBtn) {
//   addProjectBtn.onclick = () => {
//     addProjectModal.style.display = 'block';
//   };
// }
// if (closeModal) {
//   closeModal.onclick = () => {
//     addProjectModal.style.display = 'none';
//   };
// }
// window.onclick = function(event) {
//   if (event.target == addProjectModal) {
//     addProjectModal.style.display = 'none';
//   }
// }
// if (projectForm) {
//   projectForm.onsubmit = function(e) {
//     e.preventDefault();
//     const title = document.getElementById('projectTitle').value;
//     const description = document.getElementById('projectDescription').value;
//     const image = document.getElementById('projectImage').value;
//     const link = document.getElementById('projectLink').value;
//
//     const card = document.createElement('div');
//     card.className = 'project-card';
//     if (image) {
//       const imgEl = document.createElement('img');
//       imgEl.src = image;
//       imgEl.alt = title + ' Image';
//       card.appendChild(imgEl);
//     }
//     const titleEl = document.createElement('h4');
//     titleEl.textContent = title;
//     card.appendChild(titleEl);
//     const descEl = document.createElement('p');
//     descEl.textContent = description;
//     card.appendChild(descEl);
//     if (link) {
//       const linkEl = document.createElement('a');
//       linkEl.href = link;
//       linkEl.target = '_blank';
//       linkEl.textContent = 'Live Demo';
//       linkEl.style.color = "#007bff";
//       card.appendChild(linkEl);
//     }
//     projectList.insertBefore(card, addProjectBtn);
//     projectForm.reset();
//     addProjectModal.style.display = 'none';
//   };
// }

// // Add more JS as you enhance your profile editing, etc.

