import MetaTags from 'react-meta-tags';
// import { Col,Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios"
// import "../search"
import { MDBDataTable } from "mdbreact"

// import { Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"


function Custmer() {
    const [nameVal, setnameVal] = useState("")
    const [phoneVal, setphoneVal] = useState("")
    const [AddVal, setAddVal] = useState("")
    const [guriVal, setguriVal] = useState("")
    const [zoneVal, setzoneVal] = useState("")
    const [apiData, setapiData] = useState("")
    const [updatedid, setupdatedid] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState("")
    const [showAlert, setshowAlert] = useState(false)
    const [subcat, setsubcat] = useState([])
    const [DisplayWinner, setDisplayWinner] = useState("")
    const [modal, setModal] = useState(false)
    const [modalcategory, setModalcategory] = useState(false)

    let endpoint = "http://localhost:0808/custmer/"

    useEffect(() => {
        const subget = async () => {
            const sublist = await axios.get('http://localhost:0808/custmer/')
            const subdata = await sublist.data.AllCustmer
            setsubcat(subdata)
            console.log(subdata)
        }
        subget()

    },
        [])

        const toggleCategory = () => {
          setModalcategory(!modalcategory)
          setnameVal("")
          setphoneVal("")
          setAddVal("")
          setguriVal("")
          setzoneVal("")
          setisEdit(false)
          
          
          console.log(modalcategory)
        }
    const handaleSubmit = async (e) => {

        e.preventDefault()
        let obj = {
            name: nameVal,
            phone: phoneVal,
            address: AddVal,
            guri_NO: guriVal,
            Zone: zoneVal,
        }
        if (nameVal === "") {
            toast.error("Enter Your Name")

        } else if (phoneVal === "") {
            toast.error("Enter Your phone")

        } else if (AddVal === "") {
            toast.error("Enter Your Address")

        }
        else if (guriVal === "") {
            toast.error("Enter Your home")

        }
        else if (zoneVal === "") {
            toast.error("Enter Your Zone")

        }
        else {
            toast.success("Customer Added Successfully ")

        }
        try {
            if (isEdit) {
                let updateEndPoint = `${endpoint}/${Editid}`
                console.log("updateEndPoint", updateEndPoint)

                const subdata = await axios.put(updateEndPoint, obj)
                const updateData = apiData.filter((subdata) => subdata._id !== Editid)
                console.log("updateData", updateData)
                if (subdata.data.status === "success") {


                    setapiData([subdata.info, ...apiData])

                } else {
                    toast.error(subdata.data)

                }

            } else {
                // console.log("post need")
            }
            console.log(obj)
            const res = await axios.post(endpoint, obj)

            console.log(res.data)
            if (res.data.status === "success") {
                toast.success(res.data)
                setapiData([...apiData, res.info])
                

            } else {
                toast.error(res.data)

            }

        } catch (error) {
            console.log(error.message)
        }
          




        //    let numbers=[1,2,3,4,5,6,7,8,9,10]
        //    let randomNo=parseInt(Math.random()*numbers.length)
        //    if(phoneVal ===randomNo){
        //     setDisplayWinner(`Random No: ${randomNo} Winner:✅`)
        //    }else{
        //     setDisplayWinner(`Random No: ${randomNo} Wrong:❌`)

        //    }
    }

    const handleEdit = (subdata) => {
        setnameVal(subdata.name)
        setphoneVal(subdata.phone)
        setAddVal(subdata.address)
        setguriVal(subdata.guri_NO)
        setzoneVal(subdata.Zone)
        setisEdit(true)
        setEditid(subdata._id)
        setModalcategory(true)
      
        

        console.log("subdata", subdata)
    }
  
    const handleDelete = (id) => {
        setshowAlert(true)
        // const confi=window.confirm('Are You sure delete')
        if (id) {
            axios.delete("http://localhost:0808/custmer/" + id)

            // setapiData(apiData.filter((subdata)=>subdata._id!==id))

        }


        console.log("handleDelete", id)
    }
   
   
    const data = {
      columns: [
        // {
        //   label: "id",
        //   field: "_id",
        //   sort: "asc",
        //   width: 150,
        // },
        {
          label: "Custmer Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Custmer phone",
          field: "phone",
          sort: "asc",
          width: 270,
        },
        {
          label: "address",
          field: "address",
          sort: "asc",
          width: 200,
        },
        {
          label: "guri_NO",
          field: "guri_NO",
          sort: "asc",
          width: 100,
        },
        {
          label: "Zone",
          field: "Zone",
          sort: "asc",
          width: 150,
        },
        {
          label: "Action",
          field: "Action",
          sort: "asc",
          width: 100,
        },
      ],
      rows: subcat.map(subdata => {
          console.log(subdata)
          subdata.Action=(
              <div>
                  <button onClick={() => handleEdit(subdata)} class="btn btn-primary  mx-1">Edit</button>
                  <button onClick={(e) => handleDelete(subdata._id)} class="btn btn-danger mx-1">Delete</button>
              </div>
          )
          return(subdata)
      
    })}
    return (
        <div className="page-content">
           <MetaTags>
             <title>Custmer </title>
           </MetaTags>
          
             <div className="page-title-box">
               {/* <Row className="align-items-center"> */}

               <ToastContainer />
                <form onSubmit={handaleSubmit} >
                    <div class="row mt-4">
                        {/* <div class="col-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="fullName"
                                    value={nameVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter full name"
                                    onChange={(event) => {
                                        setnameVal(event.target.value)
                                    }}

                                />

                            </div>

                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="exampleInputPassword1">phone</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    value={phoneVal}
                                    placeholder="phone"
                                    onChange={(event) => { setphoneVal(event.target.value) }}
                                />



                            </div>

                        </div>

                        <div class="col-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Address</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Address"
                                    value={AddVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Yuor Address"
                                    onChange={(event) => {
                                        setAddVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>

                        <div class="col-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Guri_NO</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="guri_NO"
                                    value={guriVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Home Namber"
                                    onChange={(event) => {
                                        setguriVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>

                        <div class="col-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Zone</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Zone"
                                    value={zoneVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Your Zone"
                                    onChange={(event) => {
                                        setzoneVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div> */}

                        {/* <div class="col-2">
                            <div class="form-group">

                                <button onClick={handaleSubmit} type="submit" class="btn btn-primary form-control mt-4">
                                    submit
                                </button>
                            </div>

                        </div> */}
                    </div>

                </form>
            </div>


<Button
                          color="warning"
                          className="font-16 mb-3 btn-block"
                          onClick={toggleCategory}
                          
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> Create New custmer
                          
                      </Button>
                      


                      
                      <Modal
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        // className={props.className}
                      >
                        <ModalHeader  tag="h4">
                          Add a Custmer
                        </ModalHeader>
                        <ModalBody>
                          <AvForm
                            onValidSubmit={handaleSubmit}
                            
                          >
                            <Row form>



                            <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="fullName"
                                    value={nameVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter full name"
                                    onChange={(event) => {
                                        setnameVal(event.target.value)
                                    }}

                                />

                            </div>

                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputPassword1">phone</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    value={phoneVal}
                                    placeholder="phone"
                                    onChange={(event) => { setphoneVal(event.target.value) }}
                                />



                            </div>

                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Address</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Address"
                                    value={AddVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Your Address"
                                    onChange={(event) => {
                                        setAddVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Guri_NO</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="guri_NO"
                                    value={guriVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Home Namber"
                                    onChange={(event) => {
                                        setguriVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Zone</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Zone"
                                    value={zoneVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Your Zone"
                                    onChange={(event) => {
                                        setzoneVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>


                              {/* <Col className="col-12 mb-3">
                                <AvField
                                  name="title_category"
                                  label="Category Name"
                                  type="text"
                                  errorMessage="Invalid name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  // value={
                                   
                                  // }
                                />
                              </Col> */}
                              {/* <Col className="col-12 mb-3">
                                <AvField
                                  type="select"
                                  name="event_category"
                                  label="Choose Category Color"
                                  // value={
                                  //   event ? event.event_category : "bg-primary"
                                  // }
                                >
                                  <option value="bg-danger">Danger</option>
                                  <option value="bg-success">Success</option>
                                  <option value="bg-primary">Primary</option>
                                  <option value="bg-info">Info</option>
                                  <option value="bg-dark">Dark</option>
                                  <option value="bg-warning">Warning</option>
                                </AvField>
                              </Col> */}
                            </Row>
                            <Row>
                              <Col>
                                <div className="text-right mt-4 ">
                                  <button
                                    type="button"
                                    className="btn btn-light me-2"
                                    onClick={toggleCategory}
                                  >
                                    Close
                                  </button>
                                  <button onClick={handaleSubmit} type="submit" class="btn btn-warning ">
                                    submit
                                </button>

                                  {/* <button
                                    type="submit"
                                    className="btn btn-success save-event"
                                  >
                                    Save
                                  </button> */}
                                </div>
                              </Col>
                            </Row>
                          </AvForm>
                        </ModalBody>
                      </Modal>

            {/* <div class="containar-fluid mt-3">
                <div class="card"> 
               
                    <div class="card-header bg-primary p-1 fs-4 text-white">Custmer List
                    
                    
                    </div>
                    
                   
                    <div class="card-body">
                      <table id="dtBasicExample"
                       class="table table-striped table-bordered table-sm"
                        cellspacing="0"
                         width="100%">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Custmer Name</th>
                                    <th>Custmer phone</th>
                                    <th>address</th>
                                    <th>guri_NO</th>
                                    <th>Zone</th>
                                    <th>Action</th>

                                </tr>
                            </thead>

                            <tbody>

                                {subcat?.map(subdata => {
                                    return (
                                        <tr>
                                            <td>{subdata._id}</td>
                                            <td>{subdata.name}</td>
                                            <td>{subdata.phone}</td>
                                            <td>{subdata.address}</td>
                                            <td>{subdata.guri_NO}</td>
                                            <td>{subdata.Zone}</td>
                                            <td><button onClick={() => handleEdit(subdata)} class="btn btn-primary  mx-1">edit</button>
                                                <button onClick={(e) => handleDelete(subdata._id)} class="btn btn-danger mx-1">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {showAlert ? (
                            <SweetAlert
                                title="Are you Sure?"
                                warning
                                showCancel
                                confirmBtnCssClass="success"
                                cancelBtnCssClass="danger"
                                onConfirm={(id) => {

                                    const deletes = async (id) => {
                                        try {
                                            const confi = window.confirm('Are You sure delete')
                                            if (confi) {
                                                // axios.delete("http://localhost:0808/custmer/" + id)

                                                // setapiData(apiData.filter((subdata)=>subdata._id!==id))
                                                toast.success("Customer Deleted Successfully ")

                                            }

                                            // const res=await axios.delete(`${endpoint}/${id}`)    

                                            // console.log("res",res)



                                        } catch (error) {
                                            console.log("error", error)
                                        }





                                    }


                                    setshowAlert(false)
                                    toast.success("Customer Deleted Successfully ")



                                }}
                                onCancel={() => {
                                    setshowAlert(false)

                                }}
                            >

                            </SweetAlert>
                        ) : null}


                    </div>
                </div>
            </div>    */}
            <MDBDataTable responsive bordered data={data} />
            {showAlert ? (
                            <SweetAlert
                                title="Are you Sure?"
                                warning
                                showCancel
                                confirmBtnCssClass="success"
                                cancelBtnCssClass="danger"
                                onConfirm={(id) => {

                                    const deletes = async (id) => {
                                        try {
                                            const confi = window.confirm('Are You sure delete')
                                            if (confi) {
                                                // axios.delete("http://localhost:0808/custmer/" + id)

                                                // setapiData(apiData.filter((subdata)=>subdata._id!==id))
                                                toast.success("Customer Deleted Successfully ")

                                            }

                                            // const res=await axios.delete(`${endpoint}/${id}`)    

                                            // console.log("res",res)



                                        } catch (error) {
                                            console.log("error", error)
                                        }





                                    }


                                    setshowAlert(false)
                                    toast.success("Customer Deleted Successfully ")



                                }}
                                onCancel={() => {
                                    setshowAlert(false)

                                }}
                            >

                            </SweetAlert>
                        ) : null}

               {/* </Row> */}
               </div>

        

             
            
         
      




               

    )
}


export default Custmer
















// import MetaTags from 'react-meta-tags';
// import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
// import axios from "axios"



// // import { Button, Container, Table } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from "react";
// import SweetAlert from 'react-bootstrap-sweetalert';


// function Custmer() {
//   return ( 
//     <div>
   
//         <div className="page-content">
//           <MetaTags>
//             <title>Custmer </title>
//           </MetaTags>
//           <Container fluid>
//             <div className="page-title-box">
//               <Row className="align-items-center">
//                 <h1>Custmer list</h1>
                
//               </Row>
//             </div>
//           </Container>
//         </div>
      
//       </div>
//      );
// }

// export default Custmer;

