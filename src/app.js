App = {
    loading: false,
    contracts: {},
    load: async() => {
        // Load App
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    loadWeb3: async() => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            window.alert("Please connect to Metamask");
        }

        // Modern dapp Browsers
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // Request Account access
                await ethereum.enable()
                    // Account now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Accounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }

        // Non-dapp browsers
        else {
            console.log("Non-Ethereum browser detected. You should consider trying Metamask!");
        }
    },
    loadAccount: async() => {
        //App.account = web3.eth.accounts[0];
        web3.eth.getAccounts().then((acc) => {
            App.account = acc[0];
            // web3.eth.defaultAccount = acc[0];
        })
    },
    loadContract: async() => {
        // Create a javascript version of the smart contracts
        const todoList = await $.getJSON("TodoList.json");
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);

        // Hydrate the smart contracts with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed();
    },

    render: async() => {
        // Prevent double render
        if (App.loading) return;

        // Update Loading State
        App.setLoading(true);

        // Render Account
        $("#account").html(App.account);

        // Render Task
        await App.renderTasks();

        // Update Loading State
        App.setLoading(false);
    },

    createTask: async() => {
        App.setLoading(true);
        const content = $('#newTask').val();
        await App.todoList.createTask(content, {from:App.account});
        window.location.reload();
    },

    renderTasks: async() => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoList.taskCount();
        const $taskTemplate = $('.taskTemplate');
        // Render out each task with a new task template
        for (var i = 1; i <= taskCount; i++) {
            // i represent the id
            // Fetch task from blockchain
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];

            // Html template
            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                // .on('click',App.toggleCompleted)


            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate);
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // Show task
            $newTaskTemplate.show();
        }


    },

    setLoading: (bool_val) => {
        App.loading = bool_val;
        const loader = $("#loader");
        const content = $("#content");
        if (bool_val) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    }
}


$(function() {
    $(window).on('load', () => App.load());
})