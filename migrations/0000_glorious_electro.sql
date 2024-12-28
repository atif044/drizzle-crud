CREATE TABLE "Tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"completed" boolean DEFAULT false
);
