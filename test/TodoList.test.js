const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts)=>{
    before(
        async ()=>{
            this.todoList = await TodoList.deployed();
        }
    );

    // Test the Dapp deployed successfully on the blockchain
    it('deploys successfully', async () =>{
        const address = await this.todoList.address;
        assert.notEqual(address,0x0);
        assert.notEqual(address,'');
        assert.notEqual(address,null);
        assert.notEqual(address,undefined);
    });

    //
})