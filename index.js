let express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Mutation {    
    createStudent(
      name: iName,
      addressStreet: String!,
      addressCity: String!,
      addressCountry: String!,
      addressPostNumber: String!       
      ): NewUserResponse!,
    createClass(
        id: ID!,
        name: String!,
        description: String!     
      ): NewClassResponse!,
    createGrade(
        studentId: ID!,
        courseId: ID!,
        grade: Int
      ): NewGradeResponse!,
    editStudent(
        id: ID!,
        name: iName,
        addressStreet: String!,
        addressCity: String!,
        addressCountry: String!,
        addressPostNumber: String!       
      ): Student,
    editClass(
        id: ID!,
        name: String!,
        description: String!     
      ): Class,
    editGrade(
        studentId: ID!,
        courseId: ID!,
        grade: Int
      ): Grade!
  }


  type NewUserResponse {
    success: Boolean!    
  }

  type NewClassResponse {
    success: Boolean!    
  }

  type NewGradeResponse {
    success: Boolean!    
  }
  type Query {
    student(id: ID!): Student,
    students: [Student!]!,
    class(id: ID!): Class,
    classes: [Class!]!,
    grade(studentId: ID!, courseId: ID!): Grade,
    grades: [Grade!]!
  }

  type Student {
    id: ID!,
    name: Name,
    address: Address!,
    birthday: String,
    alias: String #nickname
  }

  type Name {
      firstName: String!,
      familyName: String!
  }

  input iName {
    firstName: String!,
    familyName: String!
  }

  type Address {
      street: String!,
      city: String!,
      postalCode: Int
      country: String!
  }

  type Class {
    id: ID!,
    name: String!,
    description: String!
  }

  type Grade {
    studentId: ID!,
    courseId: ID!,
    grade: Int
  }
`;

let students = [
  {
    id: "1",
    email: "test.user@email.com",
    firstName: "Test",
    familyName: "User",
    addressStreet: "Codestreet 789",
    addressPostNumber: "110101",
    addressCity: "Oulu",
    addressCountry: "CD",
    birthday: "2000-12-24",
    alias: "testmule"
  },
  {
    id: "2",
    email: "clark.kent@superman.com",
    firstName: "Clark",
    familyName: "Kent",
    addressStreet: "Kryptonite Rd 1",
    addressPostNumber: "0000001",
    addressCity: "Smallville",
    addressCountry: "US",
    birthday: "2000-12-23",
    alias: "superman"
  }
];

let classes = [
  {
    id: "1",
    name: "Science",
    description: "Barrel of bananas"
  },
  {
    id: "2",
    name: "oof",
    description: "Barrel of fish"
  },
];

let grades = [
    {
      studentId: "1",
      courseId: "1",
      grade: "90"
    },
    {
        studentId: "2",
        courseId: "2",
        grade: "80"
    },
    {
        studentId: "1",
        courseId: "2",
        grade: "70"
      },
      {
          studentId: "2",
          courseId: "1",
          grade: "60"
      },
  ];


const resolvers = {
  Query: {
    student: (parent, args, context, info) => {      
      return students.find(u => u.id === args.id);
    },
    students: (parents, args, context, info) => {
      return students;
    },
    class: (parents, args, context, info) => {
      const c = classes.find(i => i.id == args.id);
      return c; 
    },
    classes: (parents, args, context, info) => {
        return classes; 
      },
    grade: (parents, args, context, info) => {
        const c = grades.find(i => i.courseId == args.courseId && i.studentId == args.studentId);
        return c;
    },
    grades: (parents, args, context, info) => {
      return grades; 
    },
    
  },

  Mutation: {
    createStudent: (parent, args, context, info) => { 
      let newStudent = {
        id: ((students.length)+1).toString(),
        email: args.email,
        firstName: args.name.firstName,
        familyName: args.name.familyName,
        addressStreet: args.addressStreet,
        addressPostNumber: args.addressPostNumber,
        addressCity: args.addressCity,
        addressCountry: args.addressCountry,
        birthday: null,
        alias: null
      }
      students.push(newStudent);
      return { success: true}
    },
    createClass: (parent, args, context, info) => {
        let newClass = {
        id: args.id,
        name: args.name,
        description: args.description 
        }
        classes.push(newClass);
        return { success: true}
    },
    createGrade: (parent, args, context, info) => {
        let newGrade = {
        studentId: args.studentId,
        courseId: args.courseId,
        grade: args.grade
        }
        grades.push(newGrade);
        return { success: true}
  },
  editStudent: (_, { id, firstName, familyName, addressStreet, addressPostNumber, addressCity, addressCountry }) => { 
        const student = students.find(i => i.id == id ); 
        if (!student) {
          throw new Error(`Couldn’t find student with id ${id}`);
        }
        student.firstName = firstName,
        student.familyName = familyName,
        student.addressStreet =addressStreet,
        student.addressPostNumber= addressPostNumber,
        student.gradeaddressCity = addressCity,
        student.addressCountry = addressCountry,
        student.birthday = null,
        student.alias = null
        return student;
       },
  editClass: (_, { id, name, description }) => {
      const c = classes.find(i => i.id == id);
      if(!c)
      {
        throw new Error('Couldnt find class');
      }
      if(name !== undefined)
      {
        c.name = name;
      }
      if(description !== undefined)
      {
      c.description = description ;
      }
      return c;
  },
  
    editGrade: (_, { studentId, courseId, grade }) => {
      const c = grades.find(i => i.studentId == studentId && i.courseId == courseId);
      if(!c)
      {
        throw new Error('Couldnt find class');
      }
      if(grade !== undefined)
      {
        c.grade = grade;
      }
     
      return c;
  }
  },
  Student: {
    name: (parent, args, context, info) =>
    {
      return {
        firstName: parent.firstName,
        familyName: parent.familyName
      }
    },
    address: (parent, args, context, info) => {
      return {
        street: parent.addressStreet,
        postalCode: parent.addressPostNumber,
        city: parent.addressCity,
        country: parent.addressCountry
      }
    },
  },

};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});