CREATE TABLE tasklist (
	id SERIAL PRIMARY KEY,
	task_name varchar (500),
	task_deadline date
	);

  ALTER TABLE tasklist
    ADD COLUMN "active" BOOLEAN DEFAULT FALSE;
