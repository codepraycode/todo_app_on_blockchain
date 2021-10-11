const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts) => {
    before(
        async() => {
            this.todoList = await TodoList.deployed();
        }
    );

    // Test the Dapp deployed successfully on the blockchain
    it('deploys successfully', async() => {
        const address = await this.todoList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    // Test task list
    it('lists tasks', async() => {
        // Get the task based on last count
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, "Learn Blockchain");
        assert.equal(task.completed, false);
        assert.equal(taskCount.toNumber(), 1);

    })

    // Creat Tasks
    it('create tasks', async() => {
        const result = await this.todoList.createTask('A New Task');
        const taskCount = await this.todoList.taskCount();

        assert.equal(taskCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.content, 'A New Task');
        assert.equal(event.completed, false);
    })
})