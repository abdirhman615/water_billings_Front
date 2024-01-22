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
  import useSWR,{mutate} from 'swr'


function User(){
    const [ColId, setColId] = useState("")
    const [userVAl, setuserVAl] = useState("")
    const [PassVal, setPassVal] = useState("")
    const [StatusVal,setStatusVal] = useState("")
    const [apiData, setapiData] = useState("")
    const [updatedid, setupdatedid] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState("")
    const [showAlert, setshowAlert] = useState(false)
    const[subcat,setsubcat]= useState([])
    const[subcatCol,setsubcatCol]= useState([])
    const [modalcategory, setModalcategory] = useState(false)

    let endpoint = "http://localhost:0808/user/"
    useEffect(() =>{
        const subget= async()=>{
            const sublist=await axios.get('http://localhost:0808/user/')
            const subdata=await sublist.data.Allusers
            setsubcat(subdata)
         console.log("subdata",subdata)

         const sublistCol=await axios.get('http://localhost:0808/collector/')
            const subdataCol=await sublistCol.data.AllCollectors
            setsubcatCol(subdataCol)
             console.log("subdataCol",subdataCol)
        }
        subget()
    }, [])
    const handaleSubmit = async(e) => {
        
        e.preventDefault()
        let obj={
            Collector_id: ColId,
            username: userVAl,
            Password: PassVal,
            userStatus: StatusVal,
            
            
        }
        if (ColId==="") {
            toast.error("Enter Collector ID")
                               
        } else if (userVAl===""){
            toast.error("Enter Your user name")
            
        }else if (PassVal===""){
            toast.error("Enter Your password")
            
        }
        else if (StatusVal===""){
            toast.error("Choose Status")
            
        }
        else{
            toast.success("User Added Successfully")

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

    async function fetcher(path){
        const {sublist}=await axios.get(`${endpoint}/${path}`)
        return data
    }
    const {sublist:userList,error}=useSWR("users",fetcher)
    let UserData=[]
    if(!error){
        UserData=userList
    }

    const handleEdit =(subdata)=>{
        setColId(subdata.Collector_id)
        setuserVAl(subdata.username)
        setPassVal(subdata.Password)
        setStatusVal(subdata.userStatus)
        setisEdit(true)
        setEditid(subdata._id)
        setModalcategory(true)

        console.log("subdata",subdata)
    }

    const handleDelete = (id) => {
        setshowAlert(true)
        // const confi=window.confirm('Are You sure delete')
        if (id) {
            axios.delete('http://localhost:0808/user/' + id)

            // setapiData(apiData.filter((subdata)=>subdata._id!==id))

        }


        console.log("handleDelete", id)
    }

    const toggleCategory = () => {
        setModalcategory(!modalcategory)
         setColId("")
         setuserVAl("")
         setPassVal("")
         setStatusVal("")
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
            field: "Collector_name",
            sort: "asc",
            width: 150,
          },
          {
            label: "Username",
            field: "username",
            sort: "asc",
            width: 270,
          },
          {
            label: "Status",
            field: "userStatus",
            sort: "asc",
            width: 200,
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
            subdata.Collector_name=subdata.Collector_id?.name

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
             <title>User </title>
           </MetaTags>
          
             <div className="page-title-box">
              {/* <Row className="align-items-center"> */}
        <div>
            
                <ToastContainer></ToastContainer>
 <form onSubmit={handaleSubmit}>
            <div class="row mt-4">
               </div>
        </form>


        <Button
                          color="warning"
                          className="font-16  btn-block mb-3"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> Create New User
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

{/* 
                            <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Collector id</label>
                        <input
                            type="text"
                            class="form-control"
                            name="Collector_id"
                            value={ColId}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Collector id"
                            onChange={(event) => {
                                setColId(event.target.value) }}


                            />
            
                    </div>

                </div> */}

                
                  <div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Select Collector</label>
                            
                                 <select id='inputsate'
                                  className='form-control'
                                  value={ColId}
                                  onChange={(event) => {
                                    setColId(event.target.value)
                                }}
                                  >
                                <option value="">chone Collector</option>
                                {subcatCol?.map((subdataCol)=>{
                                    return<option value={subdataCol._id}>{subdataCol.name}</option>
                                })}
                                
                               </select>
                             

                            </div>

                        </div> 


                <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputPassword1">User Name</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    value={userVAl}
                                    placeholder="Enter Yuor User Name"
                                    onChange={(event) => {setuserVAl(event.target.value) }}
                                />



                            </div>

                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    value={PassVal}
                                    aria-describedby="emailhelp"
                                    placeholder="Enter Yuor password"
                                    onChange={(event) => {
                                        setPassVal(event.target.value)
                                    }}
                                />

                            </div>

                        </div>

                        <div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Status</label>
                                 <select id='inputsate'
                                  className='form-control '
                                  value={StatusVal}
                                  onChange={(event) => {
                                    setStatusVal(event.target.value)
                                }}
                                  >
                                <option selected>chone Status</option>
                                <option value="active">active</option>
                                <option value="pending">pending</option>
                                <option value="blocked">blocked</option>
                               </select>
                             

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
                                                toast.success("User Deleted Successfully ")

                                            }

                                            // const res=await axios.delete(`${endpoint}/${id}`)    

                                            // console.log("res",res)



                                        } catch (error) {
                                            console.log("error", error)
                                        }





                                    }


                                    setshowAlert(false)
                                    toast.success("User Deleted Successfully ")



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

                   
</div> 
</div>

    )
}




export default User;