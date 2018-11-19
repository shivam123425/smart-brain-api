BEGIN TRANSACTION;

INSERT INTO login
    (hash,email)
VALUES
    ('$2a$10$O9/QpK4krD6y7hlWEy3rp.RSS1py15D/lBc7UW6BpdvaBRAwgfrhi', 'shivam@example.com');

INSERT INTO users
    (name,email,entries, joined, age, pet)
VALUES
    ('Shivam', 'shivam@example.com', 5, '2018-01-01', 21, 'Diagro');

COMMIT;