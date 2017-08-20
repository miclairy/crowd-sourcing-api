INSERT INTO Users (username, location, email, password)
VALUES ("Sam", "New Zealand", "sam@gmail.com", "sam"),
        ("Louis", "America", "louis@gmail.com", "louis"),
        ("Louise", "Cuba", "louise@gmail.com", "louise"),
        ("Samantha", "Australia", "samantha@gmail.com", "samantha");

INSERT INTO Project (title, subtitle, description, imageUri, target, currentPledged, numberOfBackers)
VALUES ("Robot 2000", "2000 robot series", "Awesome robot", 'uploads/4ec363d15f636a043e2bc7797576e78b', 1000, 0, 0),
        ("Cancer chic", "cancer is terrible", "I have cancer help", 'uploads/007a3b404edc576dd2f99eb0b469b1dc', 20000, 100, 1);

INSERT INTO Reward (amount, description, project)
VALUES (10, "Robot part", 1),
        (0, "love and affection", 2);

INSERT INTO Creators (name, user_id, project)
VALUES ("Sam", 1, 1),
        ("Louise", 3, 2),
        ("Samantha", 4, 2);

INSERT INTO Backers (user_id, amount, project_id)
VALUES (2, 100, 2);


