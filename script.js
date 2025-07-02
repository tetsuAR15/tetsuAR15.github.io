document.addEventListener('DOMContentLoaded', function() {
            const tasksContainer = document.getElementById('tasksContainer');
            console.log('tasksContainer:', tasksContainer); // デバッグ用
            const newTaskInput = document.getElementById('newTask');
            const addTaskBtn = document.getElementById('addTask');
            const clearCompletedBtn = document.getElementById('clearCompleted');

            // サンプルタスク（未定義対策）
            const sampleTasks = [
                'サンプルタスク1',
                'サンプルタスク2'
            ];

            // ローカルストレージからタスクを読み込む
            function loadTasks() {
                const savedTasks = localStorage.getItem('devTodoTasks');
                if (savedTasks) {
                    const tasks = JSON.parse(savedTasks);
                    tasks.forEach(task => {
                        // idも渡す
                        addTaskToDOM(task.text, task.completed, false, task.color, task.id);
                    });
                } else {
                    // サンプルタスクを表示
                    sampleTasks.forEach(task => {
                        addTaskToDOM(task, false, false);
                    });
                }
            }

            // タスクをDOMに追加
            function addTaskToDOM(taskText, isCompleted = false, saveToStorage = true, color = null, id = null) {
                // idが指定されていればそれを使う
                const taskId = id !== null && id !== undefined ? id : (Date.now() + Math.floor(Math.random()*1000));
                const taskElement = document.createElement('div');
                const taskColor = color || document.getElementById('taskColor')?.value || '#1e293b';
                taskElement.className = `flex items-start py-2 px-3 rounded ${isCompleted ? 'bg-gray-800 text-gray-500' : ''}`;
                taskElement.style.backgroundColor = isCompleted ? '#27272a' : taskColor;
                taskElement.dataset.id = taskId;
                taskElement.dataset.color = taskColor;

                const lineNumber = document.createElement('span');
                lineNumber.className = 'line-number mr-3';
                // 修正: tasksContainer.children.length ではなく、現在のタスク数+1
                lineNumber.textContent = tasksContainer.querySelectorAll('div[data-id]').length + 1;

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
                    // highlightHTML(this.nextSibling); // 不要
                });

                // HTMLタグのハイライト
                // highlightHTMLの戻り値をspanに
                const highlightedText = document.createElement('span');
                highlightedText.innerHTML = taskText;

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

            // highlightHTMLは不要なので簡略化
            function highlightHTML(htmlString) {
                const span = document.createElement('span');
                span.innerHTML = htmlString;
                return span;
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
                const taskColor = document.getElementById('taskColor')?.value || '#1e293b';
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