console.log('Before');

// In this the callback fxn is called when the result of async operation is ready.
getUser(1, (user) => {
    console.log(user);
});

// console.log(user); // this returns 'undefined, bcoz at the time of getUser() is called setTimeout fxn will not be available with object. Since it is delayed for 2 seconds.
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from database...');
        callback({ id: id, userName: 'azzy ' });
    }, 2000);
}