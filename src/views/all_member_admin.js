import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch ,useHistory} from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import profile from "views/profile_member_admin.js";

import Popup from "views/Popup.js";
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

const Member = () => {

 
  const db = firebaseApp.firestore()
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [ User, setUser ] = useState({})

  const [ Uid, setUid ] = useState('')

  const { currentUser } = useContext(AuthContext);

  const history = useHistory()

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
        const db = firebaseApp.firestore()
        const userCollection = db.collection('User')      
    
      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot(ss => {
          // ตัวแปร local
          const User = {}

          ss.forEach(document => {
              // manipulate ตัวแปร local
              User[document.id] = document.data()
          })

          // เปลี่ยนค่าตัวแปร state
          setUser(User)
      })

      return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe()
      }
      });
  }, [])

  const routeChange = (e) =>{ 
    setUid(e)
    history.push({
      pathname: '/admin/member/profile',
      search: e,
      state: { detail: e }
  });
  }


  if (currentUser) {
      return <Redirect to="/member/profile" />;
  }
  
    return (
      <>

        <div className="content">
          
          <Row>

            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle className="content"><h3>ระบบจัดการสมาชิก</h3></CardTitle>
                </CardHeader>
                { Object.keys(User).map((id) => {

                  return<Row>
                      <Col md="4">
                      <p>&nbsp;&nbsp;{User[id].Email}</p>
                      </Col>
                      <Col md="4">
                      <p>{User[id].FirstName} {User[id].LastName}</p>
                      </Col>
                      <Col md="4">
                      <p><button value={User[id].Email} class="btn btn-info" onClick={e =>routeChange(e.target.value)}>ดูโปรไฟล์</button><button class="btn btn-success"  onClick={togglePopup}>เพิ่มโปรโมชั่น</button></p>
                      </Col>
                  </Row>

                }) } 
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardHeader>
                <CardTitle tag="h5">เพิ่มโปรโมชั่นสำหรับสมาชิกทุกคน</CardTitle>
                </CardHeader>
                <CardBody>
                <Form>
                   
         
<label>รายละเอียดโปรชั่น</label>
                          <Input type="text" />
                          <br/>
<label>โค้ดส่วนลด</label>

                       
                          <Input type="text" />
                          <br/>
                          <label>วันหมดเขต</label>
                         <Input
                        
                           type="date"
                         />
<div  style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} >   <button  class="btn btn-info">ยืนยัน</button></div>
     
     
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
         
    {isOpen && <Popup
      content={<>
<h5>เพิ่มโปรโมชั่น สำหรับ </h5>
<label>รายละเอียดโปรชั่น</label>
                          <Input type="text" />
                          <br/>
<label>โค้ดส่วนลด</label>

                       
                          <Input type="text" />
                          <br/>
                          <label>วันหมดเขต</label>
                         <Input
                        
                           type="date"
                         />
<div  style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} >   <button  class="btn btn-info">ยืนยัน</button></div>
     
      </>}
      handleClose={togglePopup}
      
    />}

        </div>
      </>
    );

}

export default Member;
