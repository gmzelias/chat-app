[{
    id: 'asdsadas3',
    name: 'Elias',
    room:'The Office Fans'
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)


class Users{
constructor(){
    this.users = [];
}
addUser(id, name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
};

removeUser(id){
    var user = this.users.filter((user)=>{
        return user.id === id;
    })[0];

    if (user){
        this.users = this.users.filter((user)=>{
           return user.id !== id
        });
    };
   
    return user;
};

getUser(id){
 return this.users.filter((user)=>{
     return user.id === id;
 })[0];
};

getUserList(room){
 var users = this.users.filter((user)=>{
    return user.room === room;
 });
 var nameArray = users.map((user)=>{
    return user.name;
 });
 return nameArray;
};



}


module.exports = {Users};

/*class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getUserDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
};

var me = new Person('Elias',30);
var description = me.getUserDescription();
console.log(description);*/