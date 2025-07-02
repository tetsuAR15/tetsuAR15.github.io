document.addEventListener('DOMContentLoaded', function() {
            const tasksContainer = document.getElementById('tasksContainer');
            const newTaskInput = document.getElementById('newTask');
            const addTaskBtn = document.getElementById('addTask');
            const clearCompletedBtn = document.getElementById('clearCompleted');

            // ローカルストレージからタスクを読み込む
            function loadTasks() {
                const savedTasks = localStorage.getItem('devTodoTasks');
                if (savedTasks) {
                    const tasks = JSON.parse(savedTasks);
                    tasks.forEach(task => {
                        addTaskToDOM(task.text, task.completed, false, task.color);
                    });
                } else {
                    // ローカルストレージになければサンプルタスクを表示
                    sampleTasks.forEach(task => {
                        addTaskToDOM(task, false, false);
                    });
                }
            }

            // タスクをDOMに追加
            function addTaskToDOM(taskText, isCompleted = false, saveToStorage = true, color = null) {
                const taskId = Date.now() + Math.floor(Math.random()*1000); // 衝突防止
                const taskElement = document.createElement('div');
                const taskColor = color || document.getElementById('taskColor')?.value || '#1e293b';
                taskElement.className = `flex items-start py-2 px-3 rounded ${isCompleted ? 'bg-gray-800 text-gray-500' : ''}`;
                taskElement.style.backgroundColor = isCompleted ? '#27272a' : taskColor;
                taskElement.dataset.id = taskId;
                taskElement.dataset.color = taskColor;
                
                const lineNumber = document.createElement('span');
                lineNumber.className = 'line-number mr-3';
                lineNumber.textContent = tasksContainer.children.length + 1;

                const taskContent = document.createElement('div');
                taskContent.className = 'flex-1 flex items-center';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'mr-3 h-4 w-4';
                checkbox.checked = isCompleted;
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        taskElement.classList.add('text-gray-500');
                        taskElement.style.backgroundColor = '#27272a';
                    } else {
                        taskElement.classList.remove('text-gray-500');
                        taskElement.style.backgroundColor = taskElement.dataset.color;
                    }
                    updateTaskInStorage(taskId, this.checked, taskElement.dataset.color);
                    highlightHTML(this.nextSibling);
                });

                // HTMLタグのハイライト
                const highlightedText = highlightHTML(taskText);
                
                taskContent.appendChild(checkbox);
                taskContent.appendChild(highlightedText);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'text-red-400 hover:text-red-300 ml-4';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.addEventListener('click', function() {
                    taskElement.classList.add('opacity-0', 'transform', '-translate-x-2', 'transition-all', 'duration-300');
                    setTimeout(() => {
                        taskElement.remove();
                        removeTaskFromStorage(taskId);
                        updateLineNumbers();
                    }, 300);
                });
                
                taskElement.appendChild(lineNumber);
                taskElement.appendChild(taskContent);
                taskElement.appendChild(deleteBtn);
                
                tasksContainer.appendChild(taskElement);

                if (saveToStorage) {
                    saveTaskToStorage(taskId, taskText, isCompleted, taskColor);
                }

                updateLineNumbers();
            }

            // HTMLタグをシンタックスハイライト
            function highlightHTML(htmlString) {
                if (typeof htmlString === 'string') {
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = htmlString;
                    return wrapper;
                }
                return htmlString;
            }

            // ライン番号を更新
            function updateLineNumbers() {
                const tasks = tasksContainer.querySelectorAll('div[data-id]');
                tasks.forEach((task, index) => {
                    task.querySelector('.line-number').textContent = index + 1;
                });
            }

            // タスクをストレージに保存
            function saveTaskToStorage(id, text, completed, color) {
                let tasks = [];
                const savedTasks = localStorage.getItem('devTodoTasks');
                if (savedTasks) {
                    tasks = JSON.parse(savedTasks);
                }
                tasks.push({ id, text, completed, color });
                localStorage.setItem('devTodoTasks', JSON.stringify(tasks));
            }

            function updateTaskInStorage(id, completed, color) {
                const savedTasks = localStorage.getItem('devTodoTasks');
                if (savedTasks) {
                    let tasks = JSON.parse(savedTasks);
                    const taskIndex = tasks.findIndex(t => t.id == id);
                    if (taskIndex !== -1) {
                        tasks[taskIndex].completed = completed;
                        if (color) tasks[taskIndex].color = color;
                        localStorage.setItem('devTodoTasks', JSON.stringify(tasks));
                    }
                }
            }
            function removeTaskFromStorage(id) {
                const savedTasks = localStorage.getItem('devTodoTasks');
                if (savedTasks) {
                    let tasks = JSON.parse(savedTasks);
                    tasks = tasks.filter(t => t.id != id);
                    localStorage.setItem('devTodoTasks', JSON.stringify(tasks));
                }
            }
            addTaskBtn.addEventListener('click', function() {
                const taskText = newTaskInput.value.trim();
                const taskColor = document.getElementById('taskColor').value;
                if (taskText) {
                    addTaskToDOM(taskText, false, true, taskColor);
                    newTaskInput.value = '';
                }
            });

            newTaskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTaskBtn.click();
                }
            });

            clearCompletedBtn.addEventListener('click', function() {
                // 修正: 完了タスクをチェックボックスで判定
                const completedTasks = tasksContainer.querySelectorAll('div[data-id]');
                completedTasks.forEach(task => {
                    const checkbox = task.querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox.checked) {
                        task.classList.add('opacity-0', 'transform', '-translate-x-2', 'transition-all', 'duration-300');
                        setTimeout(() => {
                            const taskId = task.dataset.id;
                            task.remove();
                            removeTaskFromStorage(taskId);
                            updateLineNumbers();
                        }, 300);
                    }
                });
            });
            loadTasks();
        });