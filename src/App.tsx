import React, { useEffect, useState } from 'react';
import { db } from "./firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

function App() {

  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isStudent, setisStudent] = useState<boolean>(false);

  const userCollectionRef = collection(db, "users");


  useEffect(() => {

    // GET all users
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data()
      })))
    };  
  
    getUsers();
  }, [users])


  const createUser = async (e:React.FormEvent) => {
    e.preventDefault();

    console.log(name, age, isStudent);
    
    // POST new user
    await addDoc(userCollectionRef, {
      name, 
      age, 
      isStudent
    })

  }

  // UPDATE user
  const updateUser = async(id: string, age:number) => {
    const userDoc = doc(db, "users", id);
    const newField = { age: age+1 };
    await updateDoc(userDoc, newField);    
  }

  // DELETE user
  const deleteUser = async(id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);    
  };

  return (
    <div className='m-5'>

      <form onSubmit={createUser}>
        <label htmlFor="name">Name: </label>
        <input 
        value={name}
        onChange={e => {setName(e.currentTarget.value)}}
        id="name" 
        placeholder='Your name...'
        className='form-control'
        required
        type="text" />

        <label htmlFor="age">Age: </label>
        <input 
        value={age}
        onChange={e => {setAge(parseInt(e.currentTarget.value))}}
        id="age" 
        className='form-control'
        placeholder='Your age...'
        required
        type="number" />
        <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="isStudent" 
        onChange={e => {e.currentTarget.checked ? setisStudent(true) : setisStudent(false)}}/>
        <label className="form-check-label" htmlFor="isStudent">
          Are you a student? 
        </label>
        </div>


        <button type="submit" className="btn btn-primary my-3">Add New User</button>

      </form>


      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><strong>Name: </strong>{user.name}</td>
              <td><strong>Age: </strong>{user.age}</td>
              <td><strong>Student: </strong>{user.isStudent ? "Yes" : "No"}</td>
              <button onClick={() => {updateUser(user.id, user.age)}} className="btn btn-primary">Increase Age</button>
              <button onClick={() => {deleteUser(user.id)}} className="btn btn-danger">Delete</button>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
