# Test player 1
INSERT INTO players
SET avatar_1          = 'foo.png',
    avatar_2          = 'bar.png',
    created_date      = '2015-06-01',
    created_unix_time = 1434386763,
    email             = 'test@test.com',
    losses            = 0,
    name              = 'First User',
    password          = '$2a$10$Wraxvne0BeqRE8A7WEC..uaIAo3iKxo6RUim1ko8WmPnHTGLvoCEm',
    username          = 'Tester1',
    wins              = 0;

# Test player 2
INSERT INTO players
SET avatar_1          = 'foo.png',
    avatar_2          = 'bar.png',
    created_date      = '2015-06-01',
    created_unix_time = 1434386763,
    email             = 'test2@test.com',
    losses            = 0,
    name              = 'Second User',
    password          = '$2a$10$Wraxvne0BeqRE8A7WEC..uaIAo3iKxo6RUim1ko8WmPnHTGLvoCEm',
    username          = 'Tester2',
    wins              = 0;

# Player 2 will have a Facebook account
INSERT INTO facebook_mapping
SET facebook_id = '12345',
    player_id   = 2;

# Test location
INSERT INTO locations
SET name              = 'Test Location',
    uri               = 'test-location',
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Test table
INSERT INTO tables
SET code              = '7daf44e9238cbd7bad15b672f559d5d6',
    short_code        = '17daf4', # id plus code, max 6 chars
    location_id       = 1,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Test game between player 1 and player 2
INSERT INTO games
SET table_id                = 1,
    player_1_id             = 1,
    player_1_offense_points = 0,
    player_1_defense_points = 0,
    player_1_final_status   = NULL,
    player_2_id             = 2,
    player_2_offense_points = 0,
    player_2_defense_points = 0,
    player_2_final_status   = NULL,
    status                  = 1,
    created_date            = '2015-06-01',
    created_unix_time       = 1434386763;

# Player 1 assign to table 1
INSERT INTO player_tables
SET player_id         = 1,
    table_id          = 1,
    status            = 1,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Player 2 assign to table 1
INSERT INTO player_tables
SET player_id         = 2,
    table_id          = 1,
    status            = 1,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;
