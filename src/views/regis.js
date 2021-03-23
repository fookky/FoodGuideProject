import React, { useState } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Carousel from 'react-bootstrap/Carousel'

const Register = () => {
  const [ EmailError, setEmailError] = useState('')
  const [ PasswordError, setPasswordError] = useState('')

  const [currentUser, setCurrentUser] = useState(null);

  const [ FirstName, setFirstName] = useState('')
  const [ LastName, setLastName] = useState('')
  const [ Email, setEmail] = useState('')
  const [ Date, setDate] = useState('')
  const [ Password, setPassword] = useState('')
  const [ ConfirmPassword, setConfirmPassword] = useState('')

  const [ FirstNameError, setFirstNameError] = useState('')
  const [ LastNameError, setLastNameError] = useState('')
  const [ DateError, setDateError] = useState('')
  const [ ConfirmPasswordError, setConfirmPasswordError] = useState('')

  const db = firebaseApp.firestore()
  const userCollection = db.collection('User')

  async function insertDocument(Uid) {
      const documentRef = await userCollection.add({
          FirstName,
          LastName,
          Email,
          Date,
          Uid
      })
  }

  function ErrorsCheck(){
    if(FirstName == "")   setFirstNameError('Must not be empty.')  
    if(LastName == "")   setLastNameError('Must not be empty.')  
    if(Date == "")   setDateError('Must not be empty.') 
    if(ConfirmPassword == "")   setConfirmPasswordError('Must not be empty.')
    if(ConfirmPassword !== Password)   setConfirmPasswordError('Passwords do not match.') 
  }
  

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');
    setDateError('');
    setConfirmPasswordError('');
    
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      clearErrors();
      ErrorsCheck();
      
      const { email, password } = e.target.elements;

      try {

          if (FirstName !== '' && LastName !== '' && Date !== '' && ConfirmPassword !== '' && ConfirmPassword == Password) {
          firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value)
          .then(res => {
            if (res.user) {
              
              insertDocument(firebaseApp.auth().currentUser.uid)              
              console.log(res.user);
              setCurrentUser(true)
              
            }
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(error.message);
                break;
              case "auth/weak-password":
                setPasswordError(error.message);
                break;
            }
            
          });
        }

      } catch(error) {
          alert(error);
      }
  }
  
  if(currentUser){
    return <Redirect to="login"/>
  }
  
    return (
      <>
        <div className="content">
          
          <Row>
            <Col md="6">
              
                      <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("assets/img/tong.png")}
    
    />
  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("assets/img/tong1.png")}
     
    />

  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("assets/img/tong2.png")}
      
    />

    
  </Carousel.Item>
</Carousel>    
            </Col>
            <Col md="6">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       
        }}className="content"><h3>สมัครสมาชิก</h3></CardTitle>
                </CardHeader>
                <CardBody>
                <form onSubmit={handleSubmit}>
                <Form>
                   
                   <Row>
                     <Col className="pr-1" md="4">
                       <FormGroup>
                         <label>ชื่อจริง</label>
                         <Input
                           onChange={e => setFirstName(e.target.value)}
                         
                           type="text"
                         />
                         {FirstNameError}
                       </FormGroup>
                     </Col>
                     <Col className="pl-1" md="4">
                       <FormGroup>
                         <label>นามสกุล</label>
                         <Input
                           onChange={e => setLastName(e.target.value)} 
                         
                           type="text"
                         />
                         {LastNameError}
                       </FormGroup>
                     </Col>
                     <Col md="4">
                       <FormGroup>
                         <label>เดือน/วัน/ปีเกิด</label>
                         <Input
                           onChange={e => setDate(e.target.value)}
                           type="date"
                         />
                         {DateError}
                       </FormGroup>
                     </Col>
                   </Row>
                   <Row>
              
                     
                   </Row>
                   <Row>
                   <Col className="pr-1" md="4">
                   <FormGroup>
                         <label>Email Address</label>
                         <Input
                           onChange={e => setEmail(e.target.value)}
                           name="email"
                           type="text"
                         />
                         {EmailError}
                       </FormGroup>
                     </Col>
                     <Col className="pr-1" md="4">
                       <FormGroup>
                         <label>รหัสผ่าน</label>
                         <Input
                           onChange={e => setPassword(e.target.value)}
                           name="password"
                           type="password"
                         />
                         {PasswordError}
                       </FormGroup>
                     </Col>
                     <Col className="px-1" md="4">
                       <FormGroup>
                         <label>ยืนยันรหัสผ่าน</label>
                         <Input
                           onChange={e => setConfirmPassword(e.target.value)}
                           type="password"
                         />
                         {ConfirmPasswordError}
                       </FormGroup>
                     </Col>
                  
                   </Row>
                   <Row>
              
                   </Row>
                   <Row>
                     <div className="update ml-auto mr-auto">
                       <Button
                       color="info"
                       class="btn btn-info"
                        
                         type="submit"
                       >
                        สร้างบัญชี
                       </Button>
                     </div>
                   </Row>
                 </Form>
            </form>
                </CardBody>
              </Card>
            </Col>
          </Row>

     
        </div>
      </>
    );

}

export default Register;
