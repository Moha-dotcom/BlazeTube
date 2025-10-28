
CREATE TABLE videos (
    id VARCHAR(50) PRIMARY KEY,        -- UUID for each video
    user_id VARCHAR(50) NOT NULL,      -- reference to users.id
    video_name VARCHAR(255) NOT NULL,  -- original filename
    video_key VARCHAR(255) NOT NULL,   -- unique storage key in Filebase (UUID + filename)
    video_url TEXT NOT NULL,           -- URL returned from Filebase
    size BIGINT NOT NULL,              -- file size in bytes
    mime_type VARCHAR(50) NOT NULL,    -- e.g., video/mp4
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);