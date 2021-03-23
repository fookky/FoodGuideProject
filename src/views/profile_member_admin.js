import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import { useLocation } from "react-router-dom";
import allmember from "views/all_member_admin.js";
import { Link } from 'react-router-dom';
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { Col, Card, Row} from "react-bootstrap";
import {
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  
} from "reactstrap";

// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";


function Dashboard(){ 

    const [ User, setUser ] = useState({})

    const { currentUser } = useContext(AuthContext);

    const location = useLocation();

    const history = useHistory()

    useEffect(() => {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged(user => {
          const db = firebaseApp.firestore()
          const userCollection = db.collection('User').where('Email' , '==' , location.search.substring(1))       
      
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

    const routeChange = () =>{ 
        history.push("/admin/member");
      }

    if (currentUser) {
        return <Redirect to="/member/profile" />;
    }

    return (
      
      <>
        <div className="content">
<Row>
            { Object.keys(User).map((id) => {
              return<Col md="4">


              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h5 className="title">{User[id].FirstName} {User[id].LastName}</h5>
                    </a>
                    <p className="description">{User[id].Email}</p>
                    <p className="description">วันเกิด</p>
                    <p className="description">{User[id].Date}</p>
                
                  </div>
              
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>            
              </Col>
              }) }  
              <Col md="4">
              <Card className="card-user">
                <CardHeader>
                <CardTitle tag="h5">ประวัติการสุ่ม</CardTitle>
                </CardHeader>
                <CardBody>
                <Form>
                   
                   <Row>

      </Row>
     
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardHeader>
                <CardTitle tag="h5">ส่วนลดของคุณ</CardTitle>
                </CardHeader>
                <CardBody>
                <Form>
                   
                   <Row>

      </Row>
     
                  </Form>
                </CardBody>
              </Card>
            </Col>
              </Row>
<Row>
         <Col md='4'> <Card>
                <CardHeader>
                  <CardTitle tag="h4">เมนูแนะนำสำหรับคุณ</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/r1.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          สเต๊กไก่พริกไทยดำ<br />
                          <span className="text-success">
                        
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="primary"
                            outline
                            size="sm"
                          >
                            <i className="nc-icon nc-favourite-28" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li> <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/r2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          ข้าวหน้าเป็ดแดง<br />
                          <span className="text-success">
                         
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="primary"
                            outline
                            size="sm"
                          >
                            <i className="nc-icon nc-favourite-28" />
                          </Button>
                        </Col>
                      </Row></li>
                      <li> <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/r3.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          ปีกไก่ทอดน้ำปลา <br />
                          <span className="text-success">
                          
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="primary"
                            outline
                            size="sm"
                          >
                            <i className="nc-icon nc-favourite-28" />
                          </Button>
                        </Col>
                      </Row></li>
                    
                  </ul>
                </CardBody>
              </Card>
              
              </Col>
              </Row>
              <p><button class="btn btn-info" onClick={routeChange}>ย้อนกลับ</button></p>
        </div>
      </>
    );
}

export default Dashboard;
 