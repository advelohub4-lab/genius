CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobId` int NOT NULL,
	`status` enum('applied','pending','accepted','rejected','completed') NOT NULL DEFAULT 'applied',
	`notes` text,
	`appliedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_application_idx` UNIQUE(`userId`,`jobId`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`company` varchar(160) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(80) NOT NULL,
	`url` varchar(500) NOT NULL,
	`countries` text NOT NULL,
	`skills` text NOT NULL,
	`remoteLabel` varchar(40) NOT NULL DEFAULT 'Remote / Online',
	`taskType` varchar(100),
	`status` enum('draft','published','closed','archived') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`closingDate` timestamp,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(8) NOT NULL DEFAULT 'USD',
	`network` varchar(40) NOT NULL DEFAULT 'BEP20',
	`token` varchar(20) NOT NULL DEFAULT 'USDT',
	`walletAddress` varchar(128) NOT NULL,
	`transactionHash` varchar(180),
	`status` enum('required','submitted','verification_pending','verified','rejected','additional_info_required') NOT NULL DEFAULT 'required',
	`rejectionReason` text,
	`submittedAt` timestamp,
	`verifiedAt` timestamp,
	`adminReviewer` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `transaction_hash_idx` UNIQUE(`transactionHash`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `firstName` varchar(80);--> statement-breakpoint
ALTER TABLE `users` ADD `lastName` varchar(80);--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(60);--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(40);--> statement-breakpoint
ALTER TABLE `users` ADD `country` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `countryCode` varchar(8);--> statement-breakpoint
ALTER TABLE `users` ADD `accountStatus` enum('pending','active','suspended') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `activationStatus` enum('not_activated','payment_submitted','verification_pending','activated','rejected') DEFAULT 'not_activated' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `activatedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `username_idx` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_adminReviewer_users_id_fk` FOREIGN KEY (`adminReviewer`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `application_user_idx` ON `applications` (`userId`);--> statement-breakpoint
CREATE INDEX `application_job_idx` ON `applications` (`jobId`);--> statement-breakpoint
CREATE INDEX `job_status_idx` ON `jobs` (`status`);--> statement-breakpoint
CREATE INDEX `job_category_idx` ON `jobs` (`category`);--> statement-breakpoint
CREATE INDEX `payment_user_idx` ON `payments` (`userId`);--> statement-breakpoint
CREATE INDEX `payment_status_idx` ON `payments` (`status`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `account_status_idx` ON `users` (`accountStatus`);