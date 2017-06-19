const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Test Room'
    },
    {
      id: '2',
      name: 'Jen',
      room: 'Test Room Two'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Test Room'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users.length).toEqual(1);
  });

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let userId = '99';
    let user = users.removeUser(userId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let userId = '2';
    let user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('it should not find user', () => {
    let userId = '80';
    let user = users.getUser(userId);

    expect(user).toBe(undefined);
  });

  it('should return names for Test Room', () => {
    let userList = users.getUserList('Test Room');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for Test Room Two', () => {
    let userList = users.getUserList('Test Room Two');

    expect(userList).toEqual(['Jen']);
  });

});

//there's no need for a done argument when it's a synchronous function
