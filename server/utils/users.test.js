const expect = require('expect');

const {Users} = require ('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:1,
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id:2,
            name: 'Elias',
            room: 'React Course'
        },
        {
            id:3,
            name: 'Jen',
            room: 'Node Course'
        }
    ]
    });

    it ('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: 'asdasd',
            name:'Elias',
            room: 'Sacawi'
        };
        var resUser = users.addUser(user.id, user.name,user.room)
        expect(users.users).toEqual([user]);
    });

    it ('Should return names for Node course', ()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike','Jen'])

    });

    it ('Should return names for React course', ()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Elias'])

    });

    it('Should remove a user', ()=>{
        var userId = 1;
        var user = users.removeUser(userId)

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it ('Should not remove a user', ()=>{
        var userId = 98;
        var user = users.removeUser(userId)

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it ('Should find user', ()=>{
        var userId = 2;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('Should not find a user', ()=>{
        var userId = 5;
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });


});