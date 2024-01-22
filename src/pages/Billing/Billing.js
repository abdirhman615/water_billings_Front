
import MetaTags from 'react-meta-tags';
// import { Col,Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios"
//Tabel
import { MDBDataTable } from "mdbreact"


import moment from "moment";
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

function Billing(){
    let endpoint = "http://localhost:0808/biling/"
    const [CusVal, setCusVal] = useState("")
    const [dateVal, setdateVal] = useState("")
    const [horyVal, sethoryVal] = useState("")
    const [dambeyVal, setdambeyVal] = useState("")
    const [updatedid, setupdatedid] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState("")
    const [showAlert, setshowAlert] = useState(false)
    const [ColVal, setColVal] = useState("")
    const [apiData, setapiData] = useState("")
    const[subcat,setsubcat]= useState([])
    const[subcatCol,setsubcatCol]= useState([])
    const[subcatCus,setsubcatCus]= useState([])
    const[subdata,setsubdata]= useState([])
    const [modalcategory, setModalcategory] = useState(false)


    useEffect(() =>{
        const subget= async()=>{
            const biliglist=await axios.get('http://localhost:0808/biling/')
            
            const subdata=await biliglist.data.AllBiling
            
            setsubcat(subdata)
console.log(subdata)


const sublistCol=await axios.get('http://localhost:0808/collector/')
            const subdataCol=await sublistCol.data.AllCollectors
            setsubcatCol(subdataCol)
             console.log("subdataCol",subdataCol)

             const sublistCus = await axios.get('http://localhost:0808/custmer/')
             const subdataCus = await sublistCus.data.AllCustmer
             setsubcatCus(subdataCus)
             console.log(subdataCus)




        }


        
        subget()

    }, [])

    const handaleSubmit = async(e) => {
        
        
        e.preventDefault()
        let obj={
            Custmer_id: CusVal,
            new_date: dateVal,
            Akhirska_hory: horyVal,
            Akhirska_dambe: dambeyVal,
            Collector_id: ColVal,
        }
        

        if (CusVal==="") {
            toast.error("Enter Custmer ID")
                               
        } else if (dateVal===""){
            toast.error("Enter Your date")
            
        }else if (horyVal===""){
            toast.error("Enter Your Akhriska hory")
            
        }
        else if (dambeyVal===""){
            toast.error("Enter Your Akhriska dambey")
            
        }
        else if (ColVal===""){
            toast.error("Enter Your Collector")
        }else{
            
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
                       toast.error(subdata.data.message)
                       
                   }
    
                }else{
                    // toast.success("Customer Added Successfully")
                    // console.log("post need")
                }
                
                console.log(obj)
                const res = await axios.post(endpoint, obj)
                console.log(res.data)
                if (res.data.status==="success") {
                    
                     toast.success(res.data)
                     setapiData([...apiData,res.info])
                     
                } else {
                    // toast.error(res.data)
                    
                }
                
                toast.success("Biling Added Successfully")
               
            } catch (error) {
                console.log(error.message)
            }
            
           
       
        
        
    }

    const handleEdit =(subdata)=>{
        setEditid(subdata._id)
        setisEdit(true)
        setColVal(subdata.Collector_id?._id) 
        setCusVal(subdata.Custmer_id?._id)
        setdateVal(subdata.new_date)
        sethoryVal(subdata.Akhirska_hory)
        setdambeyVal(subdata.Akhirska_dambe)
        setupdatedid(subdata._id)
        toggleCategory(subdata)


        console.log("subdata",subdata)
    }

    const handleDelete = (id) => {
        setshowAlert(true)
        // const confi=window.confirm('Are You sure delete')
        if (id) {
            axios.delete('http://localhost:0808/biling/' + id)

            // setapiData(apiData.filter((subdata)=>subdata._id!==id))

        }


        console.log("handleDelete", id)
    }
    const toggleCategory = () => {
        setModalcategory(!modalcategory)
        console.log(modalcategory)
      }

      const data = {
        columns: [
        //   {
        //     label: "Biling id",
        //     field: "_id",
        //     sort: "asc",
        //     width: 150,
        //   },
          {
            label: "Custmer name",
            field: "Custmer_name",
            sort: "asc",
            width: 150,
          },
          {
            label: "date",
            field: "new_date",
            sort: "asc",
            width: 270,
          },
          {
            label: "Akhirska hory",
            field: "Akhirska_hory",
            sort: "asc",
            width: 200,
          },
          {
            label: "Akhirska dambe",
            field: "Akhirska_dambe",
            sort: "asc",
            width: 100,
          },
          {
            label: "Farqi",
            field: "farqi",
            sort: "asc",
            width: 150,
          },
          {
            label: "Rate",
            field: "Rate",
            sort: "asc",
            width: 150,
          },
          {
            label: "Balance",
            field: "Balance",
            sort: "asc",
            width: 150,
          },
          {
            label: "Collector name",
            field: "Collector_name",
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
            subdata.Custmer_name=subdata.Custmer_id?.name
            subdata.Collector_name=subdata.Collector_id?.name
            subdata.new_date=moment(subdata.new_date).format('LLL')
                        subdata.Action=(
                <div>
                    <button onClick={() => handleEdit(subdata)} class="btn btn-primary mx-1"><i className="ion ion-md-create"></i></button>
                    <button onClick={(e) => handleDelete(subdata._id)} class="btn btn-danger mx-1"><i className="mdi mdi-delete"></i></button>
                </div>
            )
            return(subdata)
        
      })}
    return(

         <div className="page-content">
           <MetaTags>
             <title>Billing </title>
           </MetaTags>
          
             <div className="page-title-box">
               {/* <Row className="align-items-center"> */}
                


        <div>
            <Container>
            <ToastContainer />
            <form onSubmit={handaleSubmit}>
            <div class="row mt-4">
              
                
                
            </div>
            {/* <h1>name:{nameVal}</h1> */}
        </form>

        <Button
                          color="warning"
                          className="font-16 mb-3 btn-block"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> Create New Biling
                          
                      </Button>
                      


                      
                      <Modal
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        // className={props.className}
                      >
                        <ModalHeader toggle={toggleCategory} tag="h4">
                          Add a Biling
                        </ModalHeader>
                        <ModalBody>
                          <AvForm
                            onValidSubmit={handaleSubmit}
                            
                          >
                            <Row form>


                            {/* <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Custmer id</label>
                        <input
                            type="text"
                            class="form-control"
                            name="Custmer_id"
                            value={CusVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Custmer_id"
                            onChange={(event) => {
                                 setCusVal(event.target.value) }}

                            />
            
                    </div>
                     <AvField
                            name="Collector_id"
                            placeholder="Select Collector"
                            type="select"
                            onChange={(e) => handaleSubmit(e)}
                            errorMessage="select Collector"
                            className='form-control'
                            value={CusVal}
                            validate={{require:{value:true}}}
                            id="validationCollector"
                            
                            >
                                 <option value="">chone Collector</option>
                                {subcat?.map((std)=>{
                                    return<option value={std._id}>{std.name}</option>
                                })}

                            </AvField>

                </div>
                 */}
                 <div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Select Custmer</label>
                           
                                 <select id='inputsate'
                                  className='form-control '
                                  value={CusVal}
                                  onChange={(event) => {
                                    setCusVal(event.target.value)
                                }}
                                  >
                               <option value={""}>chone Collector</option>
                                {subcatCus?.map((subdataCus)=>{
                                    return<option value={subdataCus._id}>{subdataCus.name}</option>
                                })}
                                
                               </select>
                             

                            </div>

                        </div> 
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">New date</label>
                        <input
                            type="date"
                            class="form-control"
                            name="date"
                            value={dateVal}
                            aria-describedby="emailhelp"
                            placeholder="Date"
                            onChange={(event) => {
                                 setdateVal(event.target.value) }}


                            />
            
                    </div>

                </div>

                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Akhirska_hory</label>
                        <input
                            type="Number"
                            class="form-control"
                            name="Akhirska_hory"
                            value={horyVal}
                            aria-describedby="emailhelp"
                            placeholder="Akhirska_hory"
                            onChange={(event) => {
                                 sethoryVal(event.target.value) }}


                            />
            
                    </div>

                </div>

                
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Akhirska_dambe</label>
                        <input
                            type="number"
                            class="form-control"
                            name="Akhirska_dambe"
                            value={dambeyVal}
                            aria-describedby="emailhelp"
                            placeholder="Akhirska_dambe"
                            onChange={(event) => {
                                 setdambeyVal(event.target.value) }}

                            />
            
                    </div>

                </div>
{/*               
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Collector id</label>
                        <input
                            type="text"
                            class="form-control"
                            name="Collector_id"
                            value={ColVal}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Collector id"
                            onChange={(event) => {
                                 setColVal(event.target.value) }}


                            />
            
                    </div>

                </div> */}

<div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Select Collector</label>
                           
                                 <select id='inputsate'
                                  className='form-control '
                                  value={ColVal}
                                  onChange={(event) => {
                                    setColVal(event.target.value)
                                }}
                                  >
                               <option value={""}>chone Collector</option>
                                {subcatCol?.map((subdataCol)=>{
                                    return<option value={subdataCol._id}>{subdataCol.name}</option>
                                })}
                                
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
                                  <button onClick={toggleCategory} type="submit" class="btn btn-warning ">
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
            </Container>
            
{/* 
            <div class=" mt-3">
    <div class="card">
        <div class="card-header bg-primary fs-5 text-white">Billing List</div>
        <div class="card-body">
<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                <tr className=''>
      <th>Biling id</th>
      <th>Custmer name</th>
      <th>new_date</th>
      <th>Akhirska hory</th>
      <th>Akhirska dambe</th>
      <th>Farqi</th>
      <th>Rate</th>      
      <th>Total</th>      
      <th>Balance</th>      
      <th>Collector name</th>
      <th>Action</th>
      
    </tr>   
 </thead>

    <tbody>
                   
    {subcat?.map(subdata=>{
     return(
        <tr>
        <td>{subdata._id}</td>
        <td>{subdata.Custmer_id?.name}</td>
        <td>{subdata.new_date}</td>
        <td>{subdata.Akhirska_hory}</td>
        <td>{subdata.Akhirska_dambe}</td>
        <td>{subdata.farqi}</td>
        <td>{subdata.Rate}</td>
        <td>{subdata.total}</td>
        <td>{subdata.Balance}</td>
        <td>{subdata.Collector_id?.name}</td>
        <td><button onClick={()=>handleEdit(subdata)} class="btn btn-primary  mx-1">edit</button>
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
                                        toast.success("Biling Deleted Successfully ")

                                    }



                                } catch (error) {
                                    console.log("error", error)
                                }





                            }


                            setshowAlert(false)
                            toast.success("Biling Deleted Successfully ")



                        }}
                        onCancel={()=>{
                            setshowAlert(false)

                        }}
                        >
                            
                        </SweetAlert>
                        ):null}
</div>
</div>
</div> */}
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
                    
            
        </div>
                  {/* </Row> */}
             </div>
         
         </div>

    )
}

export default Billing;