console.log('Before');

getUser(1, (user) => {
    getRepositories(user.userName, (repos) => {
        console.log(repos);
    }); 
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from database...');
        callback({ id: id, userName: 'azzy ' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback (['repo1', 'repo2', 'repo3']);
    }, 2000);
}