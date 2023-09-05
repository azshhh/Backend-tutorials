// Asynchronous 
console.log('Before');
getUser(1, (user) => {
    getRepositories(user.userName, (repos) => {
        getCommits(repo, (commits) => {
            console.log(commits);
            // CALLBACK HELL
        })
    });
});
console.log('After');

// Synchronous
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.userName);
const commits = getCommits(repos[0]);
console.log(commits);
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from database...');
        callback({ id: id, userName: 'azzy ' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}