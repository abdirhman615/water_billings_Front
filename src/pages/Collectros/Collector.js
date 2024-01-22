import MetaTags from 'react-meta-tags';
// import { Col,Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios"

import { MDBDataTable } from "mdbreact"

// import { Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import { AvField, AvForm } from "availity-reactstrap-validation"
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


function Collector(){
    const [nameVal, setnameVal] = useState("")
    const [phoneVal, setphoneVal] = useState("")
    const [AddVal, setAddVal] = useState("")
    const [AgeVal, setAgeVal] = useState("")
    const [slaryVal, setslaryVal] = useState("")
    const [apiData, setapiData] = useState("")
    const [updatedid, setupdatedid] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState("")
    const [showAlert, setshowAlert] = useState(false)
    const[subcat,setsubcat]= useState([])
    const [modalcategory, setModalcategory] = useState(false)

    let endpoint = "http://localhost:0808/collector/"
    useEffect(() =>{
        const subget= async()=>{
            const sublist=await axios.get('http://localhost:0808/collector/')
            const subdata=await sublist.data.AllCollectors
            setsubcat(subdata)
console.log(subdata)
        }
        subget()

    }, [])
    const handaleSubmit = async(e) => {
        
        e.preventDefault()
        let obj={
            name: nameVal,
            phone: phoneVal,
            address: AddVal,
            age: AgeVal,
            salry: slaryVal,
        }
        if (nameVal==="") {
            toast.error("Enter Your Name")
                               
        } else if (phoneVal===""){
            toast.error("Enter Your phone")
            
        }else if (AddVal===""){
            toast.error("Enter Your Address")
            
        }
        else if (AgeVal===""){
            toast.error("Enter Your home")
            
        }
        else if (slaryVal===""){
            toast.error("Enter Your Zone")
            
        }
        else{
            toast.success("Customer Added Successfully")

        }
        try {
            if (isEdit) {
                let updateEndPoint=`${endpoint}/${Editid}`
                console.log("updateEndPoint",updateEndPoint)

                const subdata = await axios.put(updateEndPoint,obj)
                 const updateData=apiData.filter((subdata)=>subdata._id!==Editid)
                    console.log("updateData",updateData) 
                if (subdata.data.status==="success") {
                   
                   
                    setapiData([subdata.info,...apiData])
                    
               } else {
                   toast.error(subdata.data)
                   
               }

            }else{
                // console.log("post need")
            }
           
            console.log(obj)
            const res = await axios.post(endpoint, obj)
            console.log(res.data)
            if (res.data.status==="success") {
                 
                 setapiData([...apiData,res.info])
                 
            } else {
                toast.error(res.data)
                
            }
            
        } catch (error) {
            console.log(error.message)
        }
    
    }


    const handleEdit =(subdata)=>{
        setnameVal(subdata.name)
        setphoneVal(subdata.phone)
        setAddVal(subdata.address)
        setAgeVal(subdata.age)
        setslaryVal(subdata.salry)
        setisEdit(true)
        setEditid(subdata._id)
        setModalcategory(true)

        console.log("subdata",subdata)
    }

    const handleDelete = (id) => {
        setshowAlert(true)
        // const confi=window.confirm('Are You sure delete')
        if (id) {
            axios.delete('http://localhost:0808/collector/' + id)

            // setapiData(apiData.filter((subdata)=>subdata._id!==id))

        }


        console.log("handleDelete", id)
    }

    const toggleCategory = () => {
        setModalcategory(!modalcategory)
         setnameVal("")
      setphoneVal("")
      setAddVal("")
      setslaryVal("")
      setAgeVal("")
      setisEdit(false)
      }

      const data = {
        columns: [
        //   {
        //     label: "id",
        //     field: "_id",
        //     sort: "asc",
        //     width: 150,
        //   },
          {
            label: "Collector name",
            field: "name",
            sort: "asc",
            width: 150,
          },
          {
            label: "phone",
            field: "phone",
            sort: "asc",
            width: 270,
          },
          {
            label: "age",
            field: "age",
            sort: "asc",
            width: 200,
          },
          {
            label: "address",
            field: "address",
            sort: "asc",
            width: 100,
          },
          {
            label: "salry",
            field: "salry",
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
    return(


         <div className="page-content">
           <MetaTags>
             <title>Collector </title>
           </MetaTags>
          
             <div className="page-title-box">
              {/* <Row className="align-items-center"> */}
        <div>
            
                <ToastContainer></ToastContainer>
 <form onSubmit={handaleSubmit}>
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
                        onChange={(event) => {
                            setphoneVal(event.target.value)
                        }}
                        />



                    </div>

                </div>


                <div class="col-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Age</label>
                        <input
                            type="text"
                            class="form-control"
                            name="number"
                            value={AgeVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Age"
                            onChange={(event) => {
                                setAgeVal(event.target.value)
                            }}

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
                        <label for="exampleInputEmail1">Salry</label>
                        <input
                            type="text"
                            class="form-control"
                            name="number"
                            value={slaryVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Salry"
                            onChange={(event) => {
                                setslaryVal(event.target.value)
                            }}
                            />
            
                    </div>

                </div> */}
                
                {/* <div class="col-2">
                    <div class="form-group">
                        
                        <button type="submit" class="btn btn-primary form-control mt-4">
                            submit
                            </button>
                    </div>

                </div> */}
            </div>
            {/* <h1>name:{nameVal}</h1> */}
        </form>


        <Button
                          color="warning"
                          className="font-16  btn-block"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> Create New Collector
                      </Button>


                      
                      <Modal
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        // className={props.className}
                      >
                        <ModalHeader toggle={toggleCategory} tag="h4">
                          Add a Collector
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
                        onChange={(event) => {
                            setphoneVal(event.target.value)
                        }}
                        />



                    </div>

                </div>


                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Age</label>
                        <input
                            type="text"
                            class="form-control"
                            name="number"
                            value={AgeVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Age"
                            onChange={(event) => {
                                setAgeVal(event.target.value)
                            }}

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
                            placeholder="Enter Yuor Address"
                            onChange={(event) => {
                                setAddVal(event.target.value)
                            }}
                            />
            
                    </div>

                </div>
              
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Salry</label>
                        <input
                            type="text"
                            class="form-control"
                            name="number"
                            value={slaryVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Salry"
                            onChange={(event) => {
                                setslaryVal(event.target.value)
                            }}
                            />
            
                    </div>

                </div>

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

            {/* <Container>

                
            <div class="containar-fluid mt-3">
    <div class="card">
        <div class="card-header bg-primary p-2 fs-5  text-white">Collector List</div>
        <div class="card-body">
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                    <thead>
                <tr>
      <th scope="col">Collector ID</th>
      <th scope="col"> Collector name</th>
      <th scope="col">phone</th>
      <th scope="col">age</th>
      <th scope="col">address</th>
      <th scope="col">salry</th>
      <th scope="col">Action</th>
      
      
    </tr>   
 </thead>

    <tbody>
                   
    {subcat?.map(subdata=>{
     return(
        <tr>
        <td>{subdata._id}</td>
        <td>{subdata.name}</td>
        <td>{subdata.phone}</td>
        <td>{subdata.age}</td>
        <td>{subdata.address}</td>
        <td>{subdata.salry}</td>
        <td><button onClick={()=>handleEdit(subdata) } class="btn btn-primary  mx-1">edit</button>
             <button onClick={(e)=>handleDelete(subdata._id)} class="btn btn-danger mx-1">Delete</button>
        </td>
        </tr>
         )
        })}

                </tbody>
                </table>
                {showAlert ?(
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
                        onCancel={()=>{
                            setshowAlert(false)

                        }}
                        >
                            
                        </SweetAlert>
                        ):null}

                
</div>
</div>
</div>
                    
            </Container> */}
        </div>

                      {/* </Row> */}
</div> 
</div>

    )
}






export default Collector;










// function Collector() {
//     return ( 
        
//         <div className="page-content">
//           <MetaTags>
//             <title>Collector </title>
//           </MetaTags>
          
//             <div className="page-title-box">
//               {/* <Row className="align-items-center"> */}
                


                
//               {/* </Row> */}
//             </div>
         
//         </div>
      
//      );
// }