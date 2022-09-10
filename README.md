# t5-desafio1

## **Sobre o primeiro desafio:**
Link para os desafios [Desafio React T5](https://resonant-bearberry-78c.notion.site/Liferay-T5-Intern-Challenges-13c1f8164ec34454bdfe3627d62ae214).

Nesse desafio o objetivo e usar o hook useState para:
- Adicionar uma nova tarefa,
- Remover uma tarefa,
- Marcar e desmarcar uma tarefa como concluída.

Para começar, você precisa acessar o link do repositório do projeto [Repositório do Projeto](https://github.com/rocketseat-education/ignite-template-reactjs-conceitos-do-react).
<details>
<summary>Depois disso, siga os passos para fazer o projeto rodar:</summary>

1. faça um fork do projeto;
2. copie o link do projeto 'forkado';
3.     git clone linkDoProjeto
4.     cd (para a pasta criada com o projeto)
5. Eu instalei o **yarn** globalmente (o yarn é um gerenciador de pacotes que a galera usa pra poder trabalhar com projetos de outras pessoas em lugares diferentes. Acho que ele faz com que a transição de um ambiente pra outro seja mais tranquila) com esse código:
   *     npm install --global yarn
6.     yarn
7. Para inicializar o yarn na pasta do projeto forkado
    *     yarn run
    *     dev
    * (não tenho certeza se usar yarn run dev direto funciona ou yarn dev, não cheguei a testar).
8. A aplicação deve estar rodando em [localhost](http://localhost:8080/).
</details>

***
### **Começando o desafio:**
<br>

handleCreateNewTask(): vai criar uma nova task com um id aleatorio. Nao pode ser criada caso o titulo seja vazio. A funcao ficou assim, ela esta explicada mais abaixo.

    function handleCreateNewTask() {

    if (newTaskTitle.length) {
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

* Aqui nos estamos criando newTask apenas se newTaskTitle existir. Se o campo estiver em branco, nada acontece.
* Usamos Math.random() para gerar um numero aleatorio qualquer entre 0 e 1. Mas existem outras formas de se fazer isso.

        if (newTaskTitle.length) { //se a task tiver um titulo criamos a task nova
          const newTask = {
            id: Math.random(),
            title: newTaskTitle,
            isComplete: false,
          };

* Depois disso utilizamos um spread operator (...) para 'abrir' a lista e inserir a nova task no final dela.
* e, entao, resetamos o campo do titulo.

          setTasks([...tasks, newTask]);
          setNewTaskTitle("");

***

handleToggleTaskCompletion(): é onde vamos trocar o valor de isComplete pra true (ou retornar pra false caso a caixa seja clicada novamente).

    function handleToggleTaskCompletion(id: number) {
      const prevTasks = tasks;
      const index = prevTasks.findIndex((task) => task.id === id);

      if (index < 0) return;

      prevTasks[index].isComplete = !prevTasks[index].isComplete;

      setTasks([...prevTasks]);
    }

* eu inicio a funcao criando uma variavel temporaria que vai receber todas as tasks (e no final, eu vou repassar essa variavel toda pra dentro de tasks)
* eu decidi pegar o id da task e encontrar o index dela pra poder trocar o valor de isComplete daquele item, mas eu tenho certeza que devem existir formas mais otimizadas de fazer isso

        Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
        //encontrando o task pelo index
        const prevTasks = tasks;
        const index = prevTasks.findIndex((task) => task.id === id);

        //(se o id nao existir, o retorno e -1, por isso essa checagem para que nada aconteca caso o id nao exista)
        if (index < 0) return;

* aqui eu troco o isComplete da task que eu achei pelo indice e troco pela negacao dela. Dessa forma, eu garanto um efeito de toggle (eu consigo ligar ou desligar a task, vai que o usuario marca por engano ou decide que nao completou ainda de verdade).
* usamos entao o spread operator pra setar as tasks novamente. Como nao ha elementos pra adicionar (porque estamos passando a lista toda pra dentro das tasks) basta usar [...prevTasks]


        //alteramos o valor de isComplete dessa forma pra que, ao clicarmos de novo, ela possa ser mudada outra vez, como o toggle
        prevTasks[index].isComplete = !prevTasks[index].isComplete;
        //aqui basta adicionarmos os tasks novamente (Dentro de [] e com ...)
        setTasks([...prevTasks]);


***
handleRemoveTask(): essa funcao vai deletar uma task atraves do seu id. Ela recebe o id e vai procurar dentro de Tasks a task referente e retira-la da 'lista'. A nova 'lista' sem aquele item entao e passada para dentro de Tasks.

    function handleRemoveTask(id: number) {
      const updatedTasks = tasks.filter((goal) => goal.id !== id);

      setTasks([...updatedTasks]);
    }


* basicamente eu crio uma lista nova a partir de uma funcao filter.
* Essa filter vai filtrar a lista e retornar apenas os elementos que estiverem dentro dos parametros estabelecidos. No nosso caso, apenas aqueles que tivere o id diferente do id da task que queremos deletar.
* e, ao final, colocamos dentro de Tasks a lista que haviamos criado com o filter (onde nao ha mais a task com a id passada).

        const updatedTasks = tasks.filter((goal) => goal.id !== id);
        //depois, basta setar os tasks com a array criada
        setTasks([...updatedTasks]);