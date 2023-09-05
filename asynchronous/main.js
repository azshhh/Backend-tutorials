console.log('Before');

// getUser returns a promise resolving a user object
getUser(1)
    // getRepositories returns a promise resolving an array of repos for that user
    .then(user => getRepositories(user.userName))
    // above then has a fxn that returns a value which is wrapped inside a promise
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits: ', commits))
    .catch(err => console.log('Error: ', err));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database...');
            resolve({ id: id, userName: 'azzy ' });
        }, 2000);
    })

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub Repos...");
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub commits...");
            resolve(['commit']);
        }, 2000);
    });
}