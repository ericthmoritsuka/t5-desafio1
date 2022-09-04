import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // console.log(newTaskTitle);
    // console.log(typeof newTaskTitle);
    // console.log(newTaskTitle.length);

    //e preciso colocar a condicional pra nao permitir tasks com titulos vazios
    if (newTaskTitle.length) {
      //criamos a task nova
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      };
      //adicionamos ao estado. precisamos usar o spread (...). e como se pegassemos todos os elementos de tasks e adicionassemos o newTask
      setTasks([...tasks, newTask]);
      //resetamos o valor de newTaskTitle pro campo do input ficar em branco
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //encontrando o task pelo index
    const prevTasks = tasks;
    const index = prevTasks.findIndex((task) => task.id === id);

    //(se o id nao existir, o retorno e -1, por isso essa checagem)
    if (index < 0) return;
    //alteramos o valor de isComplete dessa forma pra que, ao clicarmos de novo, ela possa ser mudada outra vez, como o toggle
    prevTasks[index].isComplete = !prevTasks[index].isComplete;
    //aqui basta adicionarmos os tasks novamente (Dentro de [] e com ...)
    setTasks([...prevTasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //da pra fazer assim tambem, mas e mais dificil de entender
    // setTasks((prevTasks) => {
    //   const updatedTasks = prevTasks.filter((goal) => goal.id !== id);
    //   return updatedTasks;
    // });

    //aqui a gente filtra os tasks pra retornar so aqueles que nao tem o id que esta sendo deletado.
    const updatedTasks = tasks.filter((goal) => goal.id !== id);
    //depois, basta setar os tasks com a array criada
    setTasks([...updatedTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
