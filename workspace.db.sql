BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "system_info" (
	"root_path"	text
);
CREATE TABLE IF NOT EXISTS "work" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"key"	TEXT NOT NULL,
	"path"	TEXT NOT NULL,
	"del_yn"	TEXT NOT NULL DEFAULT 'N',
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "todo" (
	"no"	INTEGER NOT NULL UNIQUE,
	"work_id"	INTEGER NOT NULL,
	"title"	TEXT NOT NULL,
	"content"	TEXT,
	"status"	TEXT NOT NULL,
	"start_dt"	TEXT,
	"due_dt"	TEXT,
	"file_id"	TEXT,
	"del_yn"	TEXT NOT NULL DEFAULT 'N',
	PRIMARY KEY("no"),
	FOREIGN KEY("work_id") REFERENCES "work"("id")
);
INSERT INTO "system_info" ("root_path") VALUES ('D:\Study\workspace-test-folder');
INSERT INTO "work" ("id","name","key","path","del_yn") VALUES (14,'Javascript','JS','D:\Study\workspace-test-folder\work\JS','N');
INSERT INTO "work" ("id","name","key","path","del_yn") VALUES (15,'Spring','SPR','D:\Study\workspace-test-folder\work\SPR','N');
INSERT INTO "work" ("id","name","key","path","del_yn") VALUES (16,'node','node','D:\Study\workspace-test-folder\work\node','N');
INSERT INTO "work" ("id","name","key","path","del_yn") VALUES (17,'aaa','aaa','D:\Study\workspace-test-folder\work\aaa','N');
INSERT INTO "todo" ("no","work_id","title","content","status","start_dt","due_dt","file_id","del_yn") VALUES (1,16,'test title','test content','TODO',NULL,NULL,NULL,'N');
COMMIT;
