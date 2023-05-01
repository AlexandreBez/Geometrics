describe("My fulltask list automation test", () => {
  const url = "http://localhost:4200/";

  beforeEach(() => {
    cy.visit(url);
  });

  it("Tasks should be loaded when the useer enter on the system", () => {
    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should(
      "be.visible"
    );
    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should("exist");
  });

  it("Create Task button should not be enabled to create a new task without valid data on the field Task and Priority", () => {
    cy.get("#floatingInput").should("not.have.text");
    cy.get("#create-task-id").should("not.be.enabled");
  });

  it("Create Task button should be enabled to create a new task with valid data on the field Task and Priority", () => {
    cy.get("#floatingInput").type("Task Test");
    cy.get("#form-control").should("have.value", "Low");
    cy.get("#create-task-id").should("be.enabled");
  });

  it("User should be enabled to create a new Low task with valid data", () => {
    cy.get("#floatingInput").type("Task Test");
    cy.get("#form-control").should("have.value", "Low");
    cy.get("#create-task-id").click();

    cy.get(".alert").should("exist");
    cy.get(".alert").should("contain", "Task created with success...");
    cy.get(".alert").should("not.exist", { timeout: 2000 });

    cy.get("tbody.table-dark > :nth-child(4) > :nth-child(1)").should("exist");
    cy.get("tbody.table-dark > :nth-child(4) > :nth-child(1)").should(
      "contain",
      "Task Test"
    );

    cy.get(":nth-child(4) > :nth-child(2) > .badge").should('exist');
    cy.get(":nth-child(4) > :nth-child(2) > .badge").should('contain', "Low");
  });

  it("User should be enabled to create a new Medium task with valid data", () => {
    cy.get("#floatingInput").type("Task Test");
    cy.get("#form-control").select("Medium");
    cy.get("#form-control").should("have.value", "Medium");
    cy.get("#create-task-id").click();

    cy.get(".alert").should("exist");
    cy.get(".alert").should("contain", "Task created with success...");
    cy.get(".alert").should("not.exist", { timeout: 2000 });

    cy.get("tbody.table-dark > :nth-child(5) > :nth-child(2)").should("exist");
    cy.get("tbody.table-dark > :nth-child(5) > :nth-child(2)").should(
      "contain",
      "Task Test"
    );

    cy.get(":nth-child(5) > :nth-child(3) > .badge").should('exist');
    cy.get(":nth-child(5) > :nth-child(3) > .badge").should('contain', "Low");
  });

  it("User should be enabled to create a new High task with valid data", () => {
    cy.get("#floatingInput").type("Task Test");
    cy.get("#form-control").select("High");
    cy.get("#form-control").should("have.value", "High");
    cy.get("#create-task-id").click();

    cy.get(".alert").should("exist");
    cy.get(".alert").should("contain", "Task created with success...");
    cy.get(".alert").should("not.exist", { timeout: 2000 });

    cy.get("tbody.table-dark > :nth-child(5) > :nth-child(2)").should("exist");
    cy.get("tbody.table-dark > :nth-child(5) > :nth-child(2)").should(
      "contain",
      "Task Test"
    );

    cy.get(":nth-child(5) > :nth-child(3) > .badge").should('exist');
    cy.get(":nth-child(5) > :nth-child(3) > .badge").should('contain', "Low");
  });

  it("User should be enabled to delete one task", () => {

    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should("exist");
    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Updated Task"
    );
    cy.get(":nth-child(1) > :nth-child(2) > .badge").should('exist');
    cy.get(":nth-child(1) > :nth-child(2) > .badge").should('contain', "Medium");

    cy.get(':nth-child(1) > :nth-child(4) > .btn').click();

    cy.get(".alert").should("exist");
    cy.get(".alert").should("contain", "Task deleted with success...");
    cy.get(".alert").should("not.exist", { timeout: 2000 });

    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should("not.exist");

  });

  it("User should be enabled to delete one task", () => {

    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should("exist");
    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Updated Task"
    );
    cy.get(":nth-child(1) > :nth-child(2) > .badge").should('exist');
    cy.get(":nth-child(1) > :nth-child(2) > .badge").should('contain', "Medium");

    cy.get(':nth-child(1) > :nth-child(4) > .btn').click();

    cy.get(".alert").should("exist");
    cy.get(".alert").should("contain", "Task deleted with success...");
    cy.get(".alert").should("not.exist", { timeout: 2000 });

    cy.get("tbody.table-dark > :nth-child(1) > :nth-child(1)").should("not.exist");

  });
});
