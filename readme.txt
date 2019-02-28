to start do npm install then npm init to set up workspace. 
then do npm install apollo-server apollo-server-express --save to install apollo and express
then  npm install express graphql --save
then npm install nodemon --save
then nodemon start

mutation {
  createStudent( name: {firstName: "booft", familyName: "sange"}, addressStreet: "wut", addressPostNumber: "20", addressCity:" Oulu", addressCountry: "sweden"){
 	success
  }
}

mutation {
  createClass(id: 3, name: "chest", description: "booft"){
 	success
  }
}

mutation {
  createGrade(studentId: 3, courseId: 2, grade: 40){
 	success
  }
}

query {
    student(id: 1)
    {
        name{
            firstName, familyName
        }
    }
}

query {
    students
    {
        name{
            firstName, familyName
        }
    }
}

query {
    class(id: 1){
      id, name, description
    }
}

query {
    classes{
      id
    }
}

query{
  grade(studentId: 1, courseId: 2){
    grade
  }
}

query{
  grades{
    grade, studentId, courseId
  }
}

mutation {
  editStudent(id: 1, firstName: "oof", familyName:"cess", addressStreet: "123 kapppaprise",addressPostNumber: "123",addressCity: "cest",addressCountry: "truth"){
      name{
        firstName, lastname
      }
        address{
          street
        }
      
  }
  mutation {
  editClass(id: 1, name: "chest", description: "fun"){
      name, id, description
      
  }
}
 mutation {
editGrade(studentId: 1, courseId: 2, grade: 90){
      studentId, courseId, grade
      
  }
}

