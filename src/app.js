const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const ul = document.getElementById('tasks');
  ul.innerHTML = '';
  tasks.sort((a, b) => a.priority - b.priority);
  for (const task of tasks) {
    const li = document.createElement('li');
    li.textContent = `${task.title} (Priority ${task.priority})`;
    ul.appendChild(li);
  }
}

function renderPlanner() {
  const container = document.getElementById('planner-hours');
  container.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const block = document.createElement('div');
    block.className = 'hour-block';
    block.dataset.hour = i;
    block.textContent = `${i}:00`;
    const task = tasks.find(t => t.hour === i);
    if (task) {
      const span = document.createElement('span');
      span.textContent = ` - ${task.title}`;
      block.appendChild(span);
    }
    container.appendChild(block);
  }
}

function openModal() {
  document.getElementById('modal').classList.remove('hidden');
  const hourSelect = document.getElementById('task-hour');
  hourSelect.innerHTML = '<option value="">Unassigned</option>';
  for (let i = 0; i < 24; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${i}:00`;
    hourSelect.appendChild(opt);
  }
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('task-title').value = '';
  document.getElementById('task-time').value = '';
}

function addTask() {
  const title = document.getElementById('task-title').value.trim();
  if (!title) return;
  const time = parseInt(document.getElementById('task-time').value) || 0;
  const priority = parseInt(document.getElementById('task-priority').value);
  const hourVal = document.getElementById('task-hour').value;
  const hour = hourVal === '' ? null : parseInt(hourVal);
  tasks.push({ title, time, priority, hour });
  saveTasks();
  renderTasks();
  renderPlanner();
  closeModal();
}

function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(view).classList.remove('hidden');
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + view).classList.add('active');
}

// Event listeners
 document.getElementById('add-task').addEventListener('click', openModal);
 document.getElementById('cancel-task').addEventListener('click', closeModal);
 document.getElementById('save-task').addEventListener('click', addTask);
 document.getElementById('tab-list').addEventListener('click', () => switchView('task-list'));
 document.getElementById('tab-planner').addEventListener('click', () => switchView('planner'));

// Initial render
renderTasks();
renderPlanner();
