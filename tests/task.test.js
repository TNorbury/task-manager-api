const request = require("supertest");

const app = require("../src/app");
const Task = require("../src/models/task");
const {
    userOneId,
    userOne,
    userTwo,
    setupDatabase,
    taskOne,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From my test",
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test("Should get all and only tasks for current user", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const tasks = response.body;

    expect(tasks.length).toBe(2);
});

test("Should get only get completed tasks for user", async () => {
    const response = await request(app)
        .get("/tasks?completed=true")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const tasks = response.body;

    expect(tasks.length).toBe(1);
});

test("Should not be able to delete another user's task", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});
