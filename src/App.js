import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users') //server side thekey data fetch
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    //to get user info from FORM(nicher kaj tuku useRef hook use koreo kora jeto)
    const userName = e.target.name.value
    const userEmail = e.target.email.value
    const userDataFromForm = { name: userName, email: userEmail }

    //post form's user data to server (using fetch)(fronend thekey form data baack end a pathassi using post method)
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',  //ki type ar content pathatey chai
      },
      //client side thekey jei data server side a pathatey chaai seita body diye patahatey hobey stringify korey
      body: JSON.stringify(userDataFromForm),
    })
      .then(response => response.json())  //dataa server a pathanor por jei response pabo seita json a convert
      .then(data => {
        //console.log('Success:', data);      //server side thekey 'data' pabo after posting
        //Task:newly gtahered data using form added to existing users data 
        const newUsers=[...users,data]  //as react is immutable so we can't use push here
        setUsers(newUsers)
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className="App">
      <h1>Reaact with node</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Name' name='name' />
        <br />
        <label htmlFor="">Email</label>
        <input type="text" placeholder='email' name='email' />
        <br />
        <button type="submit">Add user</button>
      </form>
      <p>users database i have made:{users.length}</p>
      <ul>
        {
          users.map(user => <li>name:{user.name} email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
