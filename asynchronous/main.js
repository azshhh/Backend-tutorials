console.log('Before');
const user = getUser(1);
console.log(user); // this returns 'undefined, bcoz at the time of getUser() is called setTimeout fxn will not be available with object. Since it is delayed for 2 seconds.
console.log('After');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading user from database...');
        return { id: id, userName: 'azzy ' }
    }, 2000);
}