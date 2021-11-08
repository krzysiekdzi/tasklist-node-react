create table users(
    id serial primary key,
    email text,
    joined timestamp,
    salt text,
    passwordHash text
);

create table tasks(
    createId int references users(id) not null,
    id serial primary key,
    title text,
    description text,
    added timestamp,
    deadline timestamp,
    state boolean
);