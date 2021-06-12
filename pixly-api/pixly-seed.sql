-- test user has the password "password"

INSERT INTO users (username, password)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO albums (name, is_private, creator)
VALUES ('test album', false, 'testuser')