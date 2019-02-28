to start do npm install then npm init to set up workspace. 
then do npm install apollo-server apollo-server-express --save to install apollo and express
then  npm install express graphql --save
then npm install nodemon --save
then nodemon start


mutation {
  createClass(id: 3, name: "chest", description: "booft"){
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
    classes{
      id
    }
}
query{
  students{
    address{
      street, city
    }
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

{
  grades {
    studentId, courseId, grade
  }
}
