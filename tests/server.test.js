const supertest = require("supertest");
const app = require("../server");

describe("GET Requests for normal user", function() {
    it("Get projects", function(done) {
        supertest(app)
            .get("/projects/get")
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });
});

describe("POST Requests for normal user", function() {
    it("Send contact form", function(done) {
        supertest(app)
            .post("/contacts/post")
            .send({
                name: "System test",
                email: "system@test.com",
                subject: "System Test Subject",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in pulvinar lorem. Donec arcu sem, maximus id consequat vel, molestie a tortor. Proin ligula eros, hendrerit vel consectetur id, finibus sed ipsum. Nunc ullamcorper a ex sit amet tempor. Quisque commodo massa in nulla commodo, vitae dapibus magna suscipit. Vestibulum gravida eros quis diam varius feugiat. "
            })
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });
});

describe("GET Requests for admin ", function() {
    let token = "";
    before(async () => {
        const response = await supertest(app).post("/auth/login").send({
            email: "zelyurtberkay@gmail.com",
            password: "1234",
        });
        token = response.body.token;
    });


    it("GET all projects", function(done) {
        supertest(app)
            .get("/projects/getAll")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });

    it("GET contact submissions", function(done) {
        supertest(app)
            .get("/contacts/get")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });
});


describe("POST Requests for admin ", function() {
    let token = "";
    before(async () => {
        const response = await supertest(app).post("/auth/login").send({
            email: "zelyurtberkay@gmail.com",
            password: "1234",
        });
        token = response.body.token;
    });


    let project;
    it("Add new project", function(done) {
       supertest(app)
            .post("/projects/add")
            .set('Authorization', `Bearer ${token}`)
           .send({
               active: true,
               slug: "sys-test",
               title: "Test Project",
               description: "Test desc",
               image: "https://picsum.photos/200/300",
               content: "<p>content</p>"
           })
            .expect(200)
            .end(function(err, res){
                project = res.body.project;
                if (err) throw err;
                done();
            });
    });

    it("Update project", function(done) {
        supertest(app)
            .post(`/projects/update/${project.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                active: true,
                slug: "system-test-update",
                title: "Test Project",
                description: "Test desc",
                image: "https://picsum.photos/200/300",
                content: "<p>content</p>"
            })
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });
});



