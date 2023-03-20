import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import { MongoMemoryServer } from "mongodb-memory-server";

const request = supertest(app);
let mongod;

/* Connecting to the database before each test. */
beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
});
  
/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});

describe("GET /api/notes", () => {
    it("should return with a 200 status code", async () => {
        const res = await request.get("/api/notes");
        expect(res.statusCode).toBe(200);
        // console.log(res.body);
    });
});

describe("GET /api/notes/:id", () => {
    it("should return with a 200 status code", async () => {
        const createNote = await request.post("/api/notes").send({
            title: "title",
            description: "description"
        });
        const getNote = await request.get("/api/notes");
        const getNoteId = getNote.body.notes[0]._id;
        // console.log(getNoteId);

        const res = await request.get(`/api/notes/${getNoteId}`);
        expect(res.statusCode).toBe(200);
        // console.log(res.body);
    });
});

describe("PUT /api/notes:id", () => {
    it("should return with a 200 status code", async () => {
        const createNote = await request.post("/api/notes").send({
            title: "title",
            description: "description"
        });
        const getNote = await request.get("/api/notes");
        const getNoteId = getNote.body.notes[0]._id;
        // console.log(getNoteId);

        const res = await request.put(`/api/notes/${getNoteId}`).send({
            title: "title updated",
            description: "description updated"
        });
        expect(res.statusCode).toBe(200);
        // console.log(res.body);
    });
});


describe("DELETE /api/notes:id", () => {
    it("should return with a 200 status code", async () => {
        const createNote = await request.post("/api/notes").send({
            title: "title",
            description: "description"
            });
        const getNote = await request.get("/api/notes");
        const getNoteId = getNote.body.notes[0]._id;
        // console.log(getNoteId);
            
        const res = await request.delete(`/api/notes/${getNoteId}`);
        expect(res.statusCode).toBe(200);
        // console.log(res.body);
    });
});

describe("POST /api/notes", () => {
    describe("given a title and description", () => {
        it("should respond with a 200 status code", async () => {
            const res = await request.post("/api/notes").send({
                title: "title",
                description: "description"
            });
            expect(res.statusCode).toBe(201);
            // console.log(res.body);
        });
    });

    // describe("when a title and description is missing", () => {
    // })
});