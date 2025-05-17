CREATE TABLE `channel` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`description` text,
	`image_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `video` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`description` text NOT NULL,
	`summary` text NOT NULL,
	`video_id` text(255) NOT NULL,
	`channel_name` text(255) NOT NULL,
	`channel_id` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`duration` integer NOT NULL,
	`time_to_generate_summary` integer NOT NULL,
	`video_published_at` integer DEFAULT (unixepoch()) NOT NULL,
	`thumbnail_url` text NOT NULL,
	FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON UPDATE no action ON DELETE cascade
);
