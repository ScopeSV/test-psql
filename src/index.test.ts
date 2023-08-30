import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";

const getDBCreds = (container) => ({
  host: container.getHost(),
  port: container.getPort(),
  database: container.getDatabase(),
  user: container.getUsername(),
  password: container.getPassword(),
});

describe("Foobar", () => {
  let container;
  let client;
  let knex;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    client = new Client(getDBCreds(container));
    await client.connect();

    knex = require("knex")({
      client: "pg",
      connection: {
        ...getDBCreds(container),
      },
    });
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex.raw('TRUNCATE "Foobar" RESTART IDENTITY CASCADE');
  });

  afterAll(async () => {
    await client.end();
    await container.stop();
  });
  it("Should insert a new row", async () => {
    const res = await knex("Foobar").insert({ name: "test" }).returning("id");
    expect(res[0].id).toBe(1);
  });
  it("Should not persist data between tests", async () => {
    const res = await knex("Foobar").select();
    expect(res.length).toBe(0);
  });
});
