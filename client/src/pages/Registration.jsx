import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import {
  PIIELOGOCROPPED,
  IECONNECNEWPNG,
  PUPLOGOPNG
} from "../assets/index";


const Registration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname:"", 
    middlename:"", 
    surname:"", 
    age:"", 
    birthday:"", 
    contact:"",
    email:"", 
    username:"", 
    password:"", 
    batch:"",
    confirmPassword:"",
  })

  function passwordChecker() {
    let password = document.querySelector('#password').value;
    let confirmPassword = document.querySelector('#confPassword').value;
    if(password === confirmPassword) {
      document.querySelector('#message').innerHTML = "Password matched";
    } else {
      document.querySelector('btn').innerHTML = "Password not matched";
    }
  }

  

  async function handleSubmit(e) {
    e.preventDefault();

    
// console.log(formData)
    try {
      const res = await fetch(
        "http://localhost:8000/ie-connect/api/registration",
        {
          body: JSON.stringify({formData}),
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const submittedData = res.json()
      console.log(submittedData)
      navigate("/login")
    } catch (error) {
        toast.error(error.message)
        console.log("Field must be completed!", error.message);

    }
  }

  return (
    <>
      <header className=" | login-header">
        <ul className=" | login-header-icons flex items-center w-full justify-between">
          <img src={PIIELOGOCROPPED} alt="" />

          <span>
            <img src={IECONNECNEWPNG} alt="" />
          </span>

          <a href="https://www.pup.edu.ph/">
            <img src={PUPLOGOPNG} alt="" />
          </a>
        </ul>
      </header>
      <main>
          <div className="text-center pt-5 font-bold text-lime-900">
            <h1>Register Account</h1>
          </div>
        <section className="flex basis-5 max-w-full min-w-50 justify-center">
          
          <div className="max-w-4xl pt-14">
            <form className="grid grid-cols-7 gap-7"
              method="post"
              onSubmit={handleSubmit}
            >
              
              <label htmlFor="firstname" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Firstname:
                <input
                  className="grow overflow-hidden" placeholder="Juan"
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => setFormData({...formData, firstname:e.target.value})}
                />
              </label>
              <label htmlFor="middlename" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Middlename:
                <input
                  className="grow overflow-hidden" placeholder="Mendoza"
                  id="middlename"
                  name="middlename"
                  type="text"
                  value={formData.middlename}
                  onChange={(e) => setFormData({...formData, middlename:e.target.value})}
                />
              </label>
              <label htmlFor="surname" className="input input-bordered flex items-center gap-2 text-sm col-span-2"> 
                Surname:
                <input
                  className="grow overflow-hidden" placeholder="Dela Cruz"
                  id="surname"
                  name="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname:e.target.value})}
                />
              </label>
              <label htmlFor="age" className="input input-bordered flex items-center gap-2 text-sm">
                Age:
                <input
                  className="grow overflow-hidden" placeholder="0"
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age:e.target.value})}
                />
              </label>
              <label htmlFor="birthday" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Birthday:
                <input
                  className="grow overflow-hidden"
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({...formData, birthday:e.target.value})}
                />
              </label>
              <label htmlFor="contact" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Contact:
                <input
                  className="grow overflow-hidden" placeholder="09123456789"
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact:e.target.value})}
                />
              </label>
              <label htmlFor="email" className="input input-bordered flex items-center gap-2 text- col-span-3">
                Email:
                <input
                  className="grow overflow-hidden" placeholder="juandelacruz123@gmail.com"
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email:e.target.value})}
                />
              </label>
              <label htmlFor="username" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Username:
                <input
                  className="grow overflow-hidden"
                  id="username"
                  name="username"
                  type="username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username:e.target.value})}
                />
              </label>
              <label htmlFor="password" className="input input-bordered flex items-center gap-2 text-sm col-span-2">
                Password:
                <input
                  className="grow overflow-hidden pass"
                  // onkeyup='passwordChecker()'
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password:e.target.value})}
                />
              </label>

              <label htmlFor="confirmPassword" className="input input-bordered flex items-center gap-2 text-sm col-span-3">
                Confirm Password:
                <input
                  className="grow overflow-hidden pass"
                  // onkeyup='passwordChecker()'
                  id="confPassword"
                  name="password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}
                />
                <span id="message"></span>
              </label>
              

              <label htmlFor="batch" className="input input-bordered flex items-center gap-2 text-sm col-span-2 col-start-3 col-end-6">
                Batch:
                <select
                  className="grow overflow-hidden"
                  name="batch"
                  id="batch"
                  onChange={(e) => setFormData({...formData, batch:e.target.value})}
                >
                  <option value="">Select your batch</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2022">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </label>
            </form>
            <div className="w-full flex justify-center">
            <button type="submit" className="btn bg-lime-900 font-bold text-white hover:bg-white hover:text-lime-900 shadow-lg w-56 mt-10">Submit</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Registration;
