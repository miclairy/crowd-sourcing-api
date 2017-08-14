INSERT INTO Users (username, location, email, password)
VALUES ("Sam", "New Zealand", "sam@gmail.com", "sam"),
        ("Louis", "America", "louis@gmail.com", "louis"),
        ("Louise", "Cuba", "louise@gmail.com", "louise"),
        ("Samantha", "Australia", "samantha@gmail.com", "samantha");

INSERT INTO Project (title, subtitle, description, imageUri, imageId, target, currentPledged, numberOfBackers)
VALUES ("Robot 2000", "2000 robot series", "Awesome robot", "https://image.freepik.com/free-vector/coloured-robot-design_1148-9.jpg", 1, 1000, 0, 0),
        ("Cancer chic", "cancer is terrible", "I have cancer help", "http://www.healthline.com/hlcmsresource/images/News/childrens-health/092016_childrencancer_THUMB_LARGE.jpg", 2, 20000, 1, 100);

INSERT INTO Reward (amount, description, project)
VALUES (10, "Robot part", 1),
        (0, "love and affection", 2);

INSERT INTO Creators (name, user_id, project)
VALUES ("Sam", 1, 1),
        ("Louise", 3, 2),
        ("Samantha", 4, 2);

INSERT INTO Backers (user_id, amount, project_id)
VALUES (2, 100, 2)


