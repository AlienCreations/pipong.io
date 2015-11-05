# Test agents
INSERT INTO agents
SET id     = 1,
    aud    = 'd41d8cd98f00b204e9800998ecf8427e',
    secret = 'a8f5f167f44f4964e6c998dee827110c',
    name   = 'Table 1';
INSERT INTO agents
SET id     = 2,
    aud    = 'a9e1f2941aa53ca4563833d9dc68f6b2',
    secret = 'a2c9be584c5ecff6966789bf94f3e53e',
    name   = 'Table 2';

# Test player 1
INSERT INTO players
SET id                = 1,
    avatar_1          = 'foo.png',
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
SET id                = 2,
    avatar_1          = 'foo.png',
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
SET id                = 1,
    name              = 'Test Location',
    uri               = 'test-location',
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

INSERT INTO locations
SET id                = 2,
    name              = 'Test Delete Location',
    uri               = 'test-delete-location',
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Player 1 to manage test location
INSERT INTO location_managers
SET player_id         = 1,
    location_id       = 1,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Player 2 to manage the "delete" location
INSERT INTO location_managers
SET player_id         = 2,
    location_id       = 2,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Test table
INSERT INTO tables
SET id                = 1,
    agent_id          = 1,
    location_id       = 1,
    short_code        = '17daf4', # id plus agent aud, max 6 chars
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Test delete table
INSERT INTO tables
SET id                = 2,
    agent_id          = 2,
    location_id       = 2,
    short_code        = '28daf4', # id plus agent aud, max 6 chars
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;

# Test game between player 1 and player 2
INSERT INTO games
SET id                      = 1,
    table_id                = 1,
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

# Player 1 assign to table 2 (delete test table)
INSERT INTO player_tables
SET player_id         = 1,
    table_id          = 2,
    status            = 1,
    created_date      = '2015-06-01',
    created_unix_time = 1434386763;
