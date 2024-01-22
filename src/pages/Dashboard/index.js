import React,{useState} from "react"
import MetaTags from 'react-meta-tags';
import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios"
import {useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  
} from "reactstrap"
import { Link } from "react-router-dom"

import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";

import moment from "moment";

const Dashboard = () => {
  const [DashboardSummary, setDashboardSummary] = useState({})
  const [latestReceipts, setlatestReceipts] = useState([])
  const [sublates, setsublates] = useState([])
  const epiEndPoint = "http://localhost:0808";
  const toggle = () => {
     
  }
  useEffect(() => {
   async function onload () {
     try {
     
      const { data } = await axios.get(`${epiEndPoint}/summary`)
       setDashboardSummary(data)
       
      const {data:latestReceipts} = await axios.get(`${epiEndPoint}/receipt/LatestReceipts`)
      const sublatestReceipts = await {data:latestReceipts}.data.Allreceipt
     setlatestReceipts(sublatestReceipts)
      console.log("LatestReceipts",latestReceipts)
     } catch (error) {
      console.log(error.message)
     }
    }
    onload()
  }, [])
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard </title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
            <Row>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                     {"$"+DashboardSummary.AllAmount}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                   
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Total Amount</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Amount Paid
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {"$"+DashboardSummary.TotalAmountPaid}
                      <i className="mdi mdi-arrow-down text-danger ms-2"></i>
                    </h4>
                   
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Total Amount Paid</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      unpaid Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {"$"+DashboardSummary.TotalBalance}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Total Balance</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            
          </Row>


              <Col md="4">
                <div className="float-end d-none d-md-block">
                
                </div>
              </Col>
            </Row>


            <Row>
            <Col xl={9}>
            <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Receipt</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">name</th>
                          <th scope="col">Amount Paid</th>
                          <th scope="col">Balance</th>
                          <th scope="col">data</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {latestReceipts?.map((latest) =>{
                          return <tr>
                            <td>{latest.Custmer_id?.name}</td>
                            <td>{latest.receiptAmount}</td>
                            <td>{latest.Biling_id?.Balance}</td>
                            <td>{moment(latest.createdAt).format('LLL')}</td>
                          </tr>
                        })}

                      
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3}>
              <Card>
                <CardBody>
                  <div>
                    <h4 className="card-title mb-4">Summary</h4>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Custmers</p>
                          <h5 className="mb-4">{DashboardSummary.NumberOfCustmer}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4 fs-3">
                          {/* <SparkLine /> */}
                          <i className="mdi mdi-account-multiple-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Collectors</p>
                          <h5 className="mb-4">{DashboardSummary.NumberOfCollector}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4 fs-3">
                          {/* <SparkLine1 /> */}
                          <i className="mdi mdi-account-edit"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Biling</p>
                          <h5>{DashboardSummary.NumberOfBiling}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4 fs-3">
                          <i className="dripicons-document-edit"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Users</p>
                          <h5>{DashboardSummary.NumberOfUsers}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4 fs-3">
                          <i className="dripicons-user"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard